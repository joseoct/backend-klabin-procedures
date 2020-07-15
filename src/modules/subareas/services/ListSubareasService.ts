import { inject, injectable } from 'tsyringe';

import Subarea from '../infra/typeorm/entities/Subarea';
import ISubareasRepository from '../repositories/ISubareasRepository';

interface IRequest {
  tag: string | undefined;
  local: string | undefined;
}

@injectable()
class ListSubareasService {
  constructor(
    @inject('SubareasRepository')
    private subareasRepository: ISubareasRepository,
  ) {}

  public async execute({ local, tag }: IRequest): Promise<Subarea[]> {
    if (tag) {
      const foundSubareas = await this.subareasRepository.findByTag(tag);

      return foundSubareas;
    }

    if (local) {
      const foundSubareas = await this.subareasRepository.findByLocal(local);

      return foundSubareas;
    }

    const foundSubareas = await this.subareasRepository.findAllSubareas();

    return foundSubareas;
  }
}

export default ListSubareasService;
