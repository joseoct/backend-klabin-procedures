import Procedure from '../infra/typeorm/entities/Procedure';
import ICreateProcedureDTO from '../dtos/ICreateProcedureDTO';

export default interface IProceduresRepository {
  findAllProceduresSpecificSubarea(id: string): Promise<Procedure[]>;
  create(data: ICreateProcedureDTO): Promise<Procedure>;
}
