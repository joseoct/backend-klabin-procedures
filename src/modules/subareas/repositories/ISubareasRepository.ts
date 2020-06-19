import ICreateSubareaDTO from '../dtos/ICreateSubareaDTO';
import Subarea from '../infra/typeorm/entities/Subarea';

export default interface ISubareasRepository {
  getAllSubareas(): Promise<Subarea[]>;
  create(data: ICreateSubareaDTO): Promise<Subarea>;
}
