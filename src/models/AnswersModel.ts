import db from '../knex/config/database';
import { AnswerProps, GetAnswersProps } from '../types/AnswerProps';
import isValidId from '../utils/isValidId';

class AnswersModel {
  public async getAnswersById(id: number): Promise<AnswerProps[]> {
    const data = await db('Answers').select(
      'text',
      'is_correct',
      'id',
      'question_id',
    ).where('id', '=', id) as AnswerProps[];
    return data;
  }

  public async getAnswersByQuestionId(id: number): Promise<GetAnswersProps[]> {
    const data = await db('Answers').select(
      'Answers.text',
      'Answers.is_correct',
      'Answers.question_id',
      'Answers.id',
    ).where('Answers.question_id', '=', id);
    return data;
  }

  async canBeAddedInQuestion(qId: number, isCorrect: boolean): Promise<boolean> {
    const AnswersInQuestion = await this.getAnswersByQuestionId(qId);
    if (AnswersInQuestion.length >= 4) return false;
    let canAddTrue = true;
    let canAddFalse = true;
    AnswersInQuestion.forEach((ans) => {
      if (ans.is_correct) {
        canAddTrue = false;
      }
    });
    if (AnswersInQuestion.length >= 3 && canAddTrue) {
      canAddFalse = false;
    }
    if (isCorrect && !canAddTrue) return false;
    if (!isCorrect && !canAddFalse) return false;

    return true;
  }

  public async storeAnswers(question_id: number, text: string, is_correct: boolean) {
    if (!text) return 'You have to send the answer';
    if (!question_id) return 'You have to choose a question';
    if (!isValidId(question_id)) return 'id invalid';
    const canBeAded = await this.canBeAddedInQuestion(question_id, is_correct);
    if (!canBeAded) return `You can not add a ${is_correct ? 'correct' : 'incorrect'} answer`;

    try {
      const addedAnswers = await db('Answers').insert({ text, question_id, is_correct });
      return addedAnswers;
    } catch (e) {
      return e.message;
    }
  }

  public async updateAnswer(id: number, data: AnswerProps) {
    if (!id) return 'Answer not found';
    if (!data.text) return 'There is nothing to change here';
    const resp = await db('Answers').where('id', '=', id).update(data);
    return resp;
  }

  public async deleteAnswer(id: number) {
    if (!id) return 'Answer not found';
    const result = await db('Answers').where('id', '=', id).del();
    return result;
  }
}

export default new AnswersModel();
