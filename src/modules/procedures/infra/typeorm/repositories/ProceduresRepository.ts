import { getRepository, Repository } from 'typeorm';

import IProceduresRepository from '@modules/procedures/repositories/IProceduresRepository';
import ICreateProcedure from '../../../dtos/ICreateProcedureDTO';
import Procedure from '../entities/Procedure';

class ProceduresRepository implements IProceduresRepository {
  private ormRepository: Repository<Procedure>;

  constructor() {
    this.ormRepository = getRepository(Procedure);
  }

  public async create({
    id,
    tag,
    font,
    local,
    observations,
    description,
    subarea_image,
  }: ICreateProcedure): Promise<Procedure> {
    const biggestIndex = await this.ormRepository
      .createQueryBuilder('procedures')
      .select('MAX(procedures.index)', 'max')
      .where('subarea_id = :id', { id })
      .getRawOne();

    const procedure = this.ormRepository.create({
      index: biggestIndex.max === null ? 1 : biggestIndex.max + 1,
      tag,
      font,
      local,
      observations,
      description,
      subarea_image,
      subarea_id: id,
    });

    await this.ormRepository.save(procedure);

    return procedure;
  }
}

export default ProceduresRepository;
