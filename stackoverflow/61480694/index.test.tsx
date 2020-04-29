import MyComponent from './';
import React from 'react';
import { shallow } from 'enzyme';

describe('61480694', () => {
  it('should pass', () => {
    const logSpy = jest.spyOn(console, 'log');
    const mProps = { index: 2 };
    const wrapper = shallow(<MyComponent {...mProps}></MyComponent>);
    expect(wrapper.find('span').text()).toBe('currentTab: 2');
    wrapper.find('select').simulate('change');
    expect(wrapper.find('span').text()).toBe('currentTab: 1');
    expect(logSpy).toBeCalledWith('test handleTabChange: 1');
    logSpy.mockRestore();
  });
});
