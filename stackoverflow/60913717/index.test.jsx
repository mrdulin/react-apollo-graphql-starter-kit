import React from 'react';
import * as DataService from './dataService';
import { mount } from 'enzyme';
import MyComponent from './';
import { act } from 'react-dom/test-utils';

jest.mock('./dataService');

const whenStable = async () => {
  await act(async () => {
    await new Promise((resolve) => setTimeout(resolve, 0));
  });
};

describe('60913717', () => {
  it('should pass', async () => {
    const mockValues = {
      data: {},
      count: 10,
      result: [],
    };
    DataService.getData = jest.fn().mockResolvedValueOnce(mockValues);
    const wrapper = mount(<MyComponent></MyComponent>);
    expect(wrapper.find('LoadingComponent')).toBeTruthy();
    await whenStable();
    expect(wrapper.find('AnotherComponent')).toBeTruthy();
  });
});
