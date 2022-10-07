"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _database = require('../knex/config/database'); var _database2 = _interopRequireDefault(_database);

var _isValidId = require('../utils/isValidId'); var _isValidId2 = _interopRequireDefault(_isValidId);
var _QuestionariesModel = require('./QuestionariesModel'); var _QuestionariesModel2 = _interopRequireDefault(_QuestionariesModel);

class QuestionsModel {
   async getQuestionsById(id) {
    const data = await _database2.default.call(void 0, 'Questions').select(
      'text',
      'questionary_id',
      'id',
    ).where('id', '=', id);
    return data;
  }

   async getQuestionsByQuestionaryId(id) {
    // const data = await db.select('id', 'text').from('Questions').where('questionary_id', '=', id);
    const data = await _database2.default.call(void 0, 'Questions').select(
      'Questions.text',
      'Questions.questionary_id',
      'Questions.id',
    ).where('Questions.questionary_id', '=', id);
    return data;
  }

   async storeQuestions(questionary_id, data) {
    if (data.length === 0) return 'You have to send data';
    if (!questionary_id) return 'You have to choose a questionary';
    if (!_isValidId2.default.call(void 0, questionary_id)) return 'id invalid';

    const exists = await _QuestionariesModel2.default.getQuestionaryById(questionary_id);
    if (!exists[0]) return 'This Questionary doesn`t exist';

    try {
      const addedQuestions = data.forEach(async (quest) => _database2.default.call(void 0, 'Questions').insert({ text: quest.text, questionary_id }));
      return addedQuestions;
    } catch (e) {
      return e.message;
    }
  }

   async updateQuestion(id, data) {
    if (!id) return 'Question not found';
    if (!data.text) return 'There is nothing to change here';
    if (!_isValidId2.default.call(void 0, id)) return 'id invalid';

    const resp = await _database2.default.call(void 0, 'Questions').where('id', '=', id).update(data);
    return resp;
  }

   async deleteQuestion(id) {
    if (!id) return 'Question not found';
    if (!_isValidId2.default.call(void 0, id)) return 'id invalid';

    const result = await _database2.default.call(void 0, 'Questions').where('id', '=', id).del();
    return result;
  }
}

exports. default = new QuestionsModel();
