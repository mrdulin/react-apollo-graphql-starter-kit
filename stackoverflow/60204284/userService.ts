import UserRepository from './userRepository';

class UserService {
  private userRepository: UserRepository;
  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }
  public async destroy(uuid: string): Promise<boolean> {
    await this.userRepository.update({ userUUID: uuid }, { deletedDate: Date.now() });
    return true;
  }
}

export default UserService;
