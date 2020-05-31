import DateNavigation from './DateNavigation';
import moment from 'moment';

jest.mock('moment', () => {
  const mMoment = { format: jest.fn() };
  return jest.fn(() => mMoment);
});

describe('62042433', () => {
  it('display date correctly', () => {
    const date = '31.01.2022';
    moment().format.mockReturnValueOnce(date);
    const component = mount(<DateNavigation date={'2022-01-31'} locale={'en'} />);
    expect(component.html()).toEqual('<span>31.01.2022</span>');
    expect(moment).toBeCalledWith('2022-01-31');
    expect(moment().format).toBeCalledWith('DD.MM.YYYY');
  });
});
