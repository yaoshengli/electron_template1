import { injectable, inject } from 'inversify';
import { TYPES } from '/~/container/common/types';
import { BrowserWindow, BrowserView } from 'electron';
import { join, dirname } from 'node:path';

@injectable()
class Test {
  private _pie;
  private _browser;
  private _mainWindow;
  a;
  browserViewList;
  win;
  constructor(
    @inject(TYPES.Pie) pie: any,
    @inject(TYPES.Browser) browser: any,
    @inject(TYPES.MainWindow) mainWindow: BrowserWindow,
  ) {
    this._pie = pie;
    this._browser = browser;
    this._mainWindow = mainWindow;
    this.a = 1;
    this.browserViewList = [];
  }

  hello(msg) {
    this.a++;
    console.log(msg + this.a);
    const main = async () => {
      const window = new BrowserWindow();
      const url = 'https://example.com/';
      await window.loadURL(url);

      const page = await this._pie.getPage(this._browser, window);
      console.log(page.url());
      console.log(this._mainWindow.id);
      window.destroy();
    };

    main();
    // this._mainWindow.webContents.send('message', { data: { ip: this.a } });
  }
  thisViewBack(viewId) {
    const view = this.browserViewList.filter((v) => v.id == viewId)[0].view;
    view.webContents.goBack();
  }
  thisViewForward(viewId) {
    const view = this.browserViewList.filter((v) => v.id == viewId)[0].view;
    view.webContents.goForward();
  }
  thisViewRefresh(viewId) {
    const view = this.browserViewList.filter((v) => v.id == viewId)[0].view;
    view.webContents.reload();
  }
  async openBaidu(initData) {
    const uniquePartition: string =
      'persist:' + String(Date.now()).substr(5) + String(Math.random()).substr(2, 4);

    const win: BrowserWindow = new BrowserWindow({
      width: 800,
      height: 600,
      webPreferences: {
        devTools: true,
        contextIsolation: true,
        preload: join(__dirname, '../preload/preloadBaidu.js'),
        nodeIntegration: true,

        backgroundThrottling: false,
      },
    });
    this.win = win;
    win.on('close', () => {
      win.webContents.removeAllListeners('did-stop-loading');
    });
    // Load a remote URL
    await win.loadURL('http://localhost:5173/#/webview/index');
    // win.webContents.openDevTools();
    const viewId = String(Date.now()).substr(5) + String(Math.random()).substr(2, 4);
    const view = this.addView({ win, uniquePartition, url: initData.url, viewId, fromViewId: 0 });

    return 'baidu';
  }
  thisViewTop(initData) {
    const view = this.browserViewList.filter((v) => v.id == initData)[0].view;
    this.win.setTopBrowserView(view);
    this.win.webContents.send('updateCurStatus', {
      canBack: view.webContents.canGoBack(),
      canGo: view.webContents.canGoForward(),
      curUrl: view.webContents.getURL(),
    });
  }
  handleWinEvent({ win, view, url, viewId, uniquePartition, fromViewId }) {
    console.log(win.webContents.isLoading());
    if (win.webContents.isLoading()) {
      win.webContents.on('did-stop-loading', () => {
        win.webContents.send('newView', {
          newView: {
            name: '新标签',
            winId: win.id,
            id: viewId,
          },
          status: {
            canBack: view.webContents.canGoBack(),
            canGo: view.webContents.canGoForward(),
            canRefresh: true,
            viewId: viewId,
            curUrl: url,
            fromViewId,
          },
        });
        // win.webContents.removeAllListeners('')
      });
    } else {
      win.webContents.send('newView', {
        newView: {
          name: '新标签',
          winId: win.id,
          id: viewId,
        },
        status: {
          canBack: view.webContents.canGoBack(),
          canGo: view.webContents.canGoForward(),
          canRefresh: true,
          viewId: viewId,
          curUrl: url,
          fromViewId,
        },
      });
    }

    // console.log(view.webContents.getTitle(), 11111);
    view.webContents.on('page-title-updated', (e, title) => {
      win.webContents.send('updateView', { viewId, status: { name: title } });
    });
    view.webContents.on('did-navigate', (e, title) => {
      // console.log(view.webContents.canGoBack(), '777');
      win.webContents.send('updateCurStatus', {
        canBack: view.webContents.canGoBack(),
        canGo: view.webContents.canGoForward(),
        curUrl: view.webContents.getURL(),
      });
    });
    view.webContents.on('did-navigate-in-page', (e, title) => {
      // console.log(view.webContents.canGoBack(), '888');
      win.webContents.send('updateCurStatus', {
        canBack: view.webContents.canGoBack(),
        canGo: view.webContents.canGoForward(),
        curUrl: view.webContents.getURL(),
      });
    });
    // view.webContents.on('did-create-window', (win, details) => {});
    view.webContents.setWindowOpenHandler((details) => {
      this.addView({
        win,
        uniquePartition,
        url: details.url,
        viewId: String(Date.now()).substr(5) + String(Math.random()).substr(2, 4),
        fromViewId: viewId,
      });
      return { action: 'deny' };
    });
  }
  cancelView(viewId) {
    const view = this.browserViewList.filter((v) => v.id == viewId)[0].view;
    this.win.removeBrowserView(view);
    const index = this.browserViewList.findIndex((v) => v.id == viewId);
    this.browserViewList.splice(index, 1);
    view.webContents.removeAllListeners('page-title-updated');
    view.webContents.removeAllListeners('did-navigate-in-page');
    view.webContents.removeAllListeners('did-navigate');
    view.webContents.close();
    // console.log(this.browserViewList);
  }
  addView({ win, uniquePartition, url, viewId, fromViewId }) {
    const view = new BrowserView({
      webPreferences: {
        devTools: true,
        contextIsolation: true,
        // preload: join(__dirname, '../preload/preloadBaidu.js'),
        nodeIntegration: true,
        partition: uniquePartition,

        backgroundThrottling: false,
      },
    });
    view.setBackgroundColor('255, 255, 255');
    win.addBrowserView(view);
    const bounds = win.getBounds();
    // console.log(bounds);
    view.setBounds({ x: 0, y: 61, width: bounds.width, height: bounds.height });
    // view.setBounds({ x: 0, y: 62, width: 800, height: 600 });
    view.webContents.loadURL(url);
    // console.log(view)
    view.setAutoResize({ width: true, height: true, horizontal: true, vertical: false });
    win.setTopBrowserView(view);
    this.handleWinEvent({ win, view, url, viewId, uniquePartition, fromViewId });
    this.browserViewList.push({
      uniquePartition: uniquePartition,
      id: viewId,
      view: view,
    });
    return view;
  }
}

export default Test;
