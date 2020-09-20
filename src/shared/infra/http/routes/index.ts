import { Router } from 'express';

import usersRouter from '@modules/users/infra/http/routes/users.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import profileRouter from '@modules/users/infra/http/routes/profile.routes';

import subareaRouter from '@modules/subareas/infra/http/routes/subarea.routes';
import procedureRouter from '@modules/procedures/infra/http/routes/procedures.routes';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/profile', profileRouter);

routes.use('/subareas', subareaRouter);

routes.use('/subareas', procedureRouter);

export default routes;
