import { Utils } from './';
import url from 'url';

describe('60884651', () => {
  it('should parse url', () => {
    const parseSpy = jest.spyOn(url, 'parse');
    const actual = Utils.parseUrl('http://stackoverflow.com');
    expect(actual.href).toBe('http://stackoverflow.com/');
    expect(actual.protocol).toBe('http:');
    expect(parseSpy).toBeCalledWith('http://stackoverflow.com', true);
    parseSpy.mockRestore();
  });
});
