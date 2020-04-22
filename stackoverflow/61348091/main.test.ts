import { handleCopyIdToClipboard } from './main';

describe('61348091', () => {
  it('should pass', () => {
    const mElement = { textContent: 'hello' };
    const mockQuerySelector = jest.fn().mockReturnValueOnce(mElement);
    const mockWriteText = jest.fn();
    Object.defineProperty(document, 'querySelector', { value: mockQuerySelector });
    Object.defineProperty(navigator, 'clipboard', {
      value: {
        writeText: mockWriteText,
      },
    });
    handleCopyIdToClipboard();
    expect(mockQuerySelector).toBeCalledWith('.class-name');
    expect(mockWriteText).toBeCalledWith('hello');
  });
});
