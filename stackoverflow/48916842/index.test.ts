import { funcA } from './';

describe('48916842', () => {
  it('should pass', () => {
    const mResponse = { ok: false, json: jest.fn().mockRejectedValueOnce('custom error') };
    expect(funcA(mResponse)).rejects.toThrowError('custom error');
  });
});
