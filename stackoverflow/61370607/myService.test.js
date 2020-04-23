import { MyService } from './myService';
import { myHelper } from './myHelper';

jest.mock('./myHelper', () => {
  return {
    myHelper: jest.fn(),
  };
});

describe('my test', () => {
  it('should work properly', () => {
    myHelper.mockReturnValueOnce(24);
    const myService = new MyService();
    expect(myService.myMethod()).toBe(24);
  });
});
