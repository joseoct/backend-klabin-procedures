import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import ISubareasRepository from '../repositories/ISubareasRepository';

interface IRequest {
  id: string;
}

@injectable()
class DeleteSubareaService {
  constructor(
    @inject('SubareasRepository')
    private subareasRepository: ISubareasRepository,
  ) {}

  public async execute({ id }: IRequest): Promise<void> {
    const subarea = await this.subareasRepository.findById(id);

    if (!subarea) {
      throw new AppError('Não foi possível achar a subarea a ser deletada');
    }

    await this.subareasRepository.delete(subarea);
  }
}

export default DeleteSubareaService;
