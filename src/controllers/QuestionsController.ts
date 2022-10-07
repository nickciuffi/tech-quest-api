import { Request, Response } from 'express';
import model from '../models/QuestionsModel';
import { QuestionsAddProps } from '../types/QuestionProps';
import isValidId from '../utils/isValidId';

class QuestionsController {
  public async get(req: Request, res: Response) {
    if (!isValidId(req.params.id)) return res.json('id invalid');
    const data = await model.getQuestionsById(Number(req.params.id));
    return res.json(data.length > 0 ? data[0] : 'Questionary not found');
  }

  public async getInQuestionary(req: Request, res: Response) {
    if (!isValidId(req.params.id)) return res.json('id invalid');
    const data = await model.getQuestionsByQuestionaryId(Number(req.params.id));
    return res.json(data.length > 0 ? data : 'Questionary not found');
  }

  public async store(req: Request, res: Response) {
    const { data, questionary_id } = req.body as QuestionsAddProps;
    const added = await model.storeQuestions(questionary_id, data);
    res.json(added);
  }

  public async update(req: Request, res: Response) {
    if (!isValidId(req.params.id)) return res.json('id invalid');
    const id = Number(req.params.id);
    const data = req.body;
    const resp = await model.updateQuestion(id, data);
    return res.json(resp);
  }

  public async delete(req: Request, res: Response) {
    if (!isValidId(req.params.id)) return res.json('id invalid');
    const id = Number(req.params.id);
    const result = await model.deleteQuestion(id);
    return res.json(result === 1 ? 'Deleted' : 'Something went wrong');
  }
}

export default new QuestionsController();
