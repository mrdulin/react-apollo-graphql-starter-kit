import main from '.';

describe('60152407', () => {
  it('should return window', () => {
    expect(main()).toBeDefined();
  });
  it('should mock window to be undefined', () => {
    Object.defineProperty(global, 'window', { value: undefined });
    expect(main()).toBeUndefined();
  });
});
