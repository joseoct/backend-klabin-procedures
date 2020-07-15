import { Repository, getRepository } from 'typeorm';

import Subarea from '../entities/Subarea';
import ISubareasRepository from '../../../repositories/ISubareasRepository';

import ICreateSubareaDTO from '../../../dtos/ICreateSubareaDTO';

class SubareasRepository implements ISubareasRepository {
  private ormRepository: Repository<Subarea>;

  constructor() {
    this.ormRepository = getRepository(Subarea);
  }

  public async findByLocal(local: string): Promise<Subarea[] | undefined> {
    const foundSubareas = await this.ormRepository
      .createQueryBuilder()
      .where('LOWER(local) LIKE :local', { local: `%${local.toLowerCase()}%` })
      .getMany();

    return foundSubareas;
  }

  public async findByTag(tag: string): Promise<Subarea[] | undefined> {
    const foundSubareas = await this.ormRepository
      .createQueryBuilder()
      .where('LOWER(tag) LIKE :tag', { tag: `%${tag.toLowerCase()}%` })
      .getMany();

    return foundSubareas;
  }

  public async findById(id: string): Promise<Subarea | undefined> {
    const findSubarea = await this.ormRepository.findOne(id);

    return findSubarea;
  }

  public async findAllSubareas(): Promise<Subarea[]> {
    const subareas = this.ormRepository.find({
      order: { created_at: 'DESC' },
    });

    return subareas;
  }

  public async create(subareaData: ICreateSubareaDTO): Promise<Subarea> {
    const subarea = this.ormRepository.create(subareaData);

    await this.ormRepository.save(subarea);

    return subarea;
  }

  public async save(subarea: Subarea): Promise<Subarea> {
    return this.ormRepository.save(subarea);
  }

  public async delete(subarea: Subarea): Promise<void> {
    await this.ormRepository.remove(subarea);
  }
}

export default SubareasRepository;
