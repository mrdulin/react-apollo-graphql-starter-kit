import { handleCopyIdToClipboard } from './main';

describe('61348091', () => {
  it('should pass', async () => {
    const mElement = { textContent: 'hello' };
    const mockQuerySelector = jest.fn().mockReturnValueOnce(mElement);
    const mockWriteText = jest.fn().mockResolvedValueOnce('clipText');
    Object.defineProperty(document, 'querySelector', { value: mockQuerySelector });
    Object.defineProperty(navigator, 'clipboard', {
      value: {
        writeText: mockWriteText,
      },
    });
    const actual = await handleCopyIdToClipboard();
    expect(actual).toBe('clipText');
    expect(mockQuerySelector).toBeCalledWith('.class-name');
    expect(mockWriteText).toBeCalledWith('hello');
  });
});
