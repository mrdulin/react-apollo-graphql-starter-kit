import { getCustomRepository } from 'typeorm';
import { UserRepository } from './userRepo';

export class Controller {
  private repository: UserRepository;

  constructor() {
    this.repository = getCustomRepository(UserRepository);
  }

  async init() {
    return this.repository.findUser(1);
  }
}
