/*
 * @Author: Fan
 * @Date: 2021-02-02 19:28:11
 * @description:
 */
import { Container } from 'inversify';
import { TYPES } from './types';
import Store from 'electron-store';
import 'reflect-metadata';
import { Warrior, Weapon, ThrowableWeapon } from './interfaces';
import { Ninja, Katana, Shuriken } from './entities';
// import Test from '../../ipcHandler/index';

// import Liu17 from '../../ipcHandler/liu17';
// import Baidu from '../../ipcHandler/baidu';

console.log(333);

const store = new Store();
store.set('unicorn', {});
const myContainer = new Container();

myContainer.bind<Warrior>(TYPES.Warrior).to(Ninja);
myContainer.bind<Weapon>(TYPES.Weapon).to(Katana);
myContainer.bind<ThrowableWeapon>(TYPES.ThrowableWeapon).to(Shuriken);
myContainer.bind(TYPES.Store).toConstantValue(store);
myContainer.bind(TYPES.Pie).toConstantValue({});
myContainer.bind(TYPES.Browser).toConstantValue({});
myContainer.bind(TYPES.MainWindow).toConstantValue({});
// TYPES.Liu17 = Symbol.for('Liu17');
// myContainer.bind<any>(TYPES.Liu17).to(Liu17);
// TYPES.Test = Symbol.for('Test');
// myContainer.bind<any>(TYPES.Test).to(Test);
// const modules = import.meta.glob('./../../ipcHandler/*.ts', );
// console.log(modules);
// TYPES.Baidu = Symbol.for('Baidu');
// myContainer.bind<any>(TYPES.Baidu).to(Baidu);

export { myContainer };
