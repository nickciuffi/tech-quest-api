"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');
var _AnswersController = require('../controllers/AnswersController'); var _AnswersController2 = _interopRequireDefault(_AnswersController);

const router = _express.Router.call(void 0, );

router.get('/question/:id', _AnswersController2.default.getInQuestion);
router.get('/:id', _AnswersController2.default.get);
router.post('/', _AnswersController2.default.store);
router.put('/:id', _AnswersController2.default.update);
router.delete('/:id', _AnswersController2.default.delete);

exports. default = router;
