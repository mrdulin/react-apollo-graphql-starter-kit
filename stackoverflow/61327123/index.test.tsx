import { MyComponent } from './';
import { shallow } from 'enzyme';
import React from 'react';

describe('61327123', () => {
  it('should pass', () => {
    const wrapper = shallow(<MyComponent></MyComponent>);
    expect(wrapper.text()).toBe('my component');
  });

  describe('-someMethod', () => {
    it('should return default content', () => {
      const actual = MyComponent.prototype['someMethod']();
      expect(actual).toBe('my component');
    });

    it('should return default content too', () => {
      const wrapper = shallow(<MyComponent></MyComponent>);
      const actual = wrapper.instance()['someMethod']();
      expect(actual).toBe('my component');
    });

    it('should return passed content', () => {
      const wrapper = shallow(<MyComponent></MyComponent>);
      const actual = wrapper.instance()['someMethod']('hello');
      expect(actual).toBe('hello');
    });
  });
});
