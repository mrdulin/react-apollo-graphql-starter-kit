import { MyComponent } from './';
import { mount } from 'enzyme';
import React from 'react';

describe('61130176', () => {
  it('should push state', () => {
    window.history.pushState = jest.fn();
    mount(<MyComponent></MyComponent>);
    expect(window.history.pushState).toBeCalledWith({ id: 'myId' }, 'yes', 'myArg');
  });
});
