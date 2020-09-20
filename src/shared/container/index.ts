import { container } from 'tsyringe';

import './providers/StorageProvider';
import '@modules/users/providers';

import SubareasRepository from '@modules/subareas/infra/typeorm/repositories/SubareasRepository';
import ISubareasRepository from '@modules/subareas/repositories/ISubareasRepository';

import ProceduresRepository from '@modules/procedures/infra/typeorm/repositories/ProceduresRepository';
import IProceduresRepository from '@modules/procedures/repositories/IProceduresRepository';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

container.registerSingleton<ISubareasRepository>(
  'SubareasRepository',
  SubareasRepository,
);

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IProceduresRepository>(
  'ProceduresRepository',
  ProceduresRepository,
);
