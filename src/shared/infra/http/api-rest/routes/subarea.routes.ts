import { Router } from 'express';

import { getRepository } from 'typeorm';

import Subarea from '../models/Subarea';
import CreateSubareaService from '../services/CreateSubareaService';

const subareaRouter = Router();

subareaRouter.get('/', async (req, res) => {
  const subareaRepository = getRepository(Subarea);

  const subareas = await subareaRepository.find({
    select: ['id'],
  });

  return res.json(subareas);
});

subareaRouter.post('/', async (req, res) => {
  const { name, tag, sector, local, observations } = req.body;

  const createSubareaService = new CreateSubareaService();

  const subarea = await createSubareaService.execute({
    name,
    tag,
    sector,
    local,
    observations,
  });

  return res.json(subarea);
});

export default subareaRouter;
