import MyComponent from '.';
import { shallow } from 'enzyme';
import React from 'react';

describe('61390419', () => {
  it('should handle change if data1.value === "a"', () => {
    const wrapper = shallow(<MyComponent></MyComponent>);
    const select = { value: 2 };
    wrapper.instance().handleChange(select);
    expect(wrapper.state().data2).toEqual({ userId: 2, list: [] });
  });

  it('should handle change if data1.value === "b"', () => {
    const wrapper = shallow(<MyComponent></MyComponent>);
    wrapper.setState({ data1: { value: 'b' } });
    const select = ['1', '2'];
    wrapper.instance().handleChange(select);
    expect(wrapper.state()).toEqual({
      data1: { value: 'b' },
      data2: { userId: 1, list: ['1', '2'] },
      employees: ['1', '2'],
    });
  });
});
