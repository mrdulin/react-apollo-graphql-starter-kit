import { SearchProviders } from './';
import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';

describe('60135675', () => {
  let wrapper: ShallowWrapper;
  beforeEach(() => {
    const props = { changeRoute: jest.fn() };
    wrapper = shallow(<SearchProviders {...props}></SearchProviders>);
  });
  it('should render', () => {
    expect(wrapper.exists()).toBeTruthy();
    expect(wrapper.find('span').text()).toBe('Hospital');
  });

  it('should handle input change', () => {
    wrapper.find('#speciality').simulate('change');
    expect(wrapper.find('span').text()).toBe('HOSPITAL');
  });
});
