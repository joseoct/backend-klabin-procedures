import { inject, injectable } from 'tsyringe';

import Subarea from '../infra/typeorm/entities/Subarea';
import ISubareasRepository from '../repositories/ISubareasRepository';

interface IRequest {
  name: string;
  tag: string;
  sector: string;
  local: string;
  observations: string;
}

@injectable()
class CreateSubareaService {
  constructor(
    @inject('SubareasRepository')
    private subareasRepository: ISubareasRepository,
  ) {}

  public async execute({
    name,
    tag,
    sector,
    local,
    observations,
  }: IRequest): Promise<Subarea> {
    const subarea = await this.subareasRepository.create({
      name,
      tag,
      sector,
      local,
      observations,
    });

    return subarea;
  }
}

export default CreateSubareaService;
