import { Router } from 'express';

import Subarea from '../models/Subarea';

const subareaRouter = Router();

interface SubareaProps {
  id: string;
  name?: string;
  tag: string;
  sector: string;
  local: string;
  observations: string;
}

const subareas: SubareaProps[] = [];

subareaRouter.get('/subarea', (req, res) => {
  return res.json(subareas);
});

subareaRouter.post('/subarea', (req, res) => {
  const { name, tag, sector, local, observations } = req.body;

  const subarea = new Subarea({ name, tag, sector, local, observations });

  subareas.push(subarea);

  return res.json(subarea);
});

export default subareaRouter;
