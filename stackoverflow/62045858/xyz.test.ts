import xyz from './xyz';

describe('62045858', () => {
  it('should pass', () => {
    expect(Object.keys(xyz.storingRepo)).toHaveLength(0);
    xyz.storeProduct('a', 'b');
    expect(xyz.storingRepo).toHaveProperty('a_b');
    expect(xyz.storingRepo['a_b']).toBeTruthy();
  });
});
