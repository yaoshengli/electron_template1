// import type { Plugin } from 'vite';
import { resolve } from 'node:path';

import { bytecodePlugin, defineConfig } from 'electron-vite';
import electron from 'vite-plugin-electron';

//delayed-stream
// import { createHtmlPlugin } from 'vite-plugin-html';
import pkg from '../../../../package.json';

export function configElectronPlugin({
  isBuild,
  isServe,
  root,
}: {
  isBuild: boolean;
  isServe: boolean;
  root: string;
}) {
  const pathResolve = (pathname: string) => resolve(root, '.', pathname);
  const sourcemap = isServe || !!process.env.VSCODE_DEBUG;
  const electronPlugin = electron([
    {
      // Main-Process entry file of the Electron App.
      entry: 'electron/main/index.ts',
      onstart(options) {
        console.log(process.env.NODE_ENV_ELECTRON_VITE);
        if (process.env.VSCODE_DEBUG) {
          console.log(/* For `.vscode/.debug.script.mjs` */ '[startup] Electron App');
        } else {
          options.startup();
        }
      },
      vite: {
        resolve: {
          alias: [
            {
              find: /\/~\//,
              replacement: pathResolve('electron') + '/',
            },
            {
              find: /\/@\//,
              replacement: pathResolve('src') + '/',
            },
          ],
        },
        plugins: [bytecodePlugin()],

        build: {
          sourcemap: false,

          minify: isBuild,
          outDir: 'dist-electron/main',

          rollupOptions: {
            output: {
              manualChunks(id): string | void {
                if (id.includes('ipcMain/liu17')) {
                  console.log(id);
                  // return 'hahja';
                }
                // console.log(id);
              },
            },
            plugins: [],
            external: ['puppeteer-in-electron', 'puppeteer-core', '@prisma/client'],
            // external: Object.keys('dependencies' in pkg ? pkg.dependencies : {}),
            // external: [...Object.keys('dependencies' in pkg ? pkg.dependencies : {})].filter(
            //   (v) =>
            //     v != 'puppeteer-core' &&
            //     v != 'puppeteer-in-electron' &&
            //     v != 'axios' &&
            //     v != 'reflect-metadata' &&
            //     v != 'inversify' &&
            //     v != 'pinia' &&
            //     v != 'vue' &&
            //     v != 'electron-store',
            // ),

            // external: arr,
          },
        },
      },
    },
    {
      entry: 'electron/preload/index.ts',
      onstart(options) {
        // Notify the Renderer-Process to reload the page when the Preload-Scripts build is complete,
        // instead of restarting the entire Electron App.
        options.reload();
      },
      vite: {
        build: {
          sourcemap: sourcemap ? 'inline' : undefined, // #332
          minify: isBuild,
          outDir: 'dist-electron/preload',
          rollupOptions: {
            // external: Object.keys('dependencies' in pkg ? pkg.dependencies : {}),
          },
        },
      },
    },
    {
      entry: 'electron/preload/preloadLiu17.ts',
      onstart(options) {
        // Notify the Renderer-Process to reload the page when the Preload-Scripts build is complete,
        // instead of restarting the entire Electron App.
        options.reload();
      },
      vite: {
        build: {
          sourcemap: sourcemap ? 'inline' : undefined, // #332
          minify: isBuild,
          outDir: 'dist-electron/preload',
          rollupOptions: {
            // external: Object.keys('dependencies' in pkg ? pkg.dependencies : {}),
          },
        },
      },
    },
    {
      entry: 'electron/preload/preloadBaidu.ts',
      onstart(options) {
        // Notify the Renderer-Process to reload the page when the Preload-Scripts build is complete,
        // instead of restarting the entire Electron App.
        options.reload();
      },
      vite: {
        build: {
          sourcemap: sourcemap ? 'inline' : undefined, // #332
          minify: isBuild,
          outDir: 'dist-electron/preload',
          rollupOptions: {
            // external: Object.keys('dependencies' in pkg ? pkg.dependencies : {}),
          },
        },
      },
    },
  ]);

  return electronPlugin;
}
