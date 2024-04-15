import { ipcMain, IpcMainEvent } from 'electron';
import { myContainer } from '/~/container/common/config';
import { TYPES } from '/~/container/common/types';

export default function () {
  const testHandler = myContainer.get<any>(TYPES.Test);
  console.log(testHandler.a, '2222');
  ipcMain.handle('test', (e: IpcMainEvent, initData) => {
    testHandler.hello(initData);
  });

  ipcMain.handle('openBaidu', (e: IpcMainEvent, initData) => {
    return testHandler.openBaidu(initData);
  });
  ipcMain.handle('thisViewTop', (e: IpcMainEvent, initData) => {
    return testHandler.thisViewTop(initData);
  });
  ipcMain.handle('cancelView', (e: IpcMainEvent, initData) => {
    return testHandler.cancelView(initData);
  });
  ipcMain.handle('thisViewBack', (e: IpcMainEvent, initData) => {
    return testHandler.thisViewBack(initData);
  });
  ipcMain.handle('thisViewForward', (e: IpcMainEvent, initData) => {
    return testHandler.thisViewForward(initData);
  });
  ipcMain.handle('thisViewRefresh', (e: IpcMainEvent, initData) => {
    return testHandler.thisViewRefresh(initData);
  });

  // invokeCancelView: (initdata) => ipcRenderer.invoke('cancelView', initdata),
  // invokeThisViewTop: (initdata) => ipcRenderer.invoke('thisViewTop', initdata),
}
