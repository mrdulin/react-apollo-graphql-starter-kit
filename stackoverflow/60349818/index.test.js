const rewire = require('rewire');
const mod = rewire('./');

describe('60349818', () => {
  describe('#decodeEntities', () => {
    it('should pass', () => {
      const mElement = { innerHTML: '', value: 'some value' };
      const mCreateElement = jest.fn().mockReturnValueOnce(mElement);
      mod.__set__('document', {
        createElement: mCreateElement,
      });
      const decodeEntities = mod.__get__('decodeEntities');
      const actual = decodeEntities('encodedString');
      expect(actual).toEqual('some value');
      expect(mCreateElement).toBeCalledWith('textarea');
    });
  });
});
