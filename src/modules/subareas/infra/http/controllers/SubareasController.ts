import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateSubareaService from '../../../services/CreateSubareaService';
import ListSubareasService from '../../../services/ListSubareasService';
import DeleteSubareaService from '../../../services/DeleteSubareaService';
import UpdateSubareaService from '../../../services/UpdateSubareaService';

class SubareasController {
  public async update(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { name, tag, sector, local, observations } = req.body;

    const updateSubareaService = container.resolve(UpdateSubareaService);

    const subareaUpdated = await updateSubareaService.execute(id, {
      name,
      tag,
      sector,
      local,
      observations,
    });

    return res.json(subareaUpdated);
  }

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
    const listSubareasService = container.resolve(ListSubareasService);

    const subareas = await listSubareasService.execute();

    return res.json(subareas);
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const deleteSubareaService = container.resolve(DeleteSubareaService);

    await deleteSubareaService.execute(id);

    return res.json().status(200);
  }
}

export default SubareasController;
