import db from '../knex/config/database';

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
    const data = await db('Questionaries').select(
      'id',
      'title',
      'description',
    )
      .where('id', '=', id);
    return data;
  }

  public async storeQuestionaries(title: string, desc:string): Promise<number[]> {
    const qId = await db('Questionaries').insert({
      title,
      description: desc,
    });
    return qId;
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
