import dotenv from 'dotenv';

dotenv.config();
import helmet from 'helmet';

import express from 'express';
import homeRoutes from './routes/HomeRoutes';
import questionariesRoutes from './routes/QuestionariesRoutes';

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
  public app: express.Application;

  public constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
  }

  private middlewares(): void {
    // this.app.use(cors(corsOptions));
    this.app.use(helmet());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
  }

  private routes() {
    this.app.use('/', homeRoutes);
    this.app.use('/questionaries/', questionariesRoutes);
  }
}

export default new App().app;
