import { Request, Response } from 'express';
import model from '../models/AnswersModel';
import { AnswersAddProps } from '../types/AnswerProps';
import isValidId from '../utils/isValidId';

class AnswersController {
  public async get(req: Request, res: Response) {
    if (!isValidId(req.params.id)) return res.status(400).json('Id invalid');
    try {
      const data = await model.getAnswersById(Number(req.params.id));

      return data.length > 0 ? res.status(200).json(data[0]) : res.status(400).json('Answer not found');
    } catch (e) {
      return res.status(400).json(e);
    }
  }

  public async getInQuestion(req: Request, res: Response) {
    if (!isValidId(req.params.id)) return res.status(400).json('Id invalid');
    try {
      const data = await model.getAnswersByQuestionId(Number(req.params.id));
      return data.length > 0 ? res.json(data) : res.status(404).json('There are no Answers in this question');
    } catch (e) {
      return res.status(400).json(e);
    }
  }

  public async store(req: Request, res: Response) {
    try {
      const { text, is_correct, question_id } = req.body as AnswersAddProps;
      const added = await model.storeAnswers(question_id, text, is_correct);
      return res.status(200).json(added);
    } catch (e) {
      return res.status(400).json(e);
    }
  }

  public async update(req: Request, res: Response) {
    if (!isValidId(req.params.id)) return res.status(400).json('Id invalid');
    try {
      const id = Number(req.params.id);
      const data = req.body;
      const resp = await model.updateAnswer(id, data);
      return res.json(resp);
    } catch (e) {
      return res.status(400).json(e);
    }
  }

  public async delete(req: Request, res: Response) {
    if (!isValidId(req.params.id)) return res.status(400).json('Id invalid');
    try {
      const id = Number(req.params.id);
      const result = await model.deleteAnswer(id);
      return result === 1 ? res.status(200).json('Deleted') : res.status(400).json('Something went wrong');
    } catch (e) {
      return res.status(400).json(e);
    }
  }
}

export default new AnswersController();
