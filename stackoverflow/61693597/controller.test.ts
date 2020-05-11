import { Controller } from './controller';
import { getCustomRepository } from 'typeorm';
import { mocked } from 'ts-jest/utils';
import { UserRepository } from './userRepo';

jest.mock('typeorm', () => ({ getCustomRepository: jest.fn() }));

describe('61693597', () => {
  it('should pass', async () => {
    const userRepo = { findUser: jest.fn().mockResolvedValueOnce('fake user') };
    mocked(getCustomRepository).mockReturnValueOnce(userRepo);
    const controller = new Controller();
    const actual = await controller.init();
    expect(actual).toBe('fake user');
    expect(getCustomRepository).toBeCalledWith(UserRepository);
    expect(userRepo.findUser).toBeCalledWith(1);
  });
});
