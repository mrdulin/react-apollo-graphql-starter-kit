import { Popup } from './';
import { shallow } from 'enzyme';

describe('60759790', () => {
  it('should render text for h3', () => {
    const mProps = { config: { text: 'h3' } };
    const wrapper = shallow(<Popup {...mProps}></Popup>);
    expect(wrapper.find('h3').text()).toEqual('h3');
  });
});
