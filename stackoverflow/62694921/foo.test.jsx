import React from 'react';
import { shallow } from 'enzyme';
import Foo from './foo';

describe('foo test', () => {
  test('should return ReactComponent', () => {
    let props = { val: 0 };
    let wrapper = shallow(<Foo {...props} />);
    expect(wrapper.text()).toEqual('ReactComponent');
  });
  test('should return ReactComponentFail', () => {
    let props = { val: 1 };
    let wrapper = shallow(<Foo {...props} />);
    expect(wrapper.text()).toEqual('ReactComponentFail');
  });
});
