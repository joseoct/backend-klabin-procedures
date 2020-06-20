import { Router } from 'express';
import uploadConfig from '@config/upload';

import multer from 'multer';

import ProceduresController from '../controller/ProceduresController';

const upload = multer(uploadConfig.multer);
const proceduresRouter = Router();
const proceduresController = new ProceduresController();

proceduresRouter.post(
  '/subarea/:id',
  upload.single('subarea_image'),
  proceduresController.create,
);

proceduresRouter.get('/subarea/:id', proceduresController.index);

export default proceduresRouter;
