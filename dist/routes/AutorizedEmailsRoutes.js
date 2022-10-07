"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');

var _AutorizedEmailsController = require('../controllers/AutorizedEmailsController'); var _AutorizedEmailsController2 = _interopRequireDefault(_AutorizedEmailsController);

const router = _express.Router.call(void 0, );

router.get('/', _AutorizedEmailsController2.default.index);
router.get('/get', _AutorizedEmailsController2.default.get);
router.delete('/:id', _AutorizedEmailsController2.default.delete);
router.post('/', _AutorizedEmailsController2.default.store);

exports. default = router;
