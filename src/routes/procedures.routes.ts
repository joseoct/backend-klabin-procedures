import { Router } from 'express';

import CreateProcedureService from '../services/CreateProcedureService';

const proceduresRouter = Router();

proceduresRouter.post('/subarea/:id', async (req, res) => {
  const { id } = req.params;
  const { description, observations, local, tag, font } = req.body;

  const createProcedureService = new CreateProcedureService();

  const procedure = await createProcedureService.execute({
    id,
    description,
    observations,
    local,
    tag,
    font,
  });

  return res.json(procedure);
});

export default proceduresRouter;
