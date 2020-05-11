describe('controller a', () => {
  it('should pass', () => {
    console.log('test setup:', global.app.exp.get('test setup'));
    expect(1 + 1).toBe(2);
  });
});
