import CustomEntry from './';
import { mount } from 'enzyme';
import React from 'react';
import Entry from './Entry';

describe('60838636', () => {
  it('should add entry', () => {
    const wrapper = mount(<CustomEntry></CustomEntry>);
    expect(wrapper.find(Entry).length).toBe(0);
    wrapper.find('button').simulate('click');
    expect(wrapper.find(Entry).length).toBe(1);
  });
});
