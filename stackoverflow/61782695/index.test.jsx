import React, { useRef } from 'react';
import { shallow } from 'enzyme';
import Child2 from './';

jest.mock('react', () => {
  const originReact = jest.requireActual('react');
  const mUseRef = jest.fn();
  return {
    ...originReact,
    useRef: mUseRef,
  };
});

describe('61782695', () => {
  it('should pass', () => {
    const mRef = { current: { offsetWidth: 100 } };
    useRef.mockReturnValueOnce(mRef);
    const wrapper = shallow(<Child2></Child2>);
    expect(wrapper.find('#myDiv').text()).toBe('123');
    expect(wrapper.find('p').text()).toBe('Div width is: 100');
  });

  it('should pass - 2', () => {
    const mRef = { current: { offsetWidth: 300 } };
    useRef.mockReturnValueOnce(mRef);
    const wrapper = shallow(<Child2></Child2>);
    expect(wrapper.find('#myDiv').text()).toBe('ABC');
    expect(wrapper.find('p').text()).toBe('Div width is: 300');
  });

  it('should pass - 3', () => {
    const mRef = {};
    useRef.mockReturnValueOnce(mRef);
    const wrapper = shallow(<Child2></Child2>);
    expect(wrapper.find('#myDiv').text()).toBe('123');
    expect(wrapper.find('p').text()).toBe('Div width is: ');
  });
});
