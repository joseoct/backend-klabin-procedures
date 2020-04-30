import { Router } from 'express';
import subareaRouter from './subarea.routes';

const routes = Router();

routes.use(subareaRouter);

export default routes;
