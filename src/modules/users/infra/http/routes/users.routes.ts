import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureIsAdmin from '@modules/users/infra/http/middlewares/ensureIsAdmin';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import controlPermission from '@modules/users/infra/http/middlewares/controlPermission';
import UsersController from '../controllers/UsersController';
import OperatorsController from '../controllers/OperatorsController';

const usersRouter = Router();
const usersController = new UsersController();
const operatorsController = new OperatorsController();

// SoC: Separation of Concerns (Separação de Preocupações).
// Rota: Receber a requisição, chamar outro arquivo, devolver uma resposta.

usersRouter.use(ensureAuthenticated);

usersRouter.get('/', controlPermission, usersController.show);

usersRouter.use(ensureIsAdmin);

usersRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      cod: Joi.string().required(),
      password: Joi.string().required(),
      role: Joi.string().required(),
    },
  }),
  usersController.create,
);

usersRouter.get('/operators', operatorsController.index);

export default usersRouter;
