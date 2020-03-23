import { Controller } from './controller';
import { func } from './func';

describe('60776211', () => {
  it('should pass', async () => {
    const fetchResultsSpy = jest.spyOn(Controller, 'fetchResults').mockResolvedValueOnce({ result: 'fake data' });
    const ctx = { req: { url: 'example.com' } };
    const actual = await func(ctx);
    expect(actual).toEqual({ result: 'fake data' });
    fetchResultsSpy.mockRestore();
  });
});
