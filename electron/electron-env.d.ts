/// <reference types="vite-plugin-electron/electron-env" />

declare namespace NodeJS {
  interface ProcessEnv {
    VSCODE_DEBUG?: 'true';
    DIST_ELECTRON: string;
    DIST: string;
    /** /dist/ or /public/ */
    VITE_PUBLIC: string;
  }
}
export interface NewWin {
  isHasWin: boolean;
  userInfo: any;
  winId: number;
  cookies: any[];
  url: string;
  [propName: string]: any;
}
interface upLoadListStatus {
  finish: boolean;
  [propName: string]: any;
}
export interface BliWin extends NewWin {
  upLoadList: upLoadListStatus[];
  interTime: string;
}

export interface Liu17Win extends NewWin {
  upLoadList: upLoadListStatus[];
  interTime: string;
}

export interface AfterLogin {
  winId: number;
  result: any;
  [propName: string]: any;
}
