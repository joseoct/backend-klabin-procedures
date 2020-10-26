import { Request, Response, NextFunction } from 'express';

import { container } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import FindUserRole from '@modules/users/services/FindUserRole';
import permissions from './permissions/permissions';

export default async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
): Promise<void> {
  const usersRepository = container.resolve(FindUserRole);

  const user_id = request.user.id;

  const user_role = await usersRepository.execute({ user_id });

  if (!permissions(user_role)) {
    throw new AppError('erro', 401);
  }

  next();
}
