import express from 'express';
import { Controller } from './types';

export interface AppInitConfig {
  port: number;
  middleWares: express.RequestHandler[];
  controllers: Controller[];
}

export class ExpressApp {
  public app: express.Application;
  public port: number;

  constructor(appInit: AppInitConfig) {
    this.app = express();
    this.port = appInit.port;

    this.middlewares(appInit.middleWares);
    this.routes(appInit.controllers);
    this.assets();
    this.template();
  }

  private middlewares(middleWares: express.RequestHandler[]) {
    middleWares.forEach((middleWare) => {
      this.app.use(middleWare);
    });
  }

  private routes(controllers: Controller[]) {
    controllers.forEach((controller) => {
      this.app.use('/api/v1/', controller.router);
    });
  }

  private assets() {
    this.app.use(express.static('public'));
  }

  private template() {
    this.app.set('view engine', 'pug');
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(`App listening on the http://localhost:${this.port}`);
    });
  }
}
