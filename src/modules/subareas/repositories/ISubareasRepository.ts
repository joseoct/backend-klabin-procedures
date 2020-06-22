import ICreateSubareaDTO from '../dtos/ICreateSubareaDTO';
import Subarea from '../infra/typeorm/entities/Subarea';

export default interface ISubareasRepository {
  list(): Promise<Subarea[]>;
  create(data: ICreateSubareaDTO): Promise<Subarea>;
  delete(id: string): Promise<void>;
}
