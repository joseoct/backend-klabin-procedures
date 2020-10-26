import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';
import FindOperators from '../../../services/FindOperators';

export default class UsersController {
  public async index(request: Request, response: Response): Promise<Response> {
    try {
      const FindOperatorsService = container.resolve(FindOperators);

      const users = await FindOperatorsService.execute();

      return response.json(classToClass(users));
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }
}
