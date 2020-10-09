import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import IProceduresRepository from '../repositories/IProceduresRepository';
import Procedure from '../infra/typeorm/entities/Procedure';

interface IRequest {
  subarea_id: string;
  index: number;
}

@injectable()
class DeleteProcedureSpecificSubarea {
  constructor(
    @inject('ProceduresRepository')
    private proceduresRepository: IProceduresRepository,
  ) {}

  public async execute({ subarea_id, index }: IRequest): Promise<Procedure[]> {
    const foundProcedure = await this.proceduresRepository.findBySubareaIdAndIndex(
      subarea_id,
      index,
    );

    if (!foundProcedure) {
      throw new AppError('Erro ao deletar procedimento', 500);
    }

    await this.proceduresRepository.delete(foundProcedure);

    const remainingProcedures = await this.proceduresRepository.findAllProcedures(
      subarea_id,
    );

    const fixedProceduresIndexes = remainingProcedures.map(procedure =>
      procedure.index > index
        ? { ...procedure, index: procedure.index - 1 }
        : procedure,
    );

    return this.proceduresRepository.saveMany(
      fixedProceduresIndexes as Procedure[],
    );
  }
}

export default DeleteProcedureSpecificSubarea;
