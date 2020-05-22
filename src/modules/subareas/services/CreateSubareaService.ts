import { getRepository } from 'typeorm';

import Subarea from '../infra/typeorm/entities/Subarea';

interface IRequest {
  name: string;
  tag: string;
  sector: string;
  local: string;
  observations: string;
}

class CreateSubareaService {
  public async execute({
    name,
    tag,
    sector,
    local,
    observations,
  }: IRequest): Promise<Subarea> {
    const subareaRepository = getRepository(Subarea);

    const subareaCreated = subareaRepository.create({
      name,
      tag,
      sector,
      local,
      observations,
    });

    await subareaRepository.save(subareaCreated);

    return subareaCreated;
  }
}

export default CreateSubareaService;
