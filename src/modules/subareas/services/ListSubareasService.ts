import { inject, injectable } from 'tsyringe';

import Subarea from '../infra/typeorm/entities/Subarea';
import ISubareasRepository from '../repositories/ISubareasRepository';

interface IRequest {
  searchFor: string | undefined;
  searchValue: string | undefined;
}

@injectable()
class ListSubareasService {
  constructor(
    @inject('SubareasRepository')
    private subareasRepository: ISubareasRepository,
  ) {}

  public async execute({
    searchFor,
    searchValue,
  }: IRequest): Promise<Subarea[]> {
    if (searchFor === 'tag' && searchValue) {
      const foundSubareas = await this.subareasRepository.findByTag(
        searchValue,
      );

      return foundSubareas;
    }

    if (searchFor === 'local' && searchValue) {
      const foundSubareas = await this.subareasRepository.findByLocal(
        searchValue,
      );

      return foundSubareas;
    }

    const foundSubareas = await this.subareasRepository.findAllSubareas();

    return foundSubareas;
  }
}

export default ListSubareasService;
