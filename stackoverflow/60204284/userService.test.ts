import UserService from './userService';

describe('60204284', () => {
  describe('#UserService', () => {
    describe('#destroy', () => {
      it('should soft delete user', async () => {
        const mUserRepository = { update: jest.fn() };
        const userService = new UserService(mUserRepository);
        jest.spyOn(Date, 'now').mockReturnValueOnce(1000);
        const actual = await userService.destroy('uuid-xxx');
        expect(actual).toBeTruthy();
        expect(mUserRepository.update).toBeCalledWith({ userUUID: 'uuid-xxx' }, { deletedDate: 1000 });
      });
    });
  });
});
