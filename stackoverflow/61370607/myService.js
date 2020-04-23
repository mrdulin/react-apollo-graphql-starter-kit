import { myHelper } from './myHelper';

export class MyService {
  myMethod() {
    const myVar = myHelper(42);
    return myVar;
  }
}
