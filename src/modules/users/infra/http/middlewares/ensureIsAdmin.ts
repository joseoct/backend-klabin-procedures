import { Request, Response, NextFunction } from 'express';
import { container } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import FindUserRole from '@modules/users/services/FindUserRole';

interface ITokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default async function ensureIdAdmin(
  request: Request,
  response: Response,
  next: NextFunction,
): Promise<void> {
  const usersRepository = container.resolve(FindUserRole);

  const user_id = request.user.id;

  const user_role = await usersRepository.execute({ user_id });

  if (user_role !== 'admin') {
    throw new AppError(
      'Apenas administradores conseguem cadastrar usuários',
      401,
    );
  }

  next();
}
