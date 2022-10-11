import dotenv from 'dotenv';

dotenv.config();
import helmet from 'helmet';
import cors from 'cors';
import express from 'express';
import homeRoutes from './routes/HomeRoutes';
import questionariesRoutes from './routes/QuestionariesRoutes';
import questionsRoutes from './routes/QuestionsRoutes';
import answersRoutes from './routes/AnswersRoutes';
import autorizedEmailsRoutes from './routes/AutorizedEmailsRoutes';
import usersRoutes from './routes/UsersRoutes';

const whiteList = [
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

class App {
  public app: express.Application;

  public constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
  }

  private middlewares(): void {
    this.app.use(cors(corsOptions));
    this.app.use(helmet());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
  }

  private routes() {
    this.app.use('/', homeRoutes);
    this.app.use('/questionaries/', questionariesRoutes);
    this.app.use('/questions/', questionsRoutes);
    this.app.use('/answers/', answersRoutes);
    this.app.use('/autorized-emails/', autorizedEmailsRoutes);
    this.app.use('/users/', usersRoutes);
  }
}

export default new App().app;
