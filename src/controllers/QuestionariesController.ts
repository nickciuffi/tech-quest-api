import { Request, Response } from 'express';
import model from '../models/QuestionariesModel';
import {
  InitialData, QuestionaryData,
} from '../types/QuestionaryProps';
import questionsModel from '../models/QuestionsModel';

class QuestionariesController {
  public async index(req: Request, res: Response) {
    try {
      const data = await model.getAllQuestionaries();
      if (typeof data === 'string') return res.status(400).json(data);
      // const finalData: QuestWithIsCompleteProps[] = [];
      const finalData = data.map(async (quest) => {
        const questData = await questionsModel.getQuestionsByQuestionaryId(quest.id);
        return {
          id: quest.id,
          title: quest.title,
          description: quest.description,
          isComplete: questData.length === 4,
        };
      });
      return res.status(200).json(await Promise.all(finalData));
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
