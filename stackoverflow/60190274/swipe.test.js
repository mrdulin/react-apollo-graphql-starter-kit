import Swipe from './swipe';
import $ from 'jquery';

jest.mock(
  'jquery',
  () => {
    const m$ = { on: jest.fn(), ready: jest.fn(), addClass: jest.fn() };
    return jest.fn(() => m$);
  },
  // remove this option if you have installed jquery module
  { virtual: true },
);

describe('60190274', () => {
  it('should add class when click the button', () => {
    $().ready.mockImplementationOnce((callback) => callback());
    $().on.mockImplementationOnce((event, handler) => handler());
    new Swipe();
    expect($).toBeCalledWith(document);
    expect($).toBeCalledWith('#buttonID');
    expect($).toBeCalledWith('#navigation');
    expect($().ready).toBeCalled();
    expect($().on).toBeCalledWith('click', expect.any(Function));
    expect($().addClass).toBeCalledWith('blue');
  });
});
