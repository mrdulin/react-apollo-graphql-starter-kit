import * as mod from './myModule';

describe('funcB', () => {
  it('should call funcA', () => {
    jest.spyOn(mod, 'funcA');
    mod.funcB();
    expect(mod.funcA).toHaveBeenCalled();
  });
});
