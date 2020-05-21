import { Logout } from './';
import { useDispatch } from 'react-redux';
import { mount } from 'enzyme';
import Router from 'next/router';

jest.mock('next/router', () => ({ push: jest.fn() }), { virtual: true });

const mDispatch = jest.fn();
jest.mock('react-redux', () => {
  const originalReactRedux = jest.requireActual('react-redux');
  const mUseDispatch = jest.fn(() => mDispatch);
  return {
    ...originalReactRedux,
    useDispatch: mUseDispatch,
  };
});

describe('61928263', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  afterAll(() => {
    jest.resetAllMocks();
  });
  it('should pass without using mock store', () => {
    const wrapper = mount(<Logout></Logout>);
    expect(wrapper.find('LoadingMessage')).toBeTruthy();
    expect(useDispatch).toBeCalledTimes(1);
    expect(mDispatch).toBeCalledWith({ type: 'LOGOUT' });
    expect(Router.push).toBeCalledWith('/');
  });
});
