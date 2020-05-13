describe('61727628', () => {
  describe('b', () => {
    it('should pass', () => {
      console.log('global.$:', global.$);
      console.log('global.moment:', global.moment);
      expect(1 + 1).toBe(2);
    });
  });
});
