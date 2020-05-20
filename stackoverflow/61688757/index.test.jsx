import Foo from './';
import { shallow } from 'enzyme';

describe('61688757', () => {
  it('should pass', () => {
    const wrapper = shallow(<Foo name="foo" />);
    expect(wrapper.find('.foo')).toHaveLength(1);
    expect(wrapper.find('.bar')).toHaveLength(0);
    wrapper.setProps({ name: 'bar' });
    expect(wrapper.find('.foo')).toHaveLength(0);
    expect(wrapper.find('.bar')).toHaveLength(1);
  });
});
