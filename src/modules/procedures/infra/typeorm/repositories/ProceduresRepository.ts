import { getRepository, Repository } from 'typeorm';

import IProceduresRepository from '@modules/procedures/repositories/IProceduresRepository';
import AppError from '@shared/errors/AppError';
import ICreateProcedure from '../../../dtos/ICreateProcedureDTO';
import Procedure from '../entities/Procedure';

class ProceduresRepository implements IProceduresRepository {
  private ormRepository: Repository<Procedure>;

  constructor() {
    this.ormRepository = getRepository(Procedure);
  }

  public async createProcedureSpecificSubarea({
    id,
    tag,
    font,
    local,
    observations,
    description,
    procedure_image,
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
      procedure_image,
      subarea_id: id,
    });

    await this.ormRepository.save(procedure);

    return procedure;
  }

  public async findAllProceduresSpecificSubarea(
    id: string,
  ): Promise<Procedure[]> {
    const procedures = await this.ormRepository.find({
      where: { subarea_id: id },
    });

    return procedures;
  }

  public async deleteProcedureSpecificSubarea(
    id: string,
    index: number,
  ): Promise<Procedure[]> {
    const findProcedure = await this.ormRepository.findOne({
      where: {
        subarea_id: id,
        index,
      },
    });

    if (!findProcedure) {
      throw new AppError('Erro ao deletar procedimento', 500);
    }

    await this.ormRepository.delete({ subarea_id: id, index });

    const procedures = await this.ormRepository.find({
      where: { subarea_id: id },
    });

    const fixedProcedures = procedures.map(procedure =>
      procedure.index > index
        ? { ...procedure, index: procedure.index - 1 }
        : procedure,
    );

    await this.ormRepository.save(fixedProcedures);

    return fixedProcedures;
  }
}

export default ProceduresRepository;
