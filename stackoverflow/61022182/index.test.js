import { mount } from 'enzyme';
import YourComponent from './';

describe('YourComponent test for mocking static method', () => {
  it('should render', () => {
    YourComponent.getHelloWorld = jest.fn(() => {
      return 'Hello Universe';
    });
    const wrapper = mount(<YourComponent />);

    expect(wrapper.text()).toEqual('Hello Universe');
  });
});
