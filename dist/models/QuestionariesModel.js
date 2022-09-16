"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _database = require('../knex/config/database'); var _database2 = _interopRequireDefault(_database);


class QuestionariesModel {
   async getAllQuestionaries() {
    try {
      const data = await _database2.default.call(void 0, 'Questionaries');
      return data;
    } catch (e) {
      return 'There is somethig wrong with your connection.';
    }
  }

   async getQuestionaryById(id) {
    const data = await _database2.default.call(void 0, 'Questionaries as q1').select(
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

   async storeAnswers(data) {
    const ansId = await _database2.default.call(void 0, 'Answers').insert(data.map((ans) => ({
      text: ans.text,
      is_correct: ans.isCorrect,
      question_id: ans.questionId,
    })));
    console.log(ansId);
    return ansId;
  }

   async storeQ1(title, desc) {
    const q1Id = await _database2.default.call(void 0, 'Questionaries').insert({
      title,
      description: desc,
    });
    return q1Id;
  }

   async storeQ2(data) {
    const q2Id = await _database2.default.call(void 0, 'Questions').insert(data.map((quest) => ({
      text: quest.text,
      questionary_id: quest.q1Id,
    })));
    return q2Id;
  }
}

exports. default = new QuestionariesModel();
