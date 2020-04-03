import { saveCourse } from './';
import axios from 'axios';

jest.mock('axios', () => jest.fn());

describe('60992357', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });
  it('should return data if status code equals 200', async () => {
    const mRes = { status: 200, data: 'fake data' };
    axios.mockResolvedValueOnce(mRes);
    const actual = await saveCourse({ id: 1 });
    expect(actual).toEqual('fake data');
    expect(axios).toBeCalledWith({
      method: 'PUT',
      url: 'http://example.com/1',
      headers: { 'content-type': 'application/json' },
      data: { id: 1 },
    });
  });

  it('should throw error if status code equals 400', async () => {
    const mRes = { status: 400, text: jest.fn().mockReturnValue('network') };
    axios.mockResolvedValueOnce(mRes);
    const logSpy = jest.spyOn(console, 'log');
    const actual = await saveCourse({ id: 1 });
    expect(actual).toBeUndefined();
    expect(axios).toBeCalledWith({
      method: 'PUT',
      url: 'http://example.com/1',
      headers: { 'content-type': 'application/json' },
      data: { id: 1 },
    });
    expect(mRes.text).toBeCalledTimes(1);
    expect(logSpy).toBeCalledWith(new Error('network'));
  });
});
