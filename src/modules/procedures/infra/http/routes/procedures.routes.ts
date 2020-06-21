import { Router } from 'express';
import uploadConfig from '@config/upload';

import multer from 'multer';

import ProceduresController from '../controller/ProceduresController';

const upload = multer(uploadConfig.multer);
const proceduresRouter = Router();
const proceduresController = new ProceduresController();

proceduresRouter.post(
  '/:id',
  upload.single('subarea_image'),
  proceduresController.create,
);

proceduresRouter.get('/:id/procedures', proceduresController.index);

proceduresRouter.delete('/:id/:index', proceduresController.delete);

export default proceduresRouter;
