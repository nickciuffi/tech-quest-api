import db from '../knex/config/database';
import { AnswerProps } from '../types/AnswerProps';
import isValidId from '../utils/isValidId';

class AnswersModel {
  public async getAnswersById(id: number) {
    const data = await db('Answers').select(
      'text',
      'question_id',
      'id',
    ).where('id', '=', id);
    return data;
  }

  public async getAnswersByQuestionId(id: number) {
    const data = await db('Answers').select(
      'Answers.text',
      'Answers.question_id',
      'Answers.id',
    ).where('Answers.question_id', '=', id);
    return data;
  }

  public async storeAnswers(question_id: number, text: string, is_correct: boolean) {
    if (!text) return 'You have to send the answer';
    if (!question_id) return 'You have to choose a question';
    if (!isValidId(question_id)) return 'id invalid';

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
