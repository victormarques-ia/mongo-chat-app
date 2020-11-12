import express, { Express } from 'express';
import * as errorHandlers from './handlers/errorHandlers';
import * as routes from './routes';
import cors from 'cors';
import 'dotenv/config';

class Application {
  express: Express;

  constructor() {
    this.express = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.express.use(cors({credentials: true}));
    this.express.use(express.json({ limit: '5mb' }));
    this.express.use(express.urlencoded({ extended: true }));
    /* this.express.use(errorHandlers.notFound); */
    this.express.use(errorHandlers.mongoseErrors);
    if (process.env.ENV === 'DEVELOPMENT') {
      this.express.use(errorHandlers.developmentErrors);
    } else {
      this.express.use(errorHandlers.productionErrors);
    }
  }

  routes() {
    this.express.use('/user', routes.user);
    this.express.use('/chatroom', routes.chatroom);
  }
}

const app = new Application().express;

export { app };
