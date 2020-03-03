import CodeVerification from './';
import { mount } from 'enzyme';
import React from 'react';

describe('60492514', () => {
  it('should handle paste event', () => {
    const wrapper = mount(<CodeVerification></CodeVerification>);
    const logSpy = jest.spyOn(console, 'log');
    const mEvent = { clipboardData: { getData: jest.fn().mockReturnValueOnce('12') } };
    wrapper.find('input').simulate('paste', mEvent);
    expect(mEvent.clipboardData.getData).toBeCalledWith('text');
    expect(logSpy).toBeCalledWith('12');
  });
});
