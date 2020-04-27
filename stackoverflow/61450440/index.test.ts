const database = {
  fetchValues() {
    return 'real data';
  },
};

describe('61450440', () => {
  it('should pass', () => {
    jest
      .spyOn(database, 'fetchValues')
      .mockImplementation(() => 'default')
      .mockImplementationOnce(() => 'first call')
      .mockImplementationOnce(() => 'second call');

    console.log(
      [database.fetchValues(), database.fetchValues(), database.fetchValues(), database.fetchValues()].join(','),
    );
  });
});
