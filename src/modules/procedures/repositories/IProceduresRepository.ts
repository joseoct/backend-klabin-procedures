import Procedure from '../infra/typeorm/entities/Procedure';
import ICreateProcedureDTO from '../dtos/ICreateProcedureDTO';

export default interface IProceduresRepository {
  findAllProceduresSpecificSubarea(id: string): Promise<Procedure[]>;
  createProcedureSpecificSubarea(data: ICreateProcedureDTO): Promise<Procedure>;
  deleteProcedureSpecificSubarea(
    id: string,
    index: number,
  ): Promise<Procedure[]>;
}
