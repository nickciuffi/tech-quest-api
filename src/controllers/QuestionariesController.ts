import { Request, Response } from 'express';
import model from '../models/QuestionariesModel';
import {
  Answers, AnswerToStore, InitialData, QuestionaryData, Questions, QuestionsWithAns,
} from '../types/QuestionaryProps';

function getQuestionsFromInitialData(data: InitialData[]) {
  const questions: Questions[] = [];
  data.forEach((dado) => {
    if (questions.length === 0) {
      questions.push({
        id: dado.q2_id,
        text: dado.question,
      });
    }
    const exists = questions.some((question) => question.id === dado.q2_id);
    if (exists) return;
    questions.push({
      id: dado.q2_id,
      text: dado.question,
    });
  });
  return questions;
}

function getAnswersForQuestion(questId: number, data: InitialData[]): Answers[] {
  const answers: Answers[] = [];
  data.forEach((dado) => {
    if (dado.q2_id === questId) {
      answers.push({
        id: dado.ans_id,
        text: dado.answer,
        isCorrect: dado.is_correct !== 0,
      });
    }
  });
  return answers;
}

function formatData(data: InitialData[]): QuestionaryData {
  const questions = getQuestionsFromInitialData(data);
  const questsWithAns = questions.map((quest):QuestionsWithAns => {
    const answers = getAnswersForQuestion(quest.id as number, data);
    return {
      id: quest.id,
      text: quest.text,
      answers,
    };
  });

  return {
    id: data[0].q1_id,
    title: data[0].q1_title,
    desc: data[0].q1_desc,
    questions: questsWithAns,
  };
}

async function getFirstQuestionId(quests: Questions[], q1Id: number): Promise<number> {
  const q2Data = quests.map((quest) => ({
    text: quest.text,
    q1Id,
  }));
  const q2Id = await model.storeQ2(q2Data);
  return q2Id[0];
}

class QuestionariesController {
  public async index(req: Request, res: Response) {
    const data = await model.getAllQuestionaries();
    res.json(data);
  }

  public async get(req: Request, res: Response) {
    const initialData: InitialData[] = await model.getQuestionaryById(Number(req.params.id)) as InitialData[];
    if (initialData.length === 0) return res.json('There is no info for this Questionary');
    const questionaryData: QuestionaryData = formatData(initialData);
    return res.json(questionaryData);
  }

  public async store(req: Request, res: Response) {
    const data = req.body as QuestionaryData;
    const q1Id = await model.storeQ1(data.title, data.desc);
    console.log(data.questions);
    const firstQ2Id = await getFirstQuestionId(data.questions, q1Id[0]);
    const ans: AnswerToStore[][] = data.questions.map((quest, index): AnswerToStore[] => quest.answers.map((answer): AnswerToStore => ({
      text: answer.text,
      isCorrect: answer.isCorrect,
      questionId: firstQ2Id + index,

    })));

    ans.forEach(async (an) => {
      await model.storeAnswers(an);
    });

    return res.json(data);
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
