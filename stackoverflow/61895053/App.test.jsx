import App from './app';

describe('61895053', () => {
  it('should pass', () => {
    const wrapper = mount(<App />);
    const button = wrapper.find('button');
    console.log(button.props().onClick);
  });
});
