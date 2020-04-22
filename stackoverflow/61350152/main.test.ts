import { main } from './main';
import { generateName } from './generateName';

jest.mock('./generateName', () => {
  return {
    generateName: jest.fn(),
  };
});

describe('61350152', () => {
  it('should pass', async () => {
    (generateName as jest.MockedFunction<typeof generateName>).mockResolvedValueOnce('hello');
    const actual = await main();
    expect(actual).toBe('hello');
  });
});
