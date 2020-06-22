import { inject, injectable } from 'tsyringe';
import ISubareasRepository from '../repositories/ISubareasRepository';

@injectable()
class DeleteSubareaService {
  constructor(
    @inject('SubareasRepository')
    private subareasRepository: ISubareasRepository,
  ) {}

  public async execute(id: string): Promise<void> {
    await this.subareasRepository.delete(id);
  }
}

export default DeleteSubareaService;
