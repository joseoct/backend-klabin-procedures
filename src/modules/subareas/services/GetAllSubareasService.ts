import { inject, injectable } from 'tsyringe';

import Subarea from '../infra/typeorm/entities/Subarea';
import ISubareasRepository from '../repositories/ISubareasRepository';

@injectable()
class GetAllSubareasService {
  constructor(
    @inject('SubareasRepository')
    private subareasRepository: ISubareasRepository,
  ) {}

  public async execute(): Promise<Subarea[]> {
    const subareas = await this.subareasRepository.getAllSubareas();

    return subareas;
  }
}

export default GetAllSubareasService;
