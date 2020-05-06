import Synthese from './';
import { shallow } from 'enzyme';
import React from 'react';

describe('61614031', () => {
  it('should pass', () => {
    const wrapper = shallow(<Synthese></Synthese>);
    wrapper.setState({ currentStatus: 'ERROR' });
    expect(wrapper.find('div.errorBox')).toBeTruthy();
  });
});
