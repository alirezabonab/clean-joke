import express, { Request, Response } from 'express';
import { Joke } from '../../core';
import { UseCase } from '../../types';
import { awaitHandlerFactory } from './awaitHandlerFactory';
import { Controller } from './types';

export class JokeController implements Controller {
  private path = '/joke';

  constructor(
    private readonly jokeListUseCase: UseCase<number, Joke[]>,
    private readonly jokeUpvoteUseCase: UseCase<string, Joke>,
    private readonly jokeDownvoteUseCase: UseCase<string, Joke>
  ) {
    this.jokeListRequestHandler = this.jokeListRequestHandler.bind(this);
    this.jokeUpvoteRequestHandler = this.jokeUpvoteRequestHandler.bind(this);
    this.jokeDownvoteRequestHandler = this.jokeDownvoteRequestHandler.bind(
      this
    );
    this.initRoutes = this.initRoutes.bind(this);
    this.initRoutes();
  }

  router: express.Router;

  private initRoutes() {
    this.router = express.Router();

    this.router.get(
      `${this.path}`,
      awaitHandlerFactory(this.jokeListRequestHandler)
    );

    this.router.post(
      `${this.path}/:id/upvote`,
      awaitHandlerFactory(this.jokeUpvoteRequestHandler)
    );

    this.router.post(
      `${this.path}/:id/downvote`,
      awaitHandlerFactory(this.jokeDownvoteRequestHandler)
    );
  }

  private async jokeListRequestHandler(req: Request, res: Response) {
    const seekParam = req.query.seek;
    if (!seekParam) {
      return res
        .json({ error: true, message: 'seek parameter is invalid!' })
        .status(400);
    }

    try {
      const seek: number = Number.parseInt(seekParam.toString());
      const jokes = await this.jokeListUseCase.execute(seek);
      return res.json({ error: false, result: jokes.value }).status(200);
    } catch (e) {
      return res.json({ error: true, message: JSON.stringify(e) }).status(500);
    }
  }

  private async jokeUpvoteRequestHandler(req: Request, res: Response) {
    const jokeId = req.params.id;
    if (!jokeId) {
      return res
        .json({ error: true, message: 'id parameter is invalid!' })
        .status(400);
    }

    try {
      const joke = await this.jokeUpvoteUseCase.execute(jokeId);
      return res.json({ error: false, result: joke.value }).status(200);
    } catch (e) {
      return res.json({ error: true, message: JSON.stringify(e) }).status(500);
    }
  }

  private async jokeDownvoteRequestHandler(req: Request, res: Response) {
    const jokeId = req.params.id;
    if (!jokeId) {
      return res
        .json({ error: true, message: 'id parameter is invalid!' })
        .status(400);
    }

    try {
      const joke = await this.jokeDownvoteUseCase.execute(jokeId);
      return res.json({ error: false, result: joke.value }).status(200);
    } catch (e) {
      return res.json({ error: true, message: JSON.stringify(e) }).status(500);
    }
  }
}
