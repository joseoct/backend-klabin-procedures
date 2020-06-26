import { getRepository, Repository } from 'typeorm';

import IProceduresRepository from '@modules/procedures/repositories/IProceduresRepository';
import ICreateProcedure from '../../../dtos/ICreateProcedureDTO';
import Procedure from '../entities/Procedure';

class ProceduresRepository implements IProceduresRepository {
  private ormRepository: Repository<Procedure>;

  constructor() {
    this.ormRepository = getRepository(Procedure);
  }

  // All this methods are about an unique subarea

  public async create(
    subarea_id: string,
    procedureData: ICreateProcedure,
  ): Promise<Procedure> {
    const biggestIndex = await this.ormRepository
      .createQueryBuilder('procedures')
      .select('MAX(procedures.index)', 'max')
      .where('subarea_id = :subarea_id', { subarea_id })
      .getRawOne();

    const procedure = this.ormRepository.create({
      ...procedureData,
      index: biggestIndex.max === null ? 1 : biggestIndex.max + 1,
      subarea_id,
    });

    await this.ormRepository.save(procedure);

    return procedure;
  }

  public async findAllProcedures(subarea_id: string): Promise<Procedure[]> {
    const procedures = await this.ormRepository.find({
      where: { subarea_id },
      order: { index: 'ASC' },
    });

    return procedures;
  }

  public async findBySubareaIdAndIndex(
    subarea_id: string,
    index: number,
  ): Promise<Procedure | undefined> {
    const foundProcedure = await this.ormRepository.findOne({
      where: {
        subarea_id,
        index,
      },
    });

    return foundProcedure;
  }

  public async delete(procedure: Procedure): Promise<void> {
    await this.ormRepository.remove(procedure);
  }

  public async saveOne(procedure: Procedure): Promise<Procedure> {
    return this.ormRepository.save(procedure);
  }

  public async saveMany(procedures: Procedure[]): Promise<Procedure[]> {
    return this.ormRepository.save(procedures);
  }
}

export default ProceduresRepository;
