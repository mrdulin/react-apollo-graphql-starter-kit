import MenubarComponent from './menubarComponent';
import { shallow } from 'enzyme';
import React from 'react';

describe('61476449', () => {
  it('should pass', () => {
    const mProps = { history: { push: jest.fn() } };
    const wrapper = shallow(<MenubarComponent.WrappedComponent {...mProps}></MenubarComponent.WrappedComponent>);
    const items = wrapper.state('items');
    items[0].command();
    expect(mProps.history.push).toBeCalledWith('/');
    items[1].command();
    expect(mProps.history.push).toBeCalledWith('/about');
  });
});
