import User from '../infra/typeorm/entities/User';
import ICreateUserDTO from '../dtos/ICreateUserDTO';

export default interface IUsersRepository {
  findAllOperators(): Promise<User[]>;
  findById(id: string): Promise<User | undefined>;
  findRoleById(id: string): Promise<string | undefined>;
  findByCod(email: string): Promise<User | undefined>;
  create(data: ICreateUserDTO): Promise<User>;
  save(data: User): Promise<User>;
}
