import { inject, injectable } from 'tsyringe';
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';
import AppError from '@shared/errors/AppError';
import IProceduresRepository from '../repositories/IProceduresRepository';
import Procedure from '../infra/typeorm/entities/Procedure';

interface IRequest {
  subarea_id: string;
  index: number;
  procedure_image: string;
}

@injectable()
class UpdateProcedureImageService {
  constructor(
    @inject('ProceduresRepository')
    private proceduresRepository: IProceduresRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  public async execute({
    subarea_id,
    index,
    procedure_image,
  }: IRequest): Promise<Procedure> {
    const foundProcedure = await this.proceduresRepository.findBySubareaIdAndIndex(
      subarea_id,
      index,
    );

    if (!foundProcedure) {
      throw new AppError('Falha ao alterar a imagem do procedimento');
    }

    await this.storageProvider.deleteFile(foundProcedure.procedure_image);

    await this.storageProvider.saveFile(procedure_image);

    foundProcedure.procedure_image = procedure_image;

    await this.proceduresRepository.saveOne(foundProcedure);

    return foundProcedure;
  }
}

export default UpdateProcedureImageService;
