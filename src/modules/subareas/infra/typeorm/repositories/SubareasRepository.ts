import { Repository, getRepository } from 'typeorm';

import AppError from '@shared/errors/AppError';
import Subarea from '../entities/Subarea';
import ISubareasRepository from '../../../repositories/ISubareasRepository';

import ICreateSubareaDTO from '../../../dtos/ICreateSubareaDTO';

class SubareasRepository implements ISubareasRepository {
  private ormRepository: Repository<Subarea>;

  constructor() {
    this.ormRepository = getRepository(Subarea);
  }

  public async update(
    id: string,
    { local, name, observations, sector, tag }: ICreateSubareaDTO,
  ): Promise<Subarea> {
    const findSubarea = await this.ormRepository.findOne(id);

    if (!findSubarea) {
      throw new AppError('Falha ao alterar dados da subarea');
    }

    findSubarea.name = name;
    findSubarea.local = local;
    findSubarea.sector = sector;
    findSubarea.tag = tag;
    findSubarea.observations = observations;

    await this.ormRepository.save(findSubarea);

    return findSubarea;
  }

  public async delete(id: string): Promise<void> {
    const findSubarea = await this.ormRepository.findOne(id);

    if (!findSubarea) {
      throw new AppError('Falha ao deletar subarea', 500);
    }

    await this.ormRepository.remove(findSubarea);
  }

  public async list(): Promise<Subarea[]> {
    const subareas = this.ormRepository.find();

    return subareas;
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
