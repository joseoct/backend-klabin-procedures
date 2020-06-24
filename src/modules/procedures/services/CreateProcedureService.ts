import { inject, injectable } from 'tsyringe';

import ISubareasRepository from '@modules/subareas/repositories/ISubareasRepository';
import AppError from '@shared/errors/AppError';
import Procedure from '../infra/typeorm/entities/Procedure';

import IProceduresRepository from '../repositories/IProceduresRepository';
import ICreateProcedureDTO from '../dtos/ICreateProcedureDTO';

@injectable()
class CreateProcedureService {
  constructor(
    @inject('SubareasRepository')
    private subareasRepository: ISubareasRepository,

    @inject('ProceduresRepository')
    private proceduresRepository: IProceduresRepository,
  ) {}

  public async execute(
    subarea_id: string,
    {
      description,
      observations,
      local,
      tag,
      font,
      procedure_image,
    }: ICreateProcedureDTO,
  ): Promise<Procedure> {
    const subarea = await this.subareasRepository.findById(subarea_id);

    if (!subarea) {
      throw new AppError('Subarea nao encontrada');
    }

    const procedure = await this.proceduresRepository.create(subarea_id, {
      description,
      observations,
      local,
      tag,
      font,
      procedure_image,
    });

    return procedure;
  }
}

export default CreateProcedureService;
