import { Router } from 'express';

import SubareaController from '../controllers/SubareasController';

const subareaRouter = Router();
const subareaController = new SubareaController();

subareaRouter.post('/', subareaController.create);
subareaRouter.get('/', subareaController.index);

export default subareaRouter;
