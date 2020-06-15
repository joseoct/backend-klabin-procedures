import Procedure from '../infra/typeorm/entities/Procedure';
import ICreateProcedureDTO from '../dtos/ICreateProcedureDTO';

export default interface IProceduresRepository {
  create(data: ICreateProcedureDTO): Promise<Procedure>;
}
