import { injectable, inject } from 'inversify';
import { TYPES } from '/~/container/common/types';
import { BrowserWindow, BrowserView } from 'electron';

@injectable()
class Test {
  private _pie;
  private _browser;
  private _mainWindow;
  a;
  constructor(
    @inject(TYPES.Pie) pie: any,
    @inject(TYPES.Browser) browser: any,
    @inject(TYPES.MainWindow) mainWindow: BrowserWindow,
  ) {
    this._pie = pie;
    this._browser = browser;
    this._mainWindow = mainWindow;
    this.a = 1;
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
  openBaidu(initData) {
    const win: BrowserWindow = new BrowserWindow({ width: 800, height: 600 });

    // Load a remote URL
    win.loadURL('http://localhost:5173/#/webview/index');

    const view = new BrowserView();
    win.setBrowserView(view);
    view.setBounds({ x: 0, y: 30, width: 800, height: 570 });
    view.webContents.loadURL(initData.url);
    // console.log(view)
    view.setAutoResize({ width: true, height: true, horizontal: true, vertical: false });

    setTimeout(() => {
      const view1 = new BrowserView();
      win.addBrowserView(view1);
      view1.setBounds({ x: 0, y: 0, width: 800, height: 600 });
      view1.webContents.loadURL('https://douyin.com/');
      // console.log(view)
      view1.setAutoResize({ width: true, height: true, horizontal: true, vertical: false });
    }, 3000);

    setTimeout(() => {
      win.setTopBrowserView(view);
    }, 6000);
    return 'baidu';
  }
}

export default Test;
