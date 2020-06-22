import { inject, injectable } from 'tsyringe';
import ISubareasRepository from '../repositories/ISubareasRepository';
import Subarea from '../infra/typeorm/entities/Subarea';

interface IRequest {
  name: string;
  tag: string;
  sector: string;
  local: string;
  observations: string;
}

@injectable()
class UpdateSubareaService {
  constructor(
    @inject('SubareasRepository')
    private subareasRepository: ISubareasRepository,
  ) {}

  public async execute(
    id: string,
    { local, name, observations, tag, sector }: IRequest,
  ): Promise<Subarea> {
    const subareaUpdated = this.subareasRepository.update(id, {
      local,
      name,
      observations,
      tag,
      sector,
    });

    return subareaUpdated;
  }
}

export default UpdateSubareaService;
