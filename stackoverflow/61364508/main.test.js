import { main } from './main';
import Cookies from 'js-cookie';

describe('61364508', () => {
  it('should pass', () => {
    const getSpy = jest.spyOn(Cookies, 'get').mockReturnValueOnce('123');
    const cookieName = 'sid';
    main(cookieName);
    expect(getSpy).toBeCalledWith(cookieName);
    getSpy.mockRestore();
  });
});
