import Choice from './';
import FirstComponent from './first';
import SecondComponent from './second';
import React from 'react';
import { shallow } from 'enzyme';

describe('60152774', () => {
  it('should render first component', () => {
    const props = { choices: [] };
    const wrapper = shallow(<Choice {...props}></Choice>);
    expect(wrapper.find(FirstComponent)).toBeTruthy();
  });

  it('should render second component', () => {
    const props = {};
    const wrapper = shallow(<Choice {...props}></Choice>);
    expect(wrapper.find(SecondComponent)).toBeTruthy();
  });
});
