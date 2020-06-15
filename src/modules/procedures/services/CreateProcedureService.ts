import { inject, injectable } from 'tsyringe';

import Procedure from '../infra/typeorm/entities/Procedure';

import IProceduresRepository from '../repositories/IProceduresRepository';
import ICreateProcedureDTO from '../dtos/ICreateProcedureDTO';

@injectable()
class CreateProcedureService {
  constructor(
    @inject('ProceduresRepository')
    private proceduresRepository: IProceduresRepository,
  ) {}

  public async execute({
    id,
    description,
    observations,
    local,
    tag,
    font,
    subarea_image,
  }: ICreateProcedureDTO): Promise<Procedure> {
    const procedure = this.proceduresRepository.create({
      id,
      description,
      observations,
      local,
      tag,
      font,
      subarea_image,
    });

    return procedure;
  }
}

export default CreateProcedureService;
