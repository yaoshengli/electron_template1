import { TYPES } from './types';
import { myContainer } from './config';
import pie from 'puppeteer-in-electron';
import puppeteer from 'puppeteer-core';
import { app } from 'electron';
import Test from '../../ipcHandler/index';

const registryPuppeteer = async () => {
  myContainer.rebind(TYPES.Pie).toConstantValue(pie);
  await pie.initialize(app);
};
const registry = async (win) => {
  // await registryPuppeteer();

  const browser = await pie.connect(app, puppeteer as any);

  myContainer.rebind(TYPES.Browser).toConstantValue(browser);
  myContainer.rebind(TYPES.MainWindow).toConstantValue(win);
  TYPES.Test = Symbol.for('Test');
  myContainer.bind<any>(TYPES.Test).to(Test);

  const modules1 = import.meta.glob('./../../ipcMain/*.ts', { eager: true });
  const fnModules = [];
  Object.keys(modules1).forEach((key) => {
    const mod1 = (modules1 as any)[key].default || function () {};
    fnModules.push(mod1);
  });

  fnModules.forEach((v) => v());
};
export { registry, registryPuppeteer };
