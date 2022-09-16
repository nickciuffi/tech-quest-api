"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var _database = require('../knex/config/database'); var _database2 = _interopRequireDefault(_database);

class HomeController {
  async index(req, res) {
    const resp = await _database2.default.call(void 0, 'Questionaries');
    res.json(resp);
  }
}

exports. default = new HomeController();
