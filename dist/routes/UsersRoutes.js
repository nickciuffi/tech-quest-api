"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');

var _UsersController = require('../controllers/UsersController'); var _UsersController2 = _interopRequireDefault(_UsersController);

const router = _express.Router.call(void 0, );

router.get('/', _UsersController2.default.get);
router.get('/login', _UsersController2.default.login);
router.post('/', _UsersController2.default.store);

exports. default = router;
