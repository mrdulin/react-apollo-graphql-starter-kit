import MyComponent from './';
import { shallow } from 'enzyme';
import React from 'react';

describe('61597604', () => {
  it('should pass', () => {
    const wrapper = shallow(<MyComponent></MyComponent>);
    const mEvent = { target: { value: 'ok' } };
    wrapper.find('input').simulate('change', mEvent);
    expect(wrapper.state()).toEqual({ someValue: 'ok' });
  });

  it('should pass 2', () => {
    const wrapper = shallow(<MyComponent></MyComponent>);
    const input = wrapper.find('input').getElement();
    const mEvent = { target: { value: 'ok' } };
    input.props.onChange(mEvent);
    expect(wrapper.state()).toEqual({ someValue: 'ok' });
  });
});
