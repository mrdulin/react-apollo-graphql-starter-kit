import React from 'react';
import Profile from '.';
import { shallow } from 'enzyme';

describe('62202833', () => {
  it('should pass', () => {
    const wrapper = shallow(<Profile></Profile>);
    const mEvent = { preventDefault: jest.fn() };
    wrapper.find('button').simulate('click', mEvent);
    expect(mEvent.preventDefault).toBeCalledTimes(1);
  });
});
