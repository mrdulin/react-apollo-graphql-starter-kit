import { ParentComponent } from './parent';
import { shallow } from 'enzyme';
import axios from 'axios';
import React from 'react';
import { act } from 'react-dom/test-utils';

const whenStable = async () => {
  await act(async () => {
    await new Promise((resolve) => setTimeout(resolve, 0));
  });
};

describe('61465031', () => {
  it('should pass', async () => {
    const mResponse = { data: ['a', 'b'] };
    const getSpy = jest.spyOn(axios, 'get').mockResolvedValueOnce(mResponse);
    const wrapper = shallow(<ParentComponent></ParentComponent>);
    expect(wrapper.find('ChildComponent').prop('stockData')).toEqual(['a', 'b']);
    getSpy.mockRestore();
  });
});
