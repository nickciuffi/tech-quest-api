"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _bcryptjs = require('bcryptjs');
var _database = require('../knex/config/database'); var _database2 = _interopRequireDefault(_database);


class UsersModel {
   async storeUser(data) {
    let finalMsg = 'User Added';
    await _bcryptjs.hash.call(void 0, data.password, 10, async (err, passHash) => {
      try {
        await _database2.default.call(void 0, 'Users').insert({
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

   async verifyCredentials({ email }) {
    const data = await _database2.default.call(void 0, 'Users').select('email', 'password_hash').where('email', '=', email);
    if (data.length === 0) return 'email not found';
    return data[0].password_hash;
  }
}

exports. default = new UsersModel();
