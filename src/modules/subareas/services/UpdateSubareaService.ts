import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import ISubareasRepository from '../repositories/ISubareasRepository';
import Subarea from '../infra/typeorm/entities/Subarea';

interface ISubarea {
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
    { local, observations, sector, tag, name }: Subarea,
  ): Promise<Subarea> {
    const subarea = await this.subareasRepository.findById(id);

    if (!subarea) {
      throw new AppError(
        'Não foi possível encontrar a subarea para fazer a atualização',
      );
    }

    subarea.local = local;
    subarea.observations = observations;
    subarea.sector = sector;
    subarea.tag = tag;
    subarea.name = name;

    const updatedSubarea = await this.subareasRepository.save(subarea);

    return updatedSubarea;
  }
}

export default UpdateSubareaService;
