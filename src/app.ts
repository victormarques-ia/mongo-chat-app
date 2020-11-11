import express, { Express } from 'express';
import * as errorHandlers from './handlers/errorHandlers';

class Application {
  express: Express;

  constructor() {
    this.express = express();
    this.middlewares();
  }

  middlewares() {
    this.express.use(express.json({ limit: '5mb' }));
    this.express.use(express.urlencoded({ extended: true }));
    this.express.use(errorHandlers.notFound);
    this.express.use(errorHandlers.mongoseErrors);
    if (process.env.ENV === 'DEVELOPMENT') {
      this.express.use(errorHandlers.developmentErrors);
    } else {
      this.express.use(errorHandlers.productionErrors);
    }
  }
}

const app = new Application().express;

export { app };
