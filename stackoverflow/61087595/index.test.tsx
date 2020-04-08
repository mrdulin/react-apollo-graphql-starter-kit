import TestComponent from './';
import React from 'react';
import { shallow } from 'enzyme';

describe('61087595', () => {
  it('should pass', () => {
    const obj = {
      name: 'Test',
    };
    const wrapper = shallow(<TestComponent name={obj} />);
    expect(wrapper.props().children).toEqual({ name: 'Test' });
  });
});
