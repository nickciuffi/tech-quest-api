import { Request, Response } from 'express';
import model from '../models/AnswersModel';
import { AnswersAddProps } from '../types/AnswerProps';
import isValidId from '../utils/isValidId';

class AnswersController {
  public async get(req: Request, res: Response) {
    if (!isValidId(req.params.id)) return res.json('id invalid');
    const data = await model.getAnswersById(Number(req.params.id));

    return res.json(data.length > 0 ? data[0] : 'Answer not found');
  }

  public async getInQuestion(req: Request, res: Response) {
    if (!isValidId(req.params.id)) return res.json('id invalid');
    const data = await model.getAnswersByQuestionId(Number(req.params.id));
    return res.json(data.length > 0 ? data : 'There are no Answers in this question');
  }

  public async store(req: Request, res: Response) {
    const { data, question_id } = req.body as AnswersAddProps;
    const added = await model.storeAnswers(question_id, data);
    res.json(added);
  }

  public async update(req: Request, res: Response) {
    if (!isValidId(req.params.id)) return res.json('id invalid');
    const id = Number(req.params.id);
    const data = req.body;
    const resp = await model.updateAnswer(id, data);
    return res.json(resp);
  }

  public async delete(req: Request, res: Response) {
    if (!isValidId(req.params.id)) return res.json('id invalid');
    const id = Number(req.params.id);
    const result = await model.deleteAnswer(id);
    return res.json(result === 1 ? 'Deleted' : 'Something went wrong');
  }
}

export default new AnswersController();
