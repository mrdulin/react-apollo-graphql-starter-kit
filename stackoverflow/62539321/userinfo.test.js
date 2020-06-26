const userInfo = require('./userinfo');

describe('62539321', () => {
  it('should pass', async () => {
    const getUserInfoSpy = jest
      .spyOn(userInfo, 'getUserInfo')
      .mockResolvedValue([{ id: 1, name: 'test', password: '123456' }]);
    const userdata = await userInfo.getuserdata();
    expect(userdata).toEqual([{ id: 1, name: 'test', password: '123456' }]);
    getUserInfoSpy.mockRestore();
  });
});
