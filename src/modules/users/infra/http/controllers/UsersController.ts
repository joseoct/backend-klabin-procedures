import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateUserService from '@modules/users/services/CreateUserService';
import { classToClass } from 'class-transformer';

export default class UsersController {
  public async create(request: Request, response: Response): Promise<Response> {
    try {
      const { name, cod, password, role } = request.body;

      const createUserService = container.resolve(CreateUserService);

      const user = await createUserService.execute({
        name,
        cod,
        password,
        role,
      });

      return response.json(classToClass(user));
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }

  public async show(request: Request, response: Response): Promise<Response> {
    return response.json({ message: 'oi' });
  }
}
