import { Request, Response } from 'express';

class HomeController {
  async index(req: Request, res: Response) {
    res.json('Wellcome to my amazing API');
  }
}

export default new HomeController();
