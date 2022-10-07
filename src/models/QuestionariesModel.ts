import db from '../knex/config/database';
import { AnswerToStore, QuestionToStore } from '../types/QuestionaryProps';

class QuestionariesModel {
  public async getAllQuestionaries() {
    try {
      const data = await db('Questionaries');
      return data;
    } catch (e) {
      return 'There is somethig wrong with your connection.';
    }
  }

  public async getQuestionaryById(id: number) {
    const data = await db('Questionaries as q1').select(
      'q1.id as q1_id',
      'q1.title as q1_title',
      'q1.description as q1_desc',
      'q2.id as q2_id',
      'q2.text as question',
      'ans.id as ans_id',
      'ans.text as answer',
      'ans.is_correct',
    )
      .innerJoin('Questions as q2', 'q1.id', 'q2.questionary_id')
      .innerJoin('Answers as ans', 'q2.id', 'ans.question_id')
      .where('q1.id', '=', id);
    return data;
  }

  public async storeAnswers(data: AnswerToStore[]): Promise<number[]> {
    const ansId = await db('Answers').insert(data.map((ans) => ({
      text: ans.text,
      is_correct: ans.isCorrect,
      question_id: ans.questionId,
    })));
    console.log(ansId);
    return ansId;
  }

  public async storeQ1(title: string, desc:string): Promise<number[]> {
    const q1Id = await db('Questionaries').insert({
      title,
      description: desc,
    });
    return q1Id;
  }

  public async storeQ2(data: QuestionToStore[]): Promise<number[]> {
    const q2Id = await db('Questions').insert(data.map((quest) => ({
      text: quest.text,
      questionary_id: quest.q1Id,
    })));
    return q2Id;
  }

  public async delete(id: number) {
    if (!id) return 'Questionary not found';
    const del = await db('Questionaries').where('id', '=', id).del();
    return del === 1 ? `Questionary ${id} was excluded` : 'Something went wrong';
  }

  public async update(id: number, data: {title: string, desc: string}) {
    if (!id) return 'You have to send an id';
    if (!data.desc && !data.title) return 'There is nothing to change here';
    const result = await db('Questionaries').where('id', '=', id).update(data);
    return result;
  }
}

export default new QuestionariesModel();
