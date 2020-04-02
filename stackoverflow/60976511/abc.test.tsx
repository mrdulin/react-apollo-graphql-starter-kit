import { Abc } from './abc';
import { mount } from 'enzyme';
import React from 'react';

describe('60976511', () => {
  it('should pass', () => {
    const wrapper = mount(<Abc />);
    expect(wrapper).toBeTruthy();
  });
});
