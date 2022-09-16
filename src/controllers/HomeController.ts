import { Request, Response } from 'express';
import knex from '../knex/config/database';

class HomeController {
  async index(req: Request, res: Response) {
    const resp = await knex('Questionaries');
    res.json(resp);
  }
}

export default new HomeController();
