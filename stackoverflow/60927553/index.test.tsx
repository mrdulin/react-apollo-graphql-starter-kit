import { Header } from './';
import React from 'react';
import { mount } from 'enzyme';

describe('60927553', () => {
  it('should pass', () => {
    const logSpy = jest.spyOn(console, 'log');
    const wrapper = mount(<Header></Header>);
    const mEvent = {};
    wrapper.find('select').simulate('change', mEvent);
    expect(logSpy).toBeCalledWith('onchange');
  });
});
