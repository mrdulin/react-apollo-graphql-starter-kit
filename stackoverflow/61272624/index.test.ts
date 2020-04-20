import { MyClass } from './';
import { from } from 'rxjs';

jest.mock('rxjs', () => {
  return { from: jest.fn() };
});

describe('61272624', () => {
  it('should pass', async () => {
    const myclass = new MyClass();
    let input: () => Promise<boolean>;
    const fromMock: any = (o) => {
      input = o;
    };
    (from as jest.MockedFunction<typeof from>).mockImplementationOnce(fromMock);
    myclass.toTest();
    const actual = await input!();
    expect(actual).toBeTruthy();
  });
});
