import { container } from 'tsyringe';
import { Request, Response } from 'express';

import { classToClass } from 'class-transformer';

import CreateProcedureService from '../../../services/CreateProcedureService';
import ListProceduresService from '../../../services/ListProceduresService';
import DeleteProcedureService from '../../../services/DeleteProcedureService';
import UpdateProcedureService from '../../../services/UpdateProcedureService';
import ShowProcedureService from '../../../services/ShowProcedureService';

class ProceduresController {
  public async update(req: Request, res: Response): Promise<Response> {
    const { id: subarea_id, index } = req.params;
    const { description, observations, local, tag, font } = req.body;

    const updateProcedureService = container.resolve(UpdateProcedureService);

    const updatedProcedure = await updateProcedureService.execute({
      subarea_id,
      index: Number(index),
      description,
      observations,
      local,
      tag,
      font,
    });

    return res.json(classToClass(updatedProcedure));
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const { id: subarea_id, index } = req.params;

    const deleteProcedureSpecificSubarea = container.resolve(
      DeleteProcedureService,
    );

    const fixedProcedures = await deleteProcedureSpecificSubarea.execute({
      subarea_id,
      index: Number(index),
    });

    return res.json().status(200);
  }

  public async index(req: Request, res: Response): Promise<Response> {
    const { id: subarea_id } = req.params;

    const listProceduresSpecificSubarea = container.resolve(
      ListProceduresService,
    );

    const proceduresOfSpecificSubarea = await listProceduresSpecificSubarea.execute(
      subarea_id,
    );

    return res.json(classToClass(proceduresOfSpecificSubarea));
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const { id: subarea_id } = req.params;

    const { description, observations, local, tag, font } = req.body;

    const createProcedureService = container.resolve(CreateProcedureService);

    const procedure = await createProcedureService.execute({
      subarea_id,
      description,
      observations,
      local,
      tag,
      font,
      procedure_image: req.file.filename,
    });

    return res.json(classToClass(procedure));
  }

  public async show(req: Request, res: Response): Promise<Response> {
    const { id: subarea_id, index } = req.params;

    const showProcedureSpecificSubarea = container.resolve(
      ShowProcedureService,
    );

    const procedure = await showProcedureSpecificSubarea.execute({
      subarea_id,
      index: Number(index),
    });

    return res.json(classToClass(procedure)).status(200);
  }
}

export default ProceduresController;
