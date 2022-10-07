"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _dotenv = require('dotenv'); var _dotenv2 = _interopRequireDefault(_dotenv);

_dotenv2.default.config();
var _helmet = require('helmet'); var _helmet2 = _interopRequireDefault(_helmet);

var _express = require('express'); var _express2 = _interopRequireDefault(_express);
var _HomeRoutes = require('./routes/HomeRoutes'); var _HomeRoutes2 = _interopRequireDefault(_HomeRoutes);
var _QuestionariesRoutes = require('./routes/QuestionariesRoutes'); var _QuestionariesRoutes2 = _interopRequireDefault(_QuestionariesRoutes);
var _QuestionsRoutes = require('./routes/QuestionsRoutes'); var _QuestionsRoutes2 = _interopRequireDefault(_QuestionsRoutes);
var _AnswersRoutes = require('./routes/AnswersRoutes'); var _AnswersRoutes2 = _interopRequireDefault(_AnswersRoutes);
var _AutorizedEmailsRoutes = require('./routes/AutorizedEmailsRoutes'); var _AutorizedEmailsRoutes2 = _interopRequireDefault(_AutorizedEmailsRoutes);
var _UsersRoutes = require('./routes/UsersRoutes'); var _UsersRoutes2 = _interopRequireDefault(_UsersRoutes);

/* const whiteList = [
  'http://localhost:3000',
];

const corsOptions = {
  origin(origin, callback) {
    if (whiteList.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowd by CORS'));
    }
  },
};
*/

class App {
  

   constructor() {
    this.app = _express2.default.call(void 0, );
    this.middlewares();
    this.routes();
  }

   middlewares() {
    // this.app.use(cors(corsOptions));
    this.app.use(_helmet2.default.call(void 0, ));
    this.app.use(_express2.default.urlencoded({ extended: true }));
    this.app.use(_express2.default.json());
  }

   routes() {
    this.app.use('/', _HomeRoutes2.default);
    this.app.use('/questionaries/', _QuestionariesRoutes2.default);
    this.app.use('/questions/', _QuestionsRoutes2.default);
    this.app.use('/answers/', _AnswersRoutes2.default);
    this.app.use('/autorized-emails/', _AutorizedEmailsRoutes2.default);
    this.app.use('/users/', _UsersRoutes2.default);
  }
}

exports. default = new App().app;
