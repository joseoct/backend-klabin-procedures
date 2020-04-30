import { getRepository } from 'typeorm';
import Subarea from '../models/Subarea';

interface Request {
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
  }: Request): Promise<Subarea> {
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
