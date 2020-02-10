import React from 'react';
import { shallow } from 'enzyme';
import Form from './form';

test('Submit handler called on click', () => {
  const onHandleSubmitMock = jest.fn(() => console.log('mock was called'));
  Form.prototype.onHandleSubmit = onHandleSubmitMock;
  const wrapper = shallow(<Form />);
  const submitButton = wrapper.find(`[data-test="submit"]`);
  submitButton.simulate('click');

  expect(onHandleSubmitMock).toHaveBeenCalled();
});
