import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateSubareaService from '../../../services/CreateSubareaService';

class SubareasController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { name, tag, sector, local, observations } = req.body;

    const createSubareaService = container.resolve(CreateSubareaService);

    const subarea = await createSubareaService.execute({
      name,
      tag,
      sector,
      local,
      observations,
    });

    return res.json(subarea);
  }

  // public async index(req: Request, res: Response): Promise<Response> {
  //   const subareaRepository = getRepository(Subarea);

  //   const subareas = await subareaRepository.find({
  //     select: ['id'],
  //   });

  //   return res.json(subareas);
  // }
}

export default SubareasController;
