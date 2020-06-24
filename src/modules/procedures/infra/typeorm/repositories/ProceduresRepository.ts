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

  // public async delete(id: string, index: number): Promise<Procedure[]> {
  //   const findProcedure = await this.ormRepository.findOne({
  //     where: {
  //       subarea_id: id,
  //       index,
  //     },
  //   });

  //   if (!findProcedure) {
  //     throw new AppError('Erro ao deletar procedimento', 500);
  //   }

  //   await this.ormRepository.delete({ subarea_id: id, index });

  //   const procedures = await this.ormRepository.find({
  //     where: { subarea_id: id },
  //   });

  //   const fixedProcedures = procedures.map(procedure =>
  //     procedure.index > index
  //       ? { ...procedure, index: procedure.index - 1 }
  //       : procedure,
  //   );

  //   await this.ormRepository.save(fixedProcedures);

  //   return fixedProcedures;
  // }
}

export default ProceduresRepository;
