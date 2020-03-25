import { MyLib } from './MyLib';

export class MyClass {
  myLib;
  constructor() {
    this.myLib = new MyLib();
  }

  myMainMethod = (arg) => {
    this.myLib.firstMethod((arg) => {
      this.myLib.secondMethod(arg);
    });
  };
}
