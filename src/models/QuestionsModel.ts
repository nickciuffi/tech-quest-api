import db from '../knex/config/database';
import { QuestionProps } from '../types/QuestionProps';
import isValidId from '../utils/isValidId';
import questionaryModel from './QuestionariesModel';

class QuestionsModel {
  public async getQuestionsById(id: number) {
    const data = await db('Questions').select(
      'text',
      'questionary_id',
      'id',
    ).where('id', '=', id);
    return data;
  }

  public async getQuestionsByQuestionaryId(id: number) {
    // const data = await db.select('id', 'text').from('Questions').where('questionary_id', '=', id);
    const data = await db('Questions').select(
      'Questions.text',
      'Questions.questionary_id',
      'Questions.id',
    ).where('Questions.questionary_id', '=', id);
    return data;
  }

  public async storeQuestions(questionary_id: number, data: QuestionProps[]) {
    if (data.length === 0) return 'You have to send data';
    if (!questionary_id) return 'You have to choose a questionary';
    if (!isValidId(questionary_id)) return 'id invalid';

    const exists = await questionaryModel.getQuestionaryById(questionary_id);
    if (!exists[0]) return 'This Questionary doesn`t exist';

    try {
      const addedQuestions = data.forEach(async (quest) => db('Questions').insert({ text: quest.text, questionary_id }));
      return addedQuestions;
    } catch (e) {
      return e.message;
    }
  }

  public async updateQuestion(id: number, data: QuestionProps) {
    if (!id) return 'Question not found';
    if (!data.text) return 'There is nothing to change here';
    if (!isValidId(id)) return 'id invalid';

    const resp = await db('Questions').where('id', '=', id).update(data);
    return resp;
  }

  public async deleteQuestion(id: number) {
    if (!id) return 'Question not found';
    if (!isValidId(id)) return 'id invalid';

    const result = await db('Questions').where('id', '=', id).del();
    return result;
  }
}

export default new QuestionsModel();