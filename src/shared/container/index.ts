import { container } from 'tsyringe';

import './providers/StorageProvider';

import SubareasRepository from '@modules/subareas/infra/typeorm/repositories/SubareasRepository';
import ISubareasRepository from '@modules/subareas/repositories/ISubareasRepository';

import ProceduresRepository from '@modules/procedures/infra/typeorm/repositories/ProceduresRepository';
import IProceduresRepository from '@modules/procedures/repositories/IProceduresRepository';

container.registerSingleton<ISubareasRepository>(
  'SubareasRepository',
  SubareasRepository,
);

container.registerSingleton<IProceduresRepository>(
  'ProceduresRepository',
  ProceduresRepository,
);
