import { Router } from 'express';

import subareaRouter from './subarea.routes';
import procedureRouter from './procedures.routes';

const routes = Router();

routes.use('/subarea', subareaRouter);
routes.use(procedureRouter);

export default routes;
