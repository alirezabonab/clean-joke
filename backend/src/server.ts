import { ExpressApp, JokeController, JokeStatisticsController } from './driver';

import * as bodyParser from 'body-parser';
import { JokeListUseCase } from './core/jokeListUseCase';
import {
  JokeDownvoteUseCase,
  JokeService,
  JokeStatisticsUseCase,
  JokeUpvoteUseCase,
} from './core';
import { JokeServiceImp } from './io/jokeService';

// Dependency Injection!
const jokeService: JokeService = new JokeServiceImp();
const jokeListUseCase = new JokeListUseCase(jokeService);
const jokeUpvoteUseCase = new JokeUpvoteUseCase(jokeService);
const jokeDownVoteUseCase = new JokeDownvoteUseCase(jokeService);
const jokeStatisticsUseCase = new JokeStatisticsUseCase();

const jokeController: JokeController = new JokeController(
  jokeListUseCase,
  jokeUpvoteUseCase,
  jokeDownVoteUseCase
);

const jokeStatisticsController: JokeStatisticsController = new JokeStatisticsController(
  jokeStatisticsUseCase
);

const app = new ExpressApp({
  port: 5000,
  controllers: [jokeController, jokeStatisticsController],
  middleWares: [bodyParser.json(), bodyParser.urlencoded({ extended: true })],
});

app.listen();
