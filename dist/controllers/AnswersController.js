"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var _AnswersModel = require('../models/AnswersModel'); var _AnswersModel2 = _interopRequireDefault(_AnswersModel);

var _isValidId = require('../utils/isValidId'); var _isValidId2 = _interopRequireDefault(_isValidId);

class AnswersController {
   async get(req, res) {
    if (!_isValidId2.default.call(void 0, req.params.id)) return res.status(400).json('Id invalid');
    const data = await _AnswersModel2.default.getAnswersById(Number(req.params.id));

    return res.json(data.length > 0 ? data[0] : 'Questionary not found');
  }

   async getInQuestion(req, res) {
    if (!_isValidId2.default.call(void 0, req.params.id)) return res.status(400).json('Id invalid');
    const data = await _AnswersModel2.default.getAnswersByQuestionId(Number(req.params.id));
    return res.json(data.length > 0 ? data : 'Question not found');
  }

   async store(req, res) {
    const { data, question_id } = req.body ;
    const added = await _AnswersModel2.default.storeAnswers(question_id, data);
    res.json(added);
  }

   async update(req, res) {
    if (!_isValidId2.default.call(void 0, req.params.id)) return res.status(400).json('Id invalid');
    const id = Number(req.params.id);
    const data = req.body;
    const resp = await _AnswersModel2.default.updateAnswer(id, data);
    return res.json(resp);
  }

   async delete(req, res) {
    if (!_isValidId2.default.call(void 0, req.params.id)) return res.status(400).json('Id invalid');
    const id = Number(req.params.id);
    const result = await _AnswersModel2.default.deleteAnswer(id);
    return res.json(result === 1 ? 'Deleted' : 'Something went wrong');
  }
}

exports. default = new AnswersController();
