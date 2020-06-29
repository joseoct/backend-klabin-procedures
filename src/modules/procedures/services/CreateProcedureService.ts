import { inject, injectable } from 'tsyringe';

import ISubareasRepository from '@modules/subareas/repositories/ISubareasRepository';
import AppError from '@shared/errors/AppError';
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';
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

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
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

    const fileName = await this.storageProvider.saveFile(procedure_image);

    const procedure = await this.proceduresRepository.create(subarea_id, {
      description,
      observations,
      local,
      tag,
      font,
      procedure_image: fileName,
    });

    return procedure;
  }
}

export default CreateProcedureService;
