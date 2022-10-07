"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _isemail = require('validator/lib/isemail'); var _isemail2 = _interopRequireDefault(_isemail);

var _AutorizedEmailsModel = require('../models/AutorizedEmailsModel'); var _AutorizedEmailsModel2 = _interopRequireDefault(_AutorizedEmailsModel);






class UserValidation {
   hasAllData(data) {
    let isValidated = true;
    if (!data.email || !data.name || !data.password) isValidated = false;
    return isValidated;
  }

   correctPasswordCharacters(data) {
    let isValidated = true;
    if (data.password.length < 7 || data.password.length > 25) isValidated = false;
    return isValidated;
  }

   hasOnlyTheCorrectFields(data) {
    let isValidated = true;
    if (Object.entries(data).length > 3) isValidated = false;
    return isValidated;
  }

   async isEmailAutorized(data) {
    const finalData = await _AutorizedEmailsModel2.default.getEmailByTxt(data.email);
    return finalData.length > 0;
  }

  async validateUser(data) {
    const msg = 'Everithing all right';
    const validated = true;
    if (!this.hasAllData(data)) {
      return {
        validated: false,
        msg: 'You didn`t send enought data',
      };
    }
    if (!_isemail2.default.call(void 0, data.email)) {
      return {
        validated: false,
        msg: 'Invalid Email',
      };
    }
    if (!this.correctPasswordCharacters(data)) {
      return {
        validated: false,
        msg: 'he password must have from 7 to 25 characters',
      };
    }
    if (!this.hasOnlyTheCorrectFields(data)) {
      return {
        validated: false,
        msg: 'You should only send: Email, name and password',
      };
    }
    if (!(await this.isEmailAutorized(data))) {
      return {
        validated: false,
        msg: 'This email is no authorized',
      };
    }
    return {
      validated,
      msg,
    };
  }
}

exports. default = new UserValidation();
