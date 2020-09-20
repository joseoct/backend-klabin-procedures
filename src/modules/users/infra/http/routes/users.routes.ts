import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import UsersController from '../controllers/UsersController';

const usersRouter = Router();
const usersController = new UsersController();

// SoC: Separation of Concerns (Separação de Preocupações).
// Rota: Receber a requisição, chamar outro arquivo, devolver uma resposta.

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
