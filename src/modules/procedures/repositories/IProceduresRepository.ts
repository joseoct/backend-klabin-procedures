import Procedure from '../infra/typeorm/entities/Procedure';
import ICreateProcedureDTO from '../dtos/ICreateProcedureDTO';

export default interface IProceduresRepository {
  findAllProcedures(subarea_id: string): Promise<Procedure[]>;
  findBySubareaIdAndIndex(
    subarea_id: string,
    index: number,
  ): Promise<Procedure | undefined>;
  create(
    subarea_id: string,
    procedureData: ICreateProcedureDTO,
  ): Promise<Procedure>;
  saveOne(procedure: Procedure): Promise<Procedure>;
  saveMany(procedures: Procedure[]): Promise<Procedure[]>;
  delete(procedure: Procedure): Promise<void>;
}
