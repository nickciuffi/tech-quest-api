import { Request, Response } from 'express';
import model from '../models/QuestionariesModel';
import {
  InitialData, QuestionaryData,
} from '../types/QuestionaryProps';

class QuestionariesController {
  public async index(req: Request, res: Response) {
    try {
      const data = await model.getAllQuestionaries();
      return res.status(200).json(data);
    } catch (e) {
      return res.status(400).json(e);
    }
  }

  public async get(req: Request, res: Response) {
    try {
      const data: InitialData[] = await model.getQuestionaryById(Number(req.params.id)) as InitialData[];
      if (data.length === 0) return res.status(404).json('There is no info for this Questionary');
      return res.status(200).json(data);
    } catch (e) {
      return res.status(400).json(e);
    }
  }

  public async store(req: Request, res: Response) {
    try {
      const data = req.body as QuestionaryData;
      const qId = await model.storeQuestionaries(data.title, data.desc);

      return res.status(201).json(qId);
    } catch (e) {
      return res.status(400).json(e);
    }
  }

  public async delete(req:Request, res: Response) {
    try {
      const data = await model.delete(Number(req.params.id));
      return res.json(data);
    } catch (e) {
      return res.status(400).json(e);
    }
  }

  public async update(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const data = req.body;
      const result = await model.update(id, data);
      return res.json(result);
    } catch (e) {
      return res.status(400).json(e);
    }
  }
}

export default new QuestionariesController();
