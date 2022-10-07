import { Request, Response } from 'express';
import model from '../models/AutorizedEmailsModel';
import isValidId from '../utils/isValidId';

class AutorizedEmailsController {
  public async get(req: Request, res: Response) {
    if (!req.body.email) return res.json('Something went wrong');
    const data = await model.getEmailByTxt(req.body.email);
    return res.json(data.length > 0 ? data[0] : 'Email not found');
  }

  public async index(req: Request, res: Response) {
    const data = await model.getAllEmails();
    return res.json(data.length > 0 ? data : 'There are no Autorized Emails');
  }

  public async delete(req: Request, res: Response) {
    if (!isValidId(req.params.id)) return res.json('Something went wrong');
    const data = await model.deleteEmail(Number(req.params.id));
    return res.json(data === 1 ? 'Deleted' : 'Something went wrong');
  }

  public async store(req: Request, res: Response) {
    if (!req.body.email) return res.json('There is something wrong with your data');
    const data = await model.storeEmails(req.body);
    return res.json(data);
  }
}

export default new AutorizedEmailsController();
