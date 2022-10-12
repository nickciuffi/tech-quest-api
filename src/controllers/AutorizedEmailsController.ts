import { Request, Response } from 'express';
import model from '../models/AutorizedEmailsModel';
import isValidId from '../utils/isValidId';

class AutorizedEmailsController {
  public async get(req: Request, res: Response) {
    if (!req.body.email) return res.status(400).json('Something went wrong');
    try {
      const data = await model.getEmailByTxt(req.body.email);
      return data.length > 0 ? res.status(200).json(data[0]) : res.status(404).json('Email not found');
    } catch (e) {
      return res.status(400).json(e);
    }
  }

  public async index(req: Request, res: Response) {
    try {
      const data = await model.getAllEmails();
      return data.length > 0 ? res.json(data) : res.status(404).json('There are no Autorized Emails');
    } catch (e) {
      return res.status(400).json(e);
    }
  }

  public async delete(req: Request, res: Response) {
    try {
      if (!isValidId(req.params.id)) return res.status(400).json('Something went wrong');
      const data = await model.deleteEmail(Number(req.params.id));
      return data === 1 ? res.status(200).json('Deleted') : res.status(400).json('Something went wrong');
    } catch (e) {
      return res.status(400).json(e);
    }
  }

  public async store(req: Request, res: Response) {
    try {
      if (!req.body.email) return res.status(400).json('There is something wrong with your data');
      const data = await model.storeEmails(req.body);
      return res.json(data);
    } catch (e) {
      return res.status(400).json(e);
    }
  }
}

export default new AutorizedEmailsController();
