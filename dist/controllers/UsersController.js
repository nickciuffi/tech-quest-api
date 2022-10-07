"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _bcrypt = require('bcrypt');

var _UsersModel = require('../models/UsersModel'); var _UsersModel2 = _interopRequireDefault(_UsersModel);

var _userValidation = require('../utils/userValidation'); var _userValidation2 = _interopRequireDefault(_userValidation);

class Userscontroller {
   async get(req, res) {
    return res.json(0);
  }

   async store(req, res) {
    const data = req.body ;
    const validResult = await _userValidation2.default.validateUser(data);
    if (!validResult.validated) return res.json(validResult.msg);
    const result = await _UsersModel2.default.storeUser(data);

    return res.json(result);
  }

   async login(req, res) {
    const data = req.body;
    if (!data.email || !data.password) return res.json('not enought data');
    const passHash = await _UsersModel2.default.verifyCredentials(data);
    _bcrypt.compare.call(void 0, data.password, passHash, (err, result) => res.json(result));
    return 0;
  }
}

exports. default = new Userscontroller();
