import { getRepository, Repository } from 'typeorm';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';

import User from '@modules/users/infra/typeorm/entities/User';
import IFindAllProvidersDTO from '@modules/users/dtos/IFindAllProvidersDTO';

class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  public async findById(id: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne(id);

    return user;
  }

  public async findRoleById(id: string): Promise<string | undefined> {
    const user = await this.ormRepository.findOne({
      select: ['role'],
      where: { id },
    });

    return user.role;
  }

  public async findByCod(cod: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({
      where: { cod },
    });

    return user;
  }

  public async findAllUsers({
    except_user_id,
  }: IFindAllProvidersDTO): Promise<User[]> {
    let users = await this.ormRepository.find();

    if (except_user_id) {
      users = users.filter(user => user.id !== except_user_id);
    }

    return users;
  }

  public async create(userData: ICreateUserDTO): Promise<User> {
    const user = this.ormRepository.create(userData);

    await this.ormRepository.save(user);

    return user;
  }

  public async save(user: User): Promise<User> {
    return this.ormRepository.save(user);
  }

  public async findAllOperators(): Promise<User[]> {
    const users = this.ormRepository.find({
      where: { role: 'Operador' },
    });

    return users;
  }
}

export default UsersRepository;
