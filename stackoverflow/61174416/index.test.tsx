import React from 'react';
import { shallow } from 'enzyme';
import { App } from './';

describe('61174416', () => {
  it('should pass', () => {
    const logSpy = jest.spyOn(console, 'log');
    const props = {};
    const wrapper = shallow(<App {...props} />);
    wrapper.find('#btn-id').simulate('click');
    expect(logSpy).toHaveBeenCalled();
  });
});
