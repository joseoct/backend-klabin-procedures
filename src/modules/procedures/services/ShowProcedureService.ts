import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import IProceduresRepository from '../repositories/IProceduresRepository';
import Procedure from '../infra/typeorm/entities/Procedure';

interface IRequest {
  subarea_id: string;
  index: number;
}

@injectable()
class ShowProcedureService {
  constructor(
    @inject('ProceduresRepository')
    private proceduresRepository: IProceduresRepository,
  ) {}

  public async execute({ subarea_id, index }: IRequest): Promise<Procedure> {
    const foundProcedure = await this.proceduresRepository.findBySubareaIdAndIndex(
      subarea_id,
      index,
    );

    if (!foundProcedure) {
      throw new AppError('Erro ao encontrar procedimento', 500);
    }

    return foundProcedure;
  }
}

export default ShowProcedureService;
