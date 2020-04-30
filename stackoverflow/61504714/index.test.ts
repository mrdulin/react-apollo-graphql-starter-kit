describe('61504714', () => {
  it('should pass', () => {
    let handlerRef;
    const check = jest.fn().mockImplementation((_, handler) => {
      console.log('call check');
      handlerRef = handler;
    });
    const callback = jest.fn((yesOrNo: boolean) => (yesOrNo ? 'yes' : 'no'));
    check('_', callback);
    expect(callback).not.toBeCalled();
    const rval = handlerRef(true);
    expect(rval).toBe('yes');
    expect(check).toBeCalledWith('_', callback);
    expect(callback).toBeCalledWith(true);
  });
});
