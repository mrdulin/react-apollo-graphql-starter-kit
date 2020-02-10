import Parent, { Form } from './';
import React from 'react';
import { shallow } from 'enzyme';
import { Redirect } from 'react-router-dom';
import { act } from 'react-dom/test-utils';

const whenStable = async () =>
  await act(async () => {
    await new Promise((resolve) => setTimeout(resolve, 0));
  });

describe('60137762', () => {
  it('should render Form', () => {
    const props = { submitForm: jest.fn() };
    const wrapper = shallow(<Parent {...props}></Parent>);
    expect(wrapper.find(Form)).toBeTruthy();
  });

  it('should handle submit and render Redirect', async () => {
    const props = { submitForm: jest.fn().mockResolvedValueOnce(true) };
    const wrapper = shallow(<Parent {...props}></Parent>);
    wrapper.find(Form).simulate('submit');
    await whenStable();
    expect(props.submitForm).toBeCalledWith({});
    expect(wrapper.find(Redirect)).toBeTruthy();
  });

  it('should handle submit and render Form', async () => {
    const props = { submitForm: jest.fn().mockResolvedValueOnce(false) };
    const wrapper = shallow(<Parent {...props}></Parent>);
    wrapper.find(Form).simulate('submit');
    await whenStable();
    expect(props.submitForm).toBeCalledWith({});
    expect(wrapper.find(Form)).toBeTruthy();
  });

  it('should handle error if submit failure', async () => {
    const logSpy = jest.spyOn(console, 'log');
    const mError = new Error('network');
    const props = { submitForm: jest.fn().mockRejectedValueOnce(mError) };
    const wrapper = shallow(<Parent {...props}></Parent>);
    wrapper.find(Form).simulate('submit');
    await whenStable();
    expect(props.submitForm).toBeCalledWith({});
    expect(logSpy).toHaveBeenCalledWith('Submit error: ', mError);
  });
});
