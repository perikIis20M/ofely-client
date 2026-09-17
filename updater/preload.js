const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('ofelyUpdater', {
  bootstrap: () => ipcRenderer.invoke('bootstrap'),
  chooseDirectory: () => ipcRenderer.invoke('choose-directory'),
  chooseOutputDirectory: (defaultPath) => ipcRenderer.invoke('choose-output-directory', defaultPath),
  scan: (options) => ipcRenderer.invoke('scan-mods', options),
  updateOne: (id) => ipcRenderer.invoke('update-one', id),
  updateAll: () => ipcRenderer.invoke('update-all'),
  versions: (projectId, options) => ipcRenderer.invoke('project-versions', projectId, options),
  installVersion: (id, versionId) => ipcRenderer.invoke('install-version', id, versionId),
  openDirectory: () => ipcRenderer.invoke('open-directory'),
  openProject: (projectId) => ipcRenderer.invoke('open-project', projectId),
  minimize: () => ipcRenderer.invoke('window-minimize'),
  maximize: () => ipcRenderer.invoke('window-maximize'),
  close: () => ipcRenderer.invoke('window-close'),
  onProgress: (callback) => ipcRenderer.on('operation-progress', (_event, value) => callback(value))
});
