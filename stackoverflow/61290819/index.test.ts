import { MyClass } from './';

describe('61290819', () => {
  it('should pass', () => {
    const myClass = new MyClass();
    const property = 'field';
    const message: string = myClass.generateMessage(property);
    expect(message).toMatch(new RegExp(`^${property}?`));
  });

  it('should pass too', () => {
    const myClass = new MyClass();
    const property = 'f_ield';
    const message: string = myClass.generateMessage(property);
    expect(message).not.toMatch(new RegExp('^field?'));
  });
});
