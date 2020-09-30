import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureIsAdmin from '@modules/users/infra/http/middlewares/ensureIsAdmin';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import controlPermission from '@modules/users/infra/http/middlewares/controlPermission';
import UsersController from '../controllers/UsersController';

const usersRouter = Router();
const usersController = new UsersController();

// SoC: Separation of Concerns (Separação de Preocupações).
// Rota: Receber a requisição, chamar outro arquivo, devolver uma resposta.

usersRouter.use(ensureAuthenticated);

usersRouter.get('/', controlPermission, usersController.show);

usersRouter.use(ensureIsAdmin);

usersRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      cod: Joi.string().required(),
      password: Joi.string().required(),
      role: Joi.string().required(),
    },
  }),
  usersController.create,
);

export default usersRouter;
