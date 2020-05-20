import axios from 'axios';
import { mocked } from 'ts-jest/utils';

jest.mock('axios');

describe('61863621', () => {
  it('should pass', async () => {
    const users = [{ name: 'Bob' }];
    const resp = { data: users };
    mocked(axios.get).mockResolvedValue(resp);
    await expect(axios.get('http://localhost')).resolves.toEqual(resp);
  });
});
