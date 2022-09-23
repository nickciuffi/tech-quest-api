import { Request, Response } from 'express';

class HomeController {
  async index(req: Request, res: Response) {
    res.json('Welcome to my amazing api.');
  }
}

export default new HomeController();
