import { MyClass as myClass } from './my-class';
jest.mock('./my-class', () => ({ MyClass: jest.fn() }));
console.log(myClass);
