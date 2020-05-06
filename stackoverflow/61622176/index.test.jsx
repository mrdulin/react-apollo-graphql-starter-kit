import MyComponent from '.';
import { shallow } from 'enzyme';
import React from 'react';

describe('61622176', () => {
  it('should render null object name and null object percentage', () => {
    const wrapper = shallow(<MyComponent></MyComponent>);
    expect(
      wrapper.find('h1').contains([
        <h1>
          Object Name: <span>-</span>
        </h1>,
        <h2>
          Object Percentage: <span>-</span>
        </h2>,
      ]),
    );
  });

  it('should render object name and object percentage', () => {
    const wrapper = shallow(<MyComponent></MyComponent>);
    wrapper.setState({ myObject: { name: 'ok', percentage: 0.5 } });
    expect(
      wrapper.find('h1').contains([
        <h1>
          Object Name: <span>ok</span>
        </h1>,
        <h2>
          Object Percentage: <span>50%</span>
        </h2>,
      ]),
    );
  });
});
