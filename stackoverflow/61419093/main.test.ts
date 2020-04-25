import { main } from './main';
import path from 'path';

describe('61419093', () => {
  it('should pass', () => {
    const resolveSpy = jest.spyOn(path, 'resolve').mockReturnValueOnce('/fakepath');
    const actual = main('/root/avatar.jpg');
    expect(actual).toBe('/fakepath');
    expect(resolveSpy).toBeCalledWith('/root/avatar.jpg');
    resolveSpy.mockRestore();
  });
});
