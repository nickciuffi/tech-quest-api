"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _database = require('../knex/config/database'); var _database2 = _interopRequireDefault(_database);

var _isValidId = require('../utils/isValidId'); var _isValidId2 = _interopRequireDefault(_isValidId);

class AnswersModel {
   async getAnswersById(id) {
    const data = await _database2.default.call(void 0, 'Answers').select(
      'text',
      'question_id',
      'id',
    ).where('id', '=', id);
    return data;
  }

   async getAnswersByQuestionId(id) {
    const data = await _database2.default.call(void 0, 'Answers').select(
      'Answers.text',
      'Answers.question_id',
      'Answers.id',
    ).where('Answers.question_id', '=', id);
    return data;
  }

   async storeAnswers(question_id, data) {
    if (data.length === 0) return 'You have to send data';
    if (!question_id) return 'You have to choose a Answerary';
    if (!_isValidId2.default.call(void 0, question_id)) return 'id invalid';

    try {
      const addedAnswers = data.forEach(async (quest) => _database2.default.call(void 0, 'Answers').insert({ text: quest.text, question_id }));
      return addedAnswers;
    } catch (e) {
      return e.message;
    }
  }

   async updateAnswer(id, data) {
    if (!id) return 'Answer not found';
    if (!data.text) return 'There is nothing to change here';
    const resp = await _database2.default.call(void 0, 'Answers').where('id', '=', id).update(data);
    return resp;
  }

   async deleteAnswer(id) {
    if (!id) return 'Answer not found';
    const result = await _database2.default.call(void 0, 'Answers').where('id', '=', id).del();
    return result;
  }
}

exports. default = new AnswersModel();
