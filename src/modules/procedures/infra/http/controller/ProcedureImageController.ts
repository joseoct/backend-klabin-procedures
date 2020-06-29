import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import UpdateProcedureImageService from '../../../services/UpdateProcedureImageService';

class ProcedureImageController {
  public async update(req: Request, res: Response): Promise<void> {
    const { id: subarea_id, index } = req.params;

    const updateProcedureImageService = container.resolve(
      UpdateProcedureImageService,
    );

    const updatedProcedureImage = await updateProcedureImageService.execute({
      subarea_id,
      index: Number(index),
      procedure_image: req.file.filename,
    });

    res.json(classToClass(updatedProcedureImage));
  }
}

export default ProcedureImageController;
