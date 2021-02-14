import { error, Result, success, UseCase } from '../types';
import { Joke } from './jokeEntity';
import { JokeService } from './jokeService';

export class JokeListUseCase implements UseCase<number, Joke[]> {
  constructor(private readonly jokeService: JokeService) {}

  public async execute(seek: number): Promise<Result<Error, Joke[]>> {
    try {
      const jokes = await this.jokeService.list(seek);
      return success(jokes);
    } catch (e) {
      return error(e);
    }
  }
}
