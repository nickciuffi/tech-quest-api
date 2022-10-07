"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _database = require('../knex/config/database'); var _database2 = _interopRequireDefault(_database);





class AutorizedEmailsModel {
   async getAllEmails() {
    try {
      const data = await _database2.default.call(void 0, 'Autorized_emails').select('*');
      return data;
    } catch (e) {
      return 'Something went wrong';
    }
  }

   async getEmailByTxt(email) {
    try {
      const data = await _database2.default.call(void 0, 'Autorized_emails').select('*').where('email', '=', email);
      return data;
    } catch (e) {
      return 'Something went wrong';
    }
  }

   async storeEmails(data) {
    try {
      const addedData = await _database2.default.call(void 0, 'Autorized_emails').insert({ email: data.email });
      return addedData;
    } catch (e) {
      return 'Something went wrong';
    }
  }

   async deleteEmail(id) {
    try {
      const data = await _database2.default.call(void 0, 'Autorized_emails').where('id', '=', id).del();
      return data;
    } catch (e) {
      return 'Something went wrong';
    }
  }
}

exports. default = new AutorizedEmailsModel();
