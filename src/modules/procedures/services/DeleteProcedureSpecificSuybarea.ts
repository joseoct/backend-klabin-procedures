import { inject, injectable } from 'tsyringe';
import IProceduresRepository from '../repositories/IProceduresRepository';
import Procedure from '../infra/typeorm/entities/Procedure';

@injectable()
class DeleteProcedureSpecificSuybarea {
  constructor(
    @inject('ProceduresRepository')
    private proceduresRepository: IProceduresRepository,
  ) {}

  public async execute(id: string, index: number): Promise<Procedure[]> {
    const fixedProcedures = await this.proceduresRepository.deleteProcedureSpecificSubarea(
      id,
      index,
    );

    return fixedProcedures;
  }
}

export default DeleteProcedureSpecificSuybarea;
