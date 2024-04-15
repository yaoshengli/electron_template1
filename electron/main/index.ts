import { app, BrowserWindow, shell, ipcMain, session, screen } from 'electron';
import { release } from 'node:os';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import os from 'os';
import { myContainer } from '/~/container/common/config';
import { TYPES } from '../container/common/types';
import { registry, registryPuppeteer } from '/~/container/common/registry';
import fs from 'fs';

// import { PrismaClient } from '@prisma/client';

// const prisma = new PrismaClient({
//   datasources: { db: { url: `file:./dev.db` } },
// });

// async function main() {
//   const user = await prisma.user.create({
//     data: {
//       name: 'Alice',
//       email: 'alice@prisma.io',
//     },
//   });
//   console.log(user);
// }

// main()
//   .then(async () => {
//     await prisma.$disconnect();
//   })
//   .catch(async (e) => {
//     console.error(e);
//     await prisma.$disconnect();
//     process.exit(1);
//   });

// import { a } from './test';

// a();

// import pie from 'puppeteer-in-electron';

// import puppeteer from 'puppeteer-core';

// const main = async () => {
//   await pie.initialize(app);
//   const browser = await pie.connect(app, puppeteer as any);

//   const window = new BrowserWindow();
//   const url = 'https://example.com/';
//   await window.loadURL(url);

//   const page = await pie.getPage(browser, window);
//   console.log(page.url());
//   window.destroy();
// };

// main();
// import { createClient } from '@supabase/supabase-js';

// // Create a single supabase client for interacting with your database
// const supabase = createClient(
//   'https://okqpptjwdxnostalunfd.supabase.co',
//   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9rcXBwdGp3ZHhub3N0YWx1bmZkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTE3OTE0NjYsImV4cCI6MjAyNzM2NzQ2Nn0.VD1esGqmCdunXTKhrjAYUkeQbegZP9QijPbUP0Ab41k',
// );

// async function a() {
//   const { data, error } = await supabase.from('test').select();
//   console.log(data, 'data');
// }
// a();
// import { AppDataSource } from './data-source';
// import { User } from './entity/User';
// import { PrismaClient } from '@prisma/client';

// const prisma = new PrismaClient({
//   datasources: { db: { url: `file:./dev.db` } },
// });

// async function main() {
//   const user = await prisma.user.create({
//     data: {
//       name: 'Alice',
//       email: 'alice@prisma.io',
//     },
//   });
//   console.log(user);
// }

// main()
//   .then(async () => {
//     await prisma.$disconnect();
//   })
//   .catch(async (e) => {
//     console.error(e);
//     await prisma.$disconnect();
//     process.exit(1);
//   });
// AppDataSource.initialize()
//   .then(async () => {
//     console.log('Inserting a new user into the database...');
//     const user = new User();
//     user.firstName = 'Timber';
//     user.lastName = 'Saw';
//     user.age = 25;
//     await AppDataSource.manager.save(user);
//     console.log('Saved a new user with id: ' + user.id);

//     console.log('Loading users from the database...');
//     const users = await AppDataSource.manager.find(User);
//     console.log('Loaded users: ', users);

//     console.log('Here you can setup and run express / fastify / any other framework.');
//   })
//   .catch((error) => console.log(error));
// import { load } from 'protobufjs'; // respectively "./node_modules/protobufjs"
// import { handle } from './handle';

// load('E:\\learn\\electron_template\\test.proto', function (err, root) {
//   if (err) throw err;

//   // example code
//   // const AwesomeMessage = root.lookupType('AwesomeMessage');

//   // const message = AwesomeMessage.create({ awesomeField: 'hello' });
//   // console.log(`message = ${JSON.stringify(message)}`);

//   // const buffer = AwesomeMessage.encode(message).finish();
//   // console.log(`buffer = ${Array.prototype.toString.call(buffer)}`);
//   const pushproto_PushFrame = root.lookupType('pushproto_PushFrame');
//   const webcast_im_Response = root.lookupType('webcast_im_Response');
//   const webcast_im_Message = root.lookupType('webcast_im_Message');
//   const webcast_im_LikeMessage = root.lookupType('webcast_im_LikeMessage');
//   // console.log(pb());
//   const base64String =
//     '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';
//   // 将Base64字符串转换为Buffer
//   const buffer = Buffer.from(base64String, 'base64');
//   const decoded = pushproto_PushFrame.decode(buffer);
//   // const webcast_im_Response_bt = handle(decoded.payload.toString('base64'));
//   // const webcast_im_Response_buffer = Buffer.from(webcast_im_Response_bt, 'base64');
//   // const webcast_im_Response_decoded = webcast_im_Response.decode(webcast_im_Response_buffer);

//   // const bt = webcast_im_Response_decoded.messages[1].payload.toString('base64');
//   // const btBfuuer = Buffer.from(bt, 'base64');
//   // const decoded = WebcastMemberMessage.decode(buffer);
//   // console.log(webcast_im_Response.ParseFromString);
//   // console.log(
//   //   encodeURIComponent(
//   //     webcast_im_LikeMessage.decode(webcast_im_Response_decoded.messages[1].payload).common
//   //       .displaytext.pieces[1].stringvalue,
//   //   ),
//   // );
//   console.log(decoded);
// });

// const addon = require('./hello.node');

// console.log(addon.hello(), 1111);
// setTimeout(() => {
//   console.log(myContainer.get<any>(TYPES.Pie));
// }, 2000);
app.setPath('userData', 'E://17wuliu');
// console.log(import.meta.glob('../container/common/*.ts', { eager: true }), 111);
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
registryPuppeteer();
console.log(app.getPath('exe'));

// The built directory structure
//
// ├─┬ dist-electron
// │ ├─┬ main
// │ │ └── index.js    > Electron-Main
// │ └─┬ preload
// │   └── index.mjs    > Preload-Scripts
// ├─┬ dist
// │ └── index.html    > Electron-Renderer
//
process.env.DIST_ELECTRON = join(__dirname, '..');
process.env.DIST = join(process.env.DIST_ELECTRON, '../dist');
process.env.VITE_PUBLIC = process.env.VITE_DEV_SERVER_URL
  ? join(process.env.DIST_ELECTRON, '../public')
  : process.env.DIST;

// Disable GPU Acceleration for Windows 7
if (release().startsWith('6.1')) app.disableHardwareAcceleration();

// Set application name for Windows 10+ notifications
if (process.platform === 'win32') app.setAppUserModelId(app.getName());

if (!app.requestSingleInstanceLock()) {
  app.quit();
  process.exit(0);
}

// Remove electron security warnings
// This warning only shows in development mode
// Read more on https://www.electronjs.org/docs/latest/tutorial/security
// process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true'

let win: BrowserWindow | null = null;
// Here, you can also use other preload
const preload = join(__dirname, '../preload/index.js');
const url = process.env.VITE_DEV_SERVER_URL;
const indexHtml = join(process.env.DIST, 'index.html');

async function createWindow() {
  const displayWorkAreaSize = screen.getAllDisplays()[0].workArea;
  win = new BrowserWindow({
    title: 'Main window',
    icon: join(process.env.VITE_PUBLIC, 'favicon.ico'),
    width: parseInt(`${displayWorkAreaSize.width * 0.85}`, 10),
    height: parseInt(`${displayWorkAreaSize.height * 0.85}`, 10),
    movable: true,
    // frame: false,
    show: false,
    center: true,
    resizable: true,
    transparent: true,
    titleBarStyle: 'default',
    autoHideMenuBar: true,
    tabbingIdentifier: 'test',
    webPreferences: {
      preload,
      // Warning: Enable nodeIntegration and disable contextIsolation is not secure in production
      // nodeIntegration: true,

      // Consider using contextBridge.exposeInMainWorld
      // Read more on https://www.electronjs.org/docs/latest/tutorial/context-isolation

      nodeIntegration: true,
      contextIsolation: true,
      devTools: true,
      webviewTag: true,
      backgroundThrottling: false,
      webSecurity: true,
      nodeIntegrationInWorker: true,
    },
  });

  registry(win);

  if (process.env.VITE_DEV_SERVER_URL) {
    // electron-vite-vue#298

    win.loadURL(url);

    win.webContents.openDevTools();
  } else {
    win.loadFile(indexHtml);
  }
  // setTimeout(() => {
  //   win.webContents.send('updateMsg', addon.hello());
  // }, 3000);

  win.on('ready-to-show', async () => {
    win.show();
  });
  win.on('close', () => {
    app.quit();
  });
}

// app.whenReady().then(createWindow);
app.whenReady().then(async () => {
  if (process.env.VITE_DEV_SERVER_URL) {
    const vueDevPath = join(
      os.homedir(),
      'AppData\\Local\\Google\\Chrome\\User Data\\Profile 1\\Extensions\\nhdogjmejiglipccpnnnanhbledajbpd\\6.6.1_0',
    );
    console.log(vueDevPath);
    await session.defaultSession.loadExtension(vueDevPath);
  }
  createWindow();
});

app.on('window-all-closed', () => {
  win = null;
  if (process.platform !== 'darwin') app.quit();
});

app.on('second-instance', () => {
  if (win) {
    // Focus on the main window if the user tried to open another
    if (win.isMinimized()) win.restore();
    win.focus();
  }
});

app.on('activate', () => {
  const allWindows = BrowserWindow.getAllWindows();
  if (allWindows.length) {
    allWindows[0].focus();
  } else {
    createWindow();
  }
});
