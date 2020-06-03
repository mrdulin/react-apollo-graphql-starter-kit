import { main } from './';
import { DynamicImport } from './DynamicImport';
import { mocked } from 'ts-jest/utils';

jest.mock('./DynamicImport', () => {
  return {
    DynamicImport: jest.fn(),
  };
});

jest.mock('./MyPageWrapper', () => ({
  __esModule: true,
  default: 'mocked MyPageWrapper',
}));

describe('62161452', () => {
  it('should pass', async () => {
    mocked(DynamicImport).mockImplementationOnce(({ id, loader }) => {
      console.log('mocked implementation');
      return loader();
    });
    const actual = (await main()).default;
    expect(actual).toBe('mocked MyPageWrapper');
    expect(DynamicImport).toBeCalledWith({ id: 'MyPage', loader: expect.any(Function) });
  });
});
