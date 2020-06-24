import { inject, injectable } from 'tsyringe';
import IProceduresRepository from '../repositories/IProceduresRepository';
import Procedure from '../infra/typeorm/entities/Procedure';

@injectable()
class ListProceduresSpecificSubarea {
  constructor(
    @inject('ProceduresRepository')
    private proceduresRepository: IProceduresRepository,
  ) {}

  public async execute(subarea_id: string): Promise<Procedure[]> {
    const procedures = await this.proceduresRepository.findAllProcedures(
      subarea_id,
    );

    return procedures;
  }
}

export default ListProceduresSpecificSubarea;
