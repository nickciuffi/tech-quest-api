import { Request, Response } from 'express';
import model from '../models/QuestionariesModel';
import {
  InitialData, QuestionaryData,
} from '../types/QuestionaryProps';

class QuestionariesController {
  public async index(req: Request, res: Response) {
    const data = await model.getAllQuestionaries();
    res.json(data);
  }

  public async get(req: Request, res: Response) {
    const data: InitialData[] = await model.getQuestionaryById(Number(req.params.id)) as InitialData[];
    if (data.length === 0) return res.json('There is no info for this Questionary');
    return res.json(data);
  }

  public async store(req: Request, res: Response) {
    const data = req.body as QuestionaryData;
    const qId = await model.storeQuestionaries(data.title, data.desc);

    return res.json(qId);
  }

  public async delete(req:Request, res: Response) {
    const data = await model.delete(Number(req.params.id));
    return res.json(data);
  }

  public async update(req: Request, res: Response) {
    const id = Number(req.params.id);
    const data = req.body;
    const result = await model.update(id, data);
    res.json(result);
  }
}

export default new QuestionariesController();
