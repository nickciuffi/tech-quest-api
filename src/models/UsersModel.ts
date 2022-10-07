import { hash } from 'bcryptjs';
import db from '../knex/config/database';
import { userData } from '../types/UserProps';

class UsersModel {
  public async storeUser(data: userData) {
    let finalMsg = 'User Added';
    await hash(data.password, 10, async (err, passHash) => {
      try {
        await db('Users').insert({
          email: data.email,
          name: data.name,
          password_hash: passHash,
        });
      } catch (e) {
        finalMsg = 'Something went wrong';
      }
    });
    return finalMsg;
  }

  public async verifyCredentials({ email }: userData) {
    const data = await db('Users').select('email', 'password_hash').where('email', '=', email);
    if (data.length === 0) return 'email not found';
    return data[0].password_hash;
  }
}

export default new UsersModel();
