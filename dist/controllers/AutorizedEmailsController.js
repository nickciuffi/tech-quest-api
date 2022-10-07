"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var _AutorizedEmailsModel = require('../models/AutorizedEmailsModel'); var _AutorizedEmailsModel2 = _interopRequireDefault(_AutorizedEmailsModel);
var _isValidId = require('../utils/isValidId'); var _isValidId2 = _interopRequireDefault(_isValidId);

class AutorizedEmailsController {
   async get(req, res) {
    if (!req.body.email) return res.json('Something went wrong');
    const data = await _AutorizedEmailsModel2.default.getEmailByTxt(req.body.email);
    return res.json(data.length > 0 ? data[0] : 'Email not found');
  }

   async index(req, res) {
    const data = await _AutorizedEmailsModel2.default.getAllEmails();
    return res.json(data.length > 0 ? data : 'There are no Autorized Emails');
  }

   async delete(req, res) {
    if (!_isValidId2.default.call(void 0, req.params.id)) return res.json('Something went wrong');
    const data = await _AutorizedEmailsModel2.default.deleteEmail(Number(req.params.id));
    return res.json(data === 1 ? 'Deleted' : 'Something went wrong');
  }

   async store(req, res) {
    if (!req.body.email) return res.json('There is something wrong with your data');
    const data = await _AutorizedEmailsModel2.default.storeEmails(req.body);
    return res.json(data);
  }
}

exports. default = new AutorizedEmailsController();
