"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');
var _QuestionariesController = require('../controllers/QuestionariesController'); var _QuestionariesController2 = _interopRequireDefault(_QuestionariesController);

const router = _express.Router.call(void 0, );

router.get('/', _QuestionariesController2.default.index);
router.get('/:id', _QuestionariesController2.default.get);
router.post('/', _QuestionariesController2.default.store);
router.delete('/:id', _QuestionariesController2.default.delete);
router.put('/:id', _QuestionariesController2.default.update);

exports. default = router;
