import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import IProceduresRepository from '../repositories/IProceduresRepository';
import Procedure from '../infra/typeorm/entities/Procedure';

interface IRequest {
  subarea_id: string;
  index: number;
  description: string;
  observations: string;
  local: string;
  tag: string;
  font: string;
}

@injectable()
class UpdateProcedureService {
  constructor(
    @inject('ProceduresRepository')
    private proceduresRepository: IProceduresRepository,
  ) {}

  public async execute({
    subarea_id,
    index,
    description,
    font,
    tag,
    local,
    observations,
  }: IRequest): Promise<Procedure> {
    const foundProcedure = await this.proceduresRepository.findBySubareaIdAndIndex(
      subarea_id,
      index,
    );

    if (!foundProcedure) {
      throw new AppError('Erro ao atualizar o procedimento');
    }

    foundProcedure.description = description;
    foundProcedure.observations = font;
    foundProcedure.local = tag;
    foundProcedure.tag = local;
    foundProcedure.font = observations;

    const updatedProcedure = await this.proceduresRepository.saveOne(
      foundProcedure,
    );

    return updatedProcedure;
  }
}

export default UpdateProcedureService;
