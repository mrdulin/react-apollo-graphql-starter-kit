import UploadComponent from './';
import { shallow } from 'enzyme';
import { act } from 'react-dom/test-utils';
import RNFetchBlob from 'rn-fetch-blob';

jest.mock(
  'rn-fetch-blob',
  () => {
    const mRNFetchBlob = {
      fetch: jest.fn(),
    };
    return mRNFetchBlob;
  },
  { virtual: true },
);

const whenStable = async () =>
  await act(async () => {
    await new Promise((resolve) => setTimeout(resolve, 10));
  });

describe('60116223', () => {
  it('should upload image', async () => {
    const mJSON = { url: 'https://www.example.net/api/v1/upload-image' };
    const mResponse = { json: jest.fn().mockReturnValueOnce(mJSON) };
    RNFetchBlob.fetch.mockResolvedValueOnce(mResponse);
    const wrapper = shallow(<UploadComponent></UploadComponent>);
    expect(wrapper.find('span').text()).toBe('');
    wrapper.find('button').simulate('click');
    await whenStable();
    expect(wrapper.find('span').text()).toBe(mJSON.url);
  });
});
