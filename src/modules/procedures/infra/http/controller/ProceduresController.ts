import { container } from 'tsyringe';
import { Request, Response } from 'express';

import CreateProcedureService from '../../../services/CreateProcedureService';
import ListProcedures from '../../../services/ListProcedures';
import DeleteProcedure from '../../../services/DeleteProcedure';

class ProceduresController {
  public async delete(req: Request, res: Response): Promise<Response> {
    const { id, index } = req.params;

    const deleteProcedureSpecificSuybarea = container.resolve(DeleteProcedure);

    const fixedProcedures = await deleteProcedureSpecificSuybarea.execute(
      id,
      Number(index),
    );

    return res.json(fixedProcedures).status(200);
  }

  public async index(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const listProceduresSpecificSubarea = container.resolve(ListProcedures);

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
      procedure_image: req.file.filename,
    });

    return res.json(procedure);
  }
}

export default ProceduresController;
