import { hideElem, getInputValue, cleanInput } from './';

describe('62455692', () => {
  describe('hideElem', () => {
    it('should hide elem', () => {
      const mElem = { classList: { add: jest.fn() } };
      hideElem(mElem);
      expect(mElem.classList.add).toBeCalledWith('js-hidden');
    });
  });

  describe('getInputValue', () => {
    it('should get input value', () => {
      const mInputElem = { value: 'mocked value' };
      jest.spyOn(document, 'querySelector').mockReturnValueOnce(mInputElem);
      const actual = getInputValue('#foo');
      expect(actual).toBe('mocked value');
      expect(document.querySelector).toBeCalledWith('#foo');
      document.querySelector.mockRestore();
    });
  });

  describe('cleanInput', () => {
    it('should clean input', () => {
      const mInputElem = { value: 'mocked value' };
      jest.spyOn(document, 'querySelector').mockReturnValueOnce(mInputElem);
      cleanInput('#foo');
      expect(mInputElem.value).toBe('');
      expect(document.querySelector).toBeCalledWith('#foo');
      document.querySelector.mockRestore();
    });
  });
});
