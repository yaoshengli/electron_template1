import { contextBridge, ipcRenderer } from 'electron';

console.log('preload');

contextBridge.exposeInMainWorld('electronAPI', {
  onMessage: (initData) => ipcRenderer.on('message', initData),
  // onUpdateMsg: (initData) => ipcRenderer.on('updateMsg', initData),
  invokeTest: (initData) => ipcRenderer.invoke('test', initData),

  invokeOpenLiu17Page: (initdata) => ipcRenderer.invoke('openLiu17Page', initdata),
  onAfterLiu17Login: (callback) => ipcRenderer.on('afterLiu17Login', callback),
  invokeFocusLiu17Win: (initdata) => ipcRenderer.invoke('focusLiu17Win', initdata),
  onCloseLiu17Win: (callback) => ipcRenderer.on('closeLiu17Win', callback),
  invokeCloseLiu17Win: (initdata) => ipcRenderer.invoke('closeLiu17Win', initdata),
  invokeGetLiu17List: (initdata) => ipcRenderer.invoke('getLiu17List', initdata),
  invokeGetLiuResultByArr: (initdata) => ipcRenderer.invoke('getLiuResultByArr', initdata),
  invokeGeneFile: (initdata) => ipcRenderer.invoke('geneFile', initdata),
  onUpdateIpNums: (callback) => ipcRenderer.on('updateIpNums', callback),
  onUpdateIpFailsNums: (callback) => ipcRenderer.on('updateIpFailsNums', callback),
  onUpdateImageNums: (callback) => ipcRenderer.on('updateImageNums', callback),
  onUpdateImageFailsNums: (callback) => ipcRenderer.on('updateImageFailsNums', callback),
  onUpdateMsg: (callback) => ipcRenderer.on('updateMsg', callback),
  invokeGetStore: (initdata) => ipcRenderer.invoke('getStore', initdata),
  invokeSetStore: (initdata) => ipcRenderer.invoke('setStore', initdata),
  invokeCleanCache: (initdata) => ipcRenderer.invoke('cleanCache', initdata),
  invokeGetP: () => ipcRenderer.invoke('getP'),

  invokeOpenBaidu: (initdata) => ipcRenderer.invoke('openBaidu', initdata),
  onNewView: (callback) => ipcRenderer.on('newView', callback),
  onUpdateCurStatus: (callback) => ipcRenderer.on('updateCurStatus', callback),
  onUpdateView: (callback) => ipcRenderer.on('updateView', callback),
  invokeThisViewTop: (initdata) => ipcRenderer.invoke('thisViewTop', initdata),
  invokeCancelView: (initdata) => ipcRenderer.invoke('cancelView', initdata),
  invokeThisViewBack: (initdata) => ipcRenderer.invoke('thisViewBack', initdata),
  invokeThisViewForward: (initdata) => ipcRenderer.invoke('thisViewForward', initdata),
  invokeThisViewRefresh: (initdata) => ipcRenderer.invoke('thisViewRefresh', initdata),
});

// ipcRenderer.on('newView', (e, v) => {
//   console.log(v);
// });
