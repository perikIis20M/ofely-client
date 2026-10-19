const fs = require('node:fs/promises');
const path = require('node:path');
const sharp = require('sharp');
const lucide = require('lucide');

const root = path.resolve(__dirname, '..');
const assets = path.join(root, 'docs', 'assets');
const imageHome = 'C:/Users/ptaso/.codex/generated_images/019e4af6-83e2-7d82-bad6-08cb44ac82b8';

async function image(source, destination, width) {
  const data = /^https:/.test(source)
    ? Buffer.from(await (await checkedFetch(source)).arrayBuffer())
    : await fs.readFile(source);
  await sharp(data).rotate().resize({width, withoutEnlargement: true}).webp({quality: 88}).toFile(path.join(assets, destination));
}

async function checkedFetch(url) {
  const response = await fetch(url, {signal: AbortSignal.timeout(30000), headers: {'User-Agent': 'BedwarsersWebsite/1.0 (bwrs.online)'}});
  if (!response.ok) throw new Error(`${url}: HTTP ${response.status}`);
  return response;
}

async function main() {
  await fs.mkdir(assets, {recursive: true});
  await fs.mkdir(path.join(assets, 'portraits'), {recursive: true});
  await fs.mkdir(path.join(assets, 'skins'), {recursive: true});
  const {people} = await import('./data.mjs');
  for (const [key, person] of Object.entries(people)) {
    const original = {periklis: 'periklis20m.png', john: 'JohnFGx.png', foldar: 'FoldarFlicker.png', ofely: 'ofely.jpg', theoatsa: 'theoatsa.png', ploopier: 'ploopier.png'}[key];
    await image(`C:/Users/ptaso/Downloads/PFPS/${original}`, `portraits/${person.avatar}`, 180);
    const destination = path.join(assets, 'skins', `${key}.png`);
    if (!await fs.stat(destination).catch(() => false)) {
      const data = await checkedFetch(`https://mc-heads.net/body/${person.uuid}/300`);
      const buffer = Buffer.from(await data.arrayBuffer());
      const meta = await sharp(buffer).metadata();
      if (meta.width < 16 || meta.height < 32) throw new Error(`Invalid skin render for ${key}`);
      await fs.writeFile(destination, buffer);
    }
    console.log(`Prepared portrait and Minecraft skin: ${person.name}`);
  }

  const sourceProjects = ['rowglide', 'quitkeybind', 'op-login', 'combat-log-detector-plugin', 'bwhitelist'];
  const metadata = [];
  for (const slug of sourceProjects) {
    const data = await (await checkedFetch(`https://api.modrinth.com/v2/project/${slug}`)).json();
    const name = slug === 'combat-log-detector-plugin' ? 'combat-log-detector' : slug;
    await image(data.icon_url, `${name}.webp`, 192);
    metadata.push({title: data.title, slug, description: data.description, status: data.status, icon_url: data.icon_url, checked: '2026-10-19'});
  }
  await fs.writeFile(path.join(root, 'website', 'modrinth-sources.json'), `${JSON.stringify(metadata, null, 2)}\n`);
  await image('C:/Users/ptaso/Downloads/47b09929141ca202a6d304bd5533e1e70647c66b.png', 'bedwarsers.webp', 280);
  await image('C:/Users/ptaso/AppData/Local/Temp/codex-clipboard-77b204be-d540-421e-a9d7-14a8bc5f5b44.png', 'powers-smp.webp', 512);
  await image('C:/Users/ptaso/AppData/Local/Temp/codex-clipboard-272016d5-0714-4feb-a8ba-0a015b310f4c.png', 'bounty-smp.webp', 512);
  await image('D:/random code/improved-advancements-screen/Fabric/src/main/resources/icon.png', 'advancements.webp', 256);
  await image(path.join(assets, 'icon.png'), 'ofely-client.webp', 256);
  await image(path.join(imageHome, 'exec-277c0e30-68ed-47f1-a43b-b20a48115906.png'), 'island-scene.webp', 2000);
  await image(path.join(imageHome, 'exec-9bd589ed-bae4-47cf-a2aa-b14ca4d93cec.png'), 'island-main.webp', 1300);
  await image(path.join(imageHome, 'exec-d7e30186-a721-40ea-abfc-7f883770fd03.png'), 'island-sky.webp', 2000);
  // Retain the creator-provided Minecraft font from the original website.
  const icons = ['ArrowUpRight','ArrowRight','ArrowLeft','ArrowDown','Menu','X','Search','Check','Box','Blocks','Code2','Users','ChevronDown','ExternalLink','Sparkles','GripVertical','LogOut','Trophy','ShieldCheck','Swords','ListCheck','Package','Zap','Crosshair','RefreshCw','Globe','Heart','Moon','Monitor','Clock','Archive'];
  const symbols = icons.map(name => {
    const nodes = lucide.icons[name];
    if (!nodes) throw new Error(`Unknown Lucide icon: ${name}`);
    const children = nodes.map(([tag, attrs]) => `<${tag} ${Object.entries(attrs).map(([k,v])=>`${k}="${v}"`).join(' ')}/>`).join('');
    return `<symbol id="${name}" viewBox="0 0 24 24">${children}</symbol>`;
  });
  await fs.writeFile(path.join(assets, 'icons.svg'), `<svg xmlns="http://www.w3.org/2000/svg">${symbols.join('')}</svg>`);
  console.log('All assets prepared.');
}

main().catch(error => {console.error(error); process.exitCode = 1;});
