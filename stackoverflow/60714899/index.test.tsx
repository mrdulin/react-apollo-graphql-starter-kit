import { MyComponent } from './';
import { mount } from 'enzyme';
import React from 'react';

describe('60714899', () => {
  it('should add event listener', () => {
    const spyInit = jest.spyOn(MyComponent.prototype as any, 'init');
    const mMyProperty = { addEventListener: jest.fn() } as any;
    MyComponent.prototype['myProperty'] = mMyProperty;
    const wrapper = mount(<MyComponent flag={true} />);
    expect(spyInit).toBeCalled();
    expect(mMyProperty.addEventListener).toBeCalledWith('event', expect.any(Function), false);
  });

  it('should NOT add event listener', () => {
    const spyInit = jest.spyOn(MyComponent.prototype as any, 'init');
    const mMyProperty = { addEventListener: jest.fn() } as any;
    MyComponent.prototype['myProperty'] = mMyProperty;
    const wrapper = mount(<MyComponent flag={false} />);
    expect(spyInit).toBeCalled();
    expect(mMyProperty.addEventListener).not.toBeCalled();
  });
});
