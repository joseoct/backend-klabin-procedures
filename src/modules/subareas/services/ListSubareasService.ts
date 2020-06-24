import { inject, injectable } from 'tsyringe';

import Subarea from '../infra/typeorm/entities/Subarea';
import ISubareasRepository from '../repositories/ISubareasRepository';

@injectable()
class ListSubareasService {
  constructor(
    @inject('SubareasRepository')
    private subareasRepository: ISubareasRepository,
  ) {}

  public async execute(): Promise<Subarea[]> {
    const subareas = await this.subareasRepository.findAllSubareas();

    return subareas;
  }
}

export default ListSubareasService;
