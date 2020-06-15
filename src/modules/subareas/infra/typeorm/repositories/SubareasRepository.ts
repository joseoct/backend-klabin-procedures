import { Repository, getRepository } from 'typeorm';

import Subarea from '../entities/Subarea';
import ISubareasRepository from '../../../repositories/ISubareasRepository';

import ICreateSubareaDTO from '../../../dtos/ICreateSubareaDTO';

class SubareasRepository implements ISubareasRepository {
  private ormRepository: Repository<Subarea>;

  constructor() {
    this.ormRepository = getRepository(Subarea);
  }

  public async create({
    local,
    name,
    observations,
    sector,
    tag,
  }: ICreateSubareaDTO): Promise<Subarea> {
    const subarea = this.ormRepository.create({
      local,
      name,
      observations,
      sector,
      tag,
    });

    await this.ormRepository.save(subarea);

    return subarea;
  }
}

export default SubareasRepository;
