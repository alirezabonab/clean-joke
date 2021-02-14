import { Joke } from './jokeEntity';

export interface JokeService {
  list(seek: number): Promise<Joke[]>;
  upvote(id: string): Promise<Joke>;
  downvote(id: string): Promise<Joke>;
}
