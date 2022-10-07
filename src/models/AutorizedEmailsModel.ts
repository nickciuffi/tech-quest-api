import db from '../knex/config/database';

type emailProps = {
  email: string
}

class AutorizedEmailsModel {
  public async getAllEmails() {
    try {
      const data = await db('Autorized_emails').select('*');
      return data;
    } catch (e) {
      return 'Something went wrong';
    }
  }

  public async getEmailByTxt(email: string) {
    try {
      const data = await db('Autorized_emails').select('*').where('email', '=', email);
      return data;
    } catch (e) {
      return 'Something went wrong';
    }
  }

  public async storeEmails(data: emailProps) {
    try {
      const addedData = await db('Autorized_emails').insert({ email: data.email });
      return addedData;
    } catch (e) {
      return 'Something went wrong';
    }
  }

  public async deleteEmail(id: number) {
    try {
      const data = await db('Autorized_emails').where('id', '=', id).del();
      return data;
    } catch (e) {
      return 'Something went wrong';
    }
  }
}

export default new AutorizedEmailsModel();
