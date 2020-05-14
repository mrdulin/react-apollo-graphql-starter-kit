const UserData = require('./userData');
const myService = require('./myService');

describe('61784452', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });
  it('should pass', async () => {
    jest.spyOn(myService, 'getUserData').mockResolvedValueOnce('fake user data');
    jest.spyOn(myService, 'getManagerData').mockResolvedValueOnce('fake manager data');
    const userData = new UserData();
    const actual = await userData.getData('query');
    expect(actual).toEqual('fake manager data');
    expect(myService.getUserData).toBeCalledWith('query');
    expect(myService.getManagerData).toBeCalledWith('fake user data');
  });
});
