const database = {
  fetchValues() {
    return 'real data';
  },
};

describe('61450440', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });
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
  it('should pass too', () => {
    jest
      .spyOn(database, 'fetchValues')
      .mockImplementation(() => 'real data')
      .mockImplementationOnce(() => 'real data')
      .mockImplementationOnce(() => 'first call')
      .mockImplementationOnce(() => 'second call');

    console.log(
      [database.fetchValues(), database.fetchValues(), database.fetchValues(), database.fetchValues()].join(','),
    );
  });

  it('should pass 3', () => {
    const fetchValuesSpy = jest.spyOn(database, 'fetchValues');
    console.log('call original fetchValues:', database.fetchValues());
    fetchValuesSpy.mockImplementationOnce(() => 'first call').mockImplementationOnce(() => 'second call');
    console.log('call mocked fetchValues:', database.fetchValues(), database.fetchValues());
    console.log('call original fetchValues again:', database.fetchValues());
  });
});
