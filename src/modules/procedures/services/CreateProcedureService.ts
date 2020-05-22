import { getRepository } from 'typeorm';

import Procedure from '../infra/typeorm/entities/Procedure';

interface IRequest {
  description: string;
  font: string;
  local: string;
  observations: string;
  tag: string;
  id: string;
}

class CreateProcedureService {
  public async execute({
    description,
    observations,
    local,
    tag,
    font,
    id,
  }: IRequest): Promise<Procedure> {
    const procedureRepository = getRepository(Procedure);

    const biggestIndex = await procedureRepository
      .createQueryBuilder('procedures')
      .select('MAX(procedures.index)', 'max')
      .where('subarea_id = :id', { id })
      .getRawOne();

    const procedure = procedureRepository.create({
      index: biggestIndex.max === null ? 1 : biggestIndex.max + 1,
      description,
      observations,
      local,
      tag,
      font,
      subarea_id: id,
    });

    await procedureRepository.save(procedure);

    return procedure;
  }
}

export default CreateProcedureService;
