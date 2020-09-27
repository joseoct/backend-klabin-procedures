import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest {
  user_id: string;
}

@injectable()
class FindUserRole {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ user_id }: IRequest): Promise<string> {
    const user_role = await this.usersRepository.findRoleById(user_id);

    if (!user_role) {
      throw new AppError('User not found');
    }

    return user_role;
  }
}

export default FindUserRole;
