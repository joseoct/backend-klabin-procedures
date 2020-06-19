import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateSubareaService from '../../../services/CreateSubareaService';
import GetAllSubareasService from '../../../services/GetAllSubareasService';

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

  public async index(req: Request, res: Response): Promise<Response> {
    const getAllSubareasService = container.resolve(GetAllSubareasService);

    const subareas = await getAllSubareasService.execute();

    return res.json(subareas);
  }
}

export default SubareasController;
