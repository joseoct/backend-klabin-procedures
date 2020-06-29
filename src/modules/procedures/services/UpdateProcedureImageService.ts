import { inject, injectable } from 'tsyringe';
import IProceduresRepository from '../repositories/IProceduresRepository';

@injectable()
class UpdateProcedureImageService {
  constructor(
    @inject('ProceduresRepository')
    private proceduresRepository: IProceduresRepository,
  ) {}

  public async();
}

export default UpdateProcedureImageService;
