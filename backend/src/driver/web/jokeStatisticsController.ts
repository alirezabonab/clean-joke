import express, { Request, Response } from 'express';
import { Joke, toJoke } from '../../core';
import { JokesStatistics } from '../../core/jokeStatisticsEntity';
import { UseCase } from '../../types';
import { awaitHandlerFactory } from './awaitHandlerFactory';
import { Controller } from './types';

export class JokeStatisticsController implements Controller {
  private path = '/joke/statistics';

  constructor(
    private readonly jokesStatisctsUseCase: UseCase<Joke[], JokesStatistics>
  ) {
    this.jokeStatisticsRequestHandler = this.jokeStatisticsRequestHandler.bind(
      this
    );
    this.initRoutes = this.initRoutes.bind(this);
    this.initRoutes();
  }

  router: express.Router;

  private initRoutes() {
    this.router = express.Router();

    this.router.post(
      `${this.path}`,
      awaitHandlerFactory(this.jokeStatisticsRequestHandler)
    );
  }

  private async jokeStatisticsRequestHandler(req: Request, res: Response) {
    const rawData = req.body;
    if (!rawData || !Array.isArray(rawData)) {
      return res.json({ error: true, message: 'body is invalid!' }).status(400);
    }

    const jokes = rawData
      .map((item) => toJoke(item))
      .filter((joke) => !!joke) as Joke[];

    try {
      const jokeStatistics = await this.jokesStatisctsUseCase.execute(jokes);
      return res
        .json({ error: false, result: jokeStatistics.value })
        .status(200);
    } catch (e) {
      return res.json({ error: true, message: JSON.stringify(e) }).status(500);
    }
  }
}
