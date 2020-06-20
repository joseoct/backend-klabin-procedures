import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateSubareaService from '../../../services/CreateSubareaService';
import ListAllSubareasService from '../../../services/ListAllSubareasService';

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
    const listAllSubareasService = container.resolve(ListAllSubareasService);

    const subareas = await listAllSubareasService.execute();

    return res.json(subareas);
  }
}

export default SubareasController;
