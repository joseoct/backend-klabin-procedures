import { Router } from 'express';
import uploadConfig from '@config/upload';

import multer from 'multer';

import ProceduresController from '../controller/ProceduresController';

import ProcedureImageController from '../controller/ProcedureImageController';

const upload = multer(uploadConfig.multer);
const proceduresRouter = Router();
const proceduresController = new ProceduresController();

const procedureImageController = new ProcedureImageController();

proceduresRouter.post(
  '/:id',
  upload.single('procedure_image'),
  proceduresController.create,
);
proceduresRouter.get('/:id/procedures', proceduresController.index);
proceduresRouter.delete('/:id/:index', proceduresController.delete);
proceduresRouter.put('/:id/:index', proceduresController.update);

proceduresRouter.patch(
  '/:id/:index',
  upload.single('procedure_image'),
  procedureImageController.update,
);

export default proceduresRouter;
