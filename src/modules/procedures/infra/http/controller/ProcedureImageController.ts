import { Request, Response } from 'express';

class ProcedureImageController {
  public async update(req: Request, res: Response): Promise<Response> {
    const { id: subarea_id, index } = req.params;

    console.log(subarea_id, index);

    res.json({ ok: true });
  }
}

export default ProcedureImageController;
