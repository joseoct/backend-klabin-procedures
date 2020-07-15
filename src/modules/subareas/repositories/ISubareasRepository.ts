import ICreateSubareaDTO from '../dtos/ICreateSubareaDTO';
import Subarea from '../infra/typeorm/entities/Subarea';

export default interface ISubareasRepository {
  findById(id: string): Promise<Subarea | undefined>;
  findByTag(tag: string): Promise<Subarea[] | undefined>;
  findByLocal(local: string): Promise<Subarea[] | undefined>;
  findAllSubareas(): Promise<Subarea[]>;
  save(subarea: Subarea): Promise<Subarea>;
  create(subareaData: ICreateSubareaDTO): Promise<Subarea>;
  delete(subarea: Subarea): Promise<void>;
}
