import { Checkbox } from './';
import React from 'react';
import { shallow } from 'enzyme';

describe('60708551', () => {
  it('check if checkbox checked ', () => {
    const testState = { isChecked: false };
    const checkboxWrapper = shallow(
      <Checkbox
        label=""
        id="0"
        onChange={(e) => {
          testState[e.target.name] = e.target.value;
        }}
        isChecked={testState.isChecked}
      />,
    );
    const input = checkboxWrapper.find('input');
    input.simulate('change', { target: { name: 'isChecked', value: true } });
    expect(testState.isChecked).toBeTruthy();
    checkboxWrapper.setProps({ isChecked: testState.isChecked });
    expect(checkboxWrapper.find('input').props().checked).toBeTruthy();
  });
});
