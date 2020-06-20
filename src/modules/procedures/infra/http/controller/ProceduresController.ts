import { container } from 'tsyringe';
import { Request, Response } from 'express';

import CreateProcedureService from '../../../services/CreateProcedureService';
import ListProceduresSpecificSubarea from '../../../services/ListProceduresSpecificSubarea';

class ProceduresController {
  public async index(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const listProceduresSpecificSubarea = container.resolve(
      ListProceduresSpecificSubarea,
    );

    const proceduresOfSpecificSubarea = await listProceduresSpecificSubarea.execute(
      id,
    );

    return res.json(proceduresOfSpecificSubarea);
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const { description, observations, local, tag, font } = req.body;

    const createProcedureService = container.resolve(CreateProcedureService);

    const procedure = await createProcedureService.execute({
      id,
      description,
      observations,
      local,
      tag,
      font,
      subarea_image: req.file.filename,
    });

    return res.json(procedure);
  }
}

export default ProceduresController;
