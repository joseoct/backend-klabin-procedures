import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import User from '@modules/users/infra/typeorm/entities/User';

import IUsersRepository from '../repositories/IUsersRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

interface IRequest {
  name: string;
  cod: string;
  password: string;
  role: string;
}

@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider, // @inject('CacheProvider') // private cacheProvider: ICacheProvider,
  ) {}

  public async execute({ name, cod, password, role }: IRequest): Promise<User> {
    const checkUserExists = await this.usersRepository.findByCod(cod);

    if (checkUserExists) {
      throw new AppError('Um usuário com este código ja está cadastrado.', 400);
    }

    const hashedPassword = await this.hashProvider.generateHash(password);

    const user = await this.usersRepository.create({
      name,
      cod,
      password: hashedPassword,
      role,
    });

    // await this.cacheProvider.invalidatePrefix('providers-list');

    return user;
  }
}

export default CreateUserService;
