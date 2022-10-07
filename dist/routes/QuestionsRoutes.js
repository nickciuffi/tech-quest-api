"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');
var _QuestionsController = require('../controllers/QuestionsController'); var _QuestionsController2 = _interopRequireDefault(_QuestionsController);

const router = _express.Router.call(void 0, );

router.get('/questionary/:id', _QuestionsController2.default.getInQuestionary);
router.get('/:id', _QuestionsController2.default.get);
router.post('/', _QuestionsController2.default.store);
router.put('/:id', _QuestionsController2.default.update);
router.delete('/:id', _QuestionsController2.default.delete);

exports. default = router;
