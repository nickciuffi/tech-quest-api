import { Request, Response } from 'express';
import model from '../models/QuestionsModel';
import { QuestionsAddProps } from '../types/QuestionProps';
import isValidId from '../utils/isValidId';
import organizeQuestsWithAns from '../utils/organizeQuestsWithAns';

class QuestionsController {
  public async get(req: Request, res: Response) {
    if (!isValidId(req.params.id)) return res.status(400).json('Id invalid');
    const data = await model.getQuestionsById(Number(req.params.id));
    return data.length > 0 ? res.status(200).json(data[0]) : res.status(400).json('Question not found');
  }

  public async getInQuestionary(req: Request, res: Response) {
    if (!isValidId(req.params.id)) return res.status(400).json('Id invalid');
    const data = await model.getQuestionsByQuestionaryId(Number(req.params.id));
    return data.length > 0 ? res.status(200).json(data) : res.status(400).json('There are no questions in this questionary');
  }

  public async getInQuestionaryWithAnswers(req: Request, res: Response) {
    if (!isValidId(req.params.id)) return res.status(400).json('Id invalid');
    const data = await model.getQuestionsWithAnswersByQuestionaryId(Number(req.params.id));
    const organizedData = organizeQuestsWithAns(data);
    return organizedData.length > 0 ? res.status(200).json(organizedData) : res.status(400).json('There are no questions in this questionary');
  }

  public async store(req: Request, res: Response) {
    const { text, questionary_id } = req.body as QuestionsAddProps;
    try {
      const added = await model.storeQuestions(questionary_id, text);
      return res.status(200).json(added);
    } catch (e) {
      return res.status(400).json(e);
    }
  }

  public async update(req: Request, res: Response) {
    if (!isValidId(req.params.id)) return res.status(400).json('Id invalid');
    const id = Number(req.params.id);
    const data = req.body;
    try {
      const resp = await model.updateQuestion(id, data);
      return res.status(200).json(resp);
    } catch (e) {
      return res.status(400).json(e);
    }
  }

  public async delete(req: Request, res: Response) {
    if (!isValidId(req.params.id)) return res.status(400).json('Id invalid');
    const id = Number(req.params.id);
    try {
      const result = await model.deleteQuestion(id);
      return result === 1 ? res.status(200).json('Deleted') : res.status(400).json('Something went wrong');
    } catch (e) {
      return res.status(400).json(e);
    }
  }
}

export default new QuestionsController();
