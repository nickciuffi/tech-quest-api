"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var _QuestionsModel = require('../models/QuestionsModel'); var _QuestionsModel2 = _interopRequireDefault(_QuestionsModel);

var _isValidId = require('../utils/isValidId'); var _isValidId2 = _interopRequireDefault(_isValidId);

class QuestionsController {
   async get(req, res) {
    if (!_isValidId2.default.call(void 0, req.params.id)) return res.status(400).json('Id invalid');
    const data = await _QuestionsModel2.default.getQuestionsById(Number(req.params.id));
    return res.json(data.length > 0 ? data[0] : 'Questionary not found');
  }

   async getInQuestionary(req, res) {
    if (!_isValidId2.default.call(void 0, req.params.id)) return res.status(400).json('Id invalid');
    const data = await _QuestionsModel2.default.getQuestionsByQuestionaryId(Number(req.params.id));
    return res.json(data.length > 0 ? data : 'Questionary not found');
  }

   async store(req, res) {
    const { data, questionary_id } = req.body ;
    const added = await _QuestionsModel2.default.storeQuestions(questionary_id, data);
    res.json(added);
  }

   async update(req, res) {
    if (!_isValidId2.default.call(void 0, req.params.id)) return res.status(400).json('Id invalid');
    const id = Number(req.params.id);
    const data = req.body;
    const resp = await _QuestionsModel2.default.updateQuestion(id, data);
    return res.json(resp);
  }

   async delete(req, res) {
    if (!_isValidId2.default.call(void 0, req.params.id)) return res.status(400).json('Id invalid');
    const id = Number(req.params.id);
    const result = await _QuestionsModel2.default.deleteQuestion(id);
    return res.json(result === 1 ? 'Deleted' : 'Something went wrong');
  }
}

exports. default = new QuestionsController();
