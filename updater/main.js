const fs = require('fs');
const fsp = fs.promises;
const path = require('path');
const crypto = require('crypto');
const { app, BrowserWindow, dialog, ipcMain, shell } = require('electron');

const API = 'https://api.modrinth.com/v2';
const USER_AGENT = 'ofely-mod-updater/0.1.0';
let mainWindow = null;
let lastScan = null;
const projectCache = new Map();
const versionCache = new Map();

function sendProgress(message, current = 0, total = 0) {
  if (mainWindow && !mainWindow.isDestroyed()) {
    mainWindow.webContents.send('operation-progress', { message, current, total });
  }
}

function settingsPath() {
  return path.join(app.getPath('userData'), 'ofely-updater-settings.json');
}

function readSettings() {
  try {
    return JSON.parse(fs.readFileSync(settingsPath(), 'utf8').replace(/^\uFEFF/, ''));
  } catch {
    return { directory: '', currentGameVersion: '', gameVersion: '', loader: 'fabric', channel: 'release', outputMode: 'in-place', outputDirectory: '' };
  }
}

function writeSettings(value) {
  fs.writeFileSync(settingsPath(), `${JSON.stringify(value, null, 2)}\n`, 'utf8');
}

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function retryDelay(response, attempt) {
  const retryAfter = response?.headers?.get('retry-after');
  if (retryAfter && /^\d+(?:\.\d+)?$/.test(retryAfter)) return Math.max(500, Number(retryAfter) * 1000);
  return Math.min(8000, 700 * (2 ** attempt));
}

async function fetchWithRetry(url, options = {}, attempt = 0) {
  try {
    const response = await fetch(url, options);
    if ((response.status === 429 || response.status >= 500) && attempt < 4) {
      await wait(retryDelay(response, attempt));
      return fetchWithRetry(url, options, attempt + 1);
    }
    return response;
  } catch (error) {
    if (attempt >= 4) throw error;
    await wait(retryDelay(null, attempt));
    return fetchWithRetry(url, options, attempt + 1);
  }
}

async function api(route, options = {}) {
  const response = await fetchWithRetry(`${API}${route}`, {
    ...options,
    headers: {
      'User-Agent': USER_AGENT,
      ...(options.body ? { 'Content-Type': 'application/json' } : {}),
      ...(options.headers || {})
    }
  });
  if (!response.ok) {
    const detail = await response.text().catch(() => '');
    throw new Error(`Modrinth ${response.status}: ${detail || response.statusText}`);
  }
  return response.json();
}

function normalizeDirectory(selected) {
  return path.resolve(String(selected || ''));
}

function isInside(parent, child) {
  const relative = path.relative(path.resolve(parent), path.resolve(child));
  return relative === '' || (!relative.startsWith('..') && !path.isAbsolute(relative));
}

async function hashFile(filePath, algorithm = 'sha1') {
  return new Promise((resolve, reject) => {
    const hash = crypto.createHash(algorithm);
    const stream = fs.createReadStream(filePath);
    stream.on('error', reject);
    stream.on('data', (chunk) => hash.update(chunk));
    stream.on('end', () => resolve(hash.digest('hex')));
  });
}

async function mapLimit(items, limit, mapper) {
  const output = new Array(items.length);
  let next = 0;
  async function worker() {
    while (next < items.length) {
      const index = next++;
      output[index] = await mapper(items[index], index);
    }
  }
  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, worker));
  return output;
}

function primaryFile(version) {
  const files = version?.files || [];
  return files.find((file) => file.primary && !file.file_type)
    || files.find((file) => !file.file_type)
    || files.find((file) => file.primary)
    || files[0]
    || null;
}

function filteredVersions(versions, channel) {
  const allowed = channel === 'all'
    ? versions
    : versions.filter((version) => version.version_type === channel);
  return allowed
    .filter((version) => version.status !== 'archived' && primaryFile(version))
    .sort((a, b) => new Date(b.date_published || 0) - new Date(a.date_published || 0));
}

async function projectVersions(projectId, options) {
  const cacheKey = [projectId, options.gameVersion || '', options.loader || '', options.channel || 'release'].join('|');
  if (versionCache.has(cacheKey)) return versionCache.get(cacheKey);
  const params = new URLSearchParams({ include_changelog: 'false' });
  if (options.gameVersion) params.set('game_versions', JSON.stringify([options.gameVersion]));
  if (options.loader) params.set('loaders', JSON.stringify([options.loader]));
  const request = api(`/project/${encodeURIComponent(projectId)}/version?${params}`)
    .then((versions) => filteredVersions(versions, options.channel || 'release'))
    .catch((error) => {
      versionCache.delete(cacheKey);
      throw error;
    });
  versionCache.set(cacheKey, request);
  return request;
}

function publicVersion(version) {
  const file = primaryFile(version);
  return {
    id: version.id,
    name: version.name,
    number: version.version_number,
    type: version.version_type,
    published: version.date_published,
    gameVersions: version.game_versions || [],
    loaders: version.loaders || [],
    fileName: file?.filename || ''
  };
}

async function identifyFile(filePath) {
  const sha1 = await hashFile(filePath, 'sha1');
  try {
    const version = await api(`/version_file/${sha1}?algorithm=sha1`);
    if (!projectCache.has(version.project_id)) {
      projectCache.set(version.project_id, api(`/project/${encodeURIComponent(version.project_id)}`).catch((error) => {
        projectCache.delete(version.project_id);
        throw error;
      }));
    }
    const project = await projectCache.get(version.project_id);
    return { sha1, version, project };
  } catch (error) {
    if (String(error.message).includes('Modrinth 404:')) return { sha1, version: null, project: null };
    throw error;
  }
}

async function scanMods(options = {}) {
  const directory = normalizeDirectory(options.directory);
  if (!directory || !fs.existsSync(directory)) throw new Error('Choose an existing mods directory.');
  if (!options.currentGameVersion) throw new Error('Choose the current Minecraft version.');
  if (!options.gameVersion) throw new Error('Choose the target Minecraft version.');
  if (!options.loader) throw new Error('Choose a mod loader.');

  const folder = directory;
  const names = (await fsp.readdir(folder, { withFileTypes: true }))
    .filter((entry) => entry.isFile() && /\.jar(?:\.disabled)?$/i.test(entry.name))
    .map((entry) => entry.name)
    .sort((a, b) => a.localeCompare(b));

  const scanOptions = {
    directory,
    currentGameVersion: String(options.currentGameVersion),
    gameVersion: String(options.gameVersion),
    loader: String(options.loader),
    channel: String(options.channel || 'release'),
    outputMode: options.outputMode === 'folder' ? 'folder' : 'in-place',
    outputDirectory: options.outputMode === 'folder'
      ? path.resolve(String(options.outputDirectory || path.join(__dirname, 'output')))
      : ''
  };
  writeSettings(scanOptions);
  sendProgress('Reading installed mods', 0, names.length);

  const rows = await mapLimit(names, 5, async (name, index) => {
    const filePath = path.join(folder, name);
    const disabled = name.toLowerCase().endsWith('.disabled');
    try {
      const identified = await identifyFile(filePath);
      if (!identified.version || !identified.project) {
        return {
          id: crypto.randomUUID(),
          filePath,
          fileName: name,
          disabled,
          identified: false,
          title: name.replace(/\.disabled$/i, '').replace(/\.jar$/i, ''),
          status: 'Not found on Modrinth'
        };
      }
      const compatible = await projectVersions(identified.project.id, scanOptions);
      const latest = compatible[0] || null;
      const currentSupportsSource = (identified.version.game_versions || []).includes(scanOptions.currentGameVersion);
      const needsDifferentFile = Boolean(latest && latest.id !== identified.version.id);
      const updateAvailable = Boolean(latest && (scanOptions.outputMode === 'folder' || needsDifferentFile));
      const status = !latest
        ? `No ${scanOptions.gameVersion} version`
        : !currentSupportsSource
          ? `File is not marked for ${scanOptions.currentGameVersion}`
          : updateAvailable
            ? `Ready for ${scanOptions.gameVersion}`
            : `Already supports ${scanOptions.gameVersion}`;
      return {
        id: crypto.randomUUID(),
        filePath,
        fileName: name,
        disabled,
        identified: true,
        projectId: identified.project.id,
        slug: identified.project.slug,
        title: identified.project.title,
        description: identified.project.description || '',
        iconUrl: identified.project.icon_url || '',
        currentVersionId: identified.version.id,
        currentVersion: identified.version.version_number,
        latestVersionId: latest?.id || '',
        latestVersion: latest?.version_number || '',
        currentSupportsSource,
        currentMinecraftVersion: scanOptions.currentGameVersion,
        targetMinecraftVersion: scanOptions.gameVersion,
        updateAvailable,
        compatible: Boolean(latest),
        status
      };
    } catch (error) {
      return {
        id: crypto.randomUUID(),
        filePath,
        fileName: name,
        disabled,
        identified: false,
        title: name.replace(/\.disabled$/i, '').replace(/\.jar$/i, ''),
        status: 'Scan failed',
        error: error.message || String(error)
      };
    } finally {
      sendProgress(`Scanning ${name}`, index + 1, names.length);
    }
  });

  lastScan = { options: scanOptions, rows };
  sendProgress('Scan complete', names.length, names.length);
  return { options: scanOptions, rows };
}

function rowById(id) {
  const row = lastScan?.rows.find((item) => item.id === id);
  if (!row) throw new Error('Scan the folder again before updating this mod.');
  const folder = lastScan.options.directory;
  if (!isInside(folder, row.filePath)) throw new Error('Refusing to update a file outside the selected mods folder.');
  return row;
}

function verifyBuffer(buffer, hashes, fileName) {
  for (const algorithm of ['sha512', 'sha1']) {
    if (!hashes?.[algorithm]) continue;
    const actual = crypto.createHash(algorithm).update(buffer).digest('hex');
    if (actual.toLowerCase() !== String(hashes[algorithm]).toLowerCase()) {
      throw new Error(`${fileName} failed ${algorithm} verification.`);
    }
    return;
  }
  throw new Error(`${fileName} has no Modrinth hash to verify.`);
}

async function replaceWithVersion(row, versionId) {
  const version = await api(`/version/${encodeURIComponent(versionId)}`);
  if (version.project_id !== row.projectId) throw new Error('That version belongs to another project.');
  const file = primaryFile(version);
  if (!file) throw new Error('That version has no installable JAR.');

  const response = await fetchWithRetry(file.url, { headers: { 'User-Agent': USER_AGENT } });
  if (!response.ok) throw new Error(`Download failed (${response.status}).`);
  const buffer = Buffer.from(await response.arrayBuffer());
  verifyBuffer(buffer, file.hashes || {}, file.filename);

  const sourceFolder = lastScan.options.directory;
  const outputMode = lastScan.options.outputMode === 'folder';
  const folder = outputMode ? lastScan.options.outputDirectory : sourceFolder;
  await fsp.mkdir(folder, { recursive: true });
  const disabledSuffix = row.disabled ? '.disabled' : '';
  const target = path.join(folder, `${path.basename(file.filename)}${disabledSuffix}`);
  const temporary = path.join(folder, `.ofely-${crypto.randomUUID()}.download`);
  const existingFile = outputMode ? target : row.filePath;
  const backup = `${existingFile}.ofely-backup`;
  if (!isInside(folder, target)) throw new Error('Unsafe destination filename.');
  if (!outputMode && target !== row.filePath && fs.existsSync(target)) throw new Error(`A file named ${path.basename(target)} already exists.`);

  await fsp.writeFile(temporary, buffer);
  try {
    if (fs.existsSync(existingFile)) await fsp.rename(existingFile, backup);
    await fsp.rename(temporary, target);
    if (fs.existsSync(backup)) await fsp.unlink(backup).catch(() => {});
  } catch (error) {
    if (fs.existsSync(temporary)) await fsp.unlink(temporary).catch(() => {});
    if (fs.existsSync(backup) && !fs.existsSync(existingFile)) await fsp.rename(backup, existingFile).catch(() => {});
    throw error;
  }
  if (outputMode) {
    row.updateAvailable = false;
    row.status = `Written for ${lastScan.options.gameVersion}`;
  }
  return { title: row.title, version: version.version_number, output: outputMode, path: target };
}

async function refreshAfterUpdate() {
  if (lastScan.options.outputMode === 'folder') return lastScan;
  return scanMods(lastScan.options);
}

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1120,
    height: 740,
    minWidth: 900,
    minHeight: 620,
    frame: false,
    backgroundColor: '#17131f',
    icon: path.join(__dirname, '..', 'docs', 'assets', 'icon.png'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false
    }
  });
  mainWindow.setMenu(null);
  mainWindow.loadFile(path.join(__dirname, 'index.html'));
}

ipcMain.handle('bootstrap', async () => {
  const [gameVersions, loaders] = await Promise.all([
    api('/tag/game_version'),
    api('/tag/loader')
  ]);
  const settings = readSettings();
  return {
    settings: {
      ...settings,
      outputDirectory: settings.outputDirectory || path.join(__dirname, 'output')
    },
    gameVersions: gameVersions
      .filter((item) => item.version_type === 'release')
      .map((item) => ({ version: item.version, type: item.version_type, major: item.major })),
    loaders: loaders.filter((item) => item.supported_project_types?.includes('mod')).map((item) => item.name)
  };
});

ipcMain.handle('choose-directory', async () => {
  const result = await dialog.showOpenDialog(mainWindow, {
    title: 'Choose the folder containing your mod JAR files',
    properties: ['openDirectory']
  });
  return result.canceled ? null : normalizeDirectory(result.filePaths[0]);
});
ipcMain.handle('choose-output-directory', async (_event, defaultPath) => {
  const result = await dialog.showOpenDialog(mainWindow, {
    title: 'Choose updater output folder',
    defaultPath: defaultPath || undefined,
    properties: ['openDirectory', 'createDirectory']
  });
  return result.canceled ? null : path.resolve(result.filePaths[0]);
});

ipcMain.handle('scan-mods', (_event, options) => scanMods(options));
ipcMain.handle('project-versions', async (_event, projectId, options) => {
  return (await projectVersions(projectId, options || lastScan?.options || {})).map(publicVersion);
});
ipcMain.handle('update-one', async (_event, id) => {
  const row = rowById(id);
  if (!row.updateAvailable || !row.latestVersionId) throw new Error('No target-Minecraft migration is available for this mod.');
  sendProgress(`Migrating ${row.title}`, 0, 1);
  const result = await replaceWithVersion(row, row.latestVersionId);
  const scan = await refreshAfterUpdate();
  return { result, scan };
});
ipcMain.handle('install-version', async (_event, id, versionId) => {
  const row = rowById(id);
  sendProgress(`Installing ${row.title}`, 0, 1);
  const result = await replaceWithVersion(row, versionId);
  const scan = await refreshAfterUpdate();
  return { result, scan };
});
ipcMain.handle('update-all', async () => {
  if (!lastScan) throw new Error('Scan a mods folder first.');
  const updates = lastScan.rows.filter((row) => row.updateAvailable && row.latestVersionId);
  const results = [];
  const failures = [];
  for (let index = 0; index < updates.length; index += 1) {
    const row = updates[index];
    sendProgress(`Migrating ${row.title}`, index, updates.length);
    try {
      results.push(await replaceWithVersion(row, row.latestVersionId));
    } catch (error) {
      failures.push({ id: row.id, fileName: row.fileName, title: row.title, error: error.message || String(error) });
    }
  }
  const scan = await refreshAfterUpdate();
  for (const failure of failures) {
    const row = scan.rows.find((item) => item.id === failure.id || item.fileName === failure.fileName || item.title === failure.title);
    if (!row) continue;
    row.migrationFailed = true;
    row.error = failure.error;
    row.status = `Failed: ${failure.error}`;
  }
  sendProgress('Updates complete', updates.length, updates.length);
  return { results, failures, scan };
});
ipcMain.handle('open-directory', async () => {
  if (!lastScan) throw new Error('Choose a directory first.');
  const folder = lastScan.options.outputMode === 'folder'
    ? lastScan.options.outputDirectory
    : lastScan.options.directory;
  await fsp.mkdir(folder, { recursive: true });
  return shell.openPath(folder);
});
ipcMain.handle('open-project', (_event, projectId) => shell.openExternal(`https://modrinth.com/project/${encodeURIComponent(projectId)}`));
ipcMain.handle('window-minimize', () => mainWindow?.minimize());
ipcMain.handle('window-maximize', () => mainWindow?.isMaximized() ? mainWindow.unmaximize() : mainWindow?.maximize());
ipcMain.handle('window-close', () => mainWindow?.close());

app.whenReady().then(createWindow);
app.on('window-all-closed', () => { if (process.platform !== 'darwin') app.quit(); });
app.on('activate', () => { if (!BrowserWindow.getAllWindows().length) createWindow(); });
