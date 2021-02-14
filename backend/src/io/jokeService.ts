import fetch, { RequestInit } from 'node-fetch';
import { Joke, JokeService, toJoke } from '../core';

export const JOKE_ENDPOINT = 'https://joke3.p.rapidapi.com/v1/joke';
const headers = {
  'x-rapidapi-host': 'joke3.p.rapidapi.com',
  'x-rapidapi-key': 'fc68c25c1dmshad8e02c6a77f665p1ba2fbjsn62d0636f1f70',
};

export function getUpvoteEndpoint(id: string): string {
  return `${JOKE_ENDPOINT}/${id}/upvote`;
}

export function getDownvoteEndpoint(id: string): string {
  return `${JOKE_ENDPOINT}/${id}/downvote`;
}

export class JokeServiceImp implements JokeService {
  public async list(seek: number): Promise<Joke[]> {
    const jokes: Joke[] = [];

    for (let i = 0; i < seek; i++) {
      const response = await fetch(JOKE_ENDPOINT, { headers });
      const data = await response.json();

      const joke = toJoke(data);
      if (joke) jokes.push(joke);
    }

    return jokes;
  }

  public async upvote(id: string): Promise<Joke> {
    const url = getUpvoteEndpoint(id);
    const option: RequestInit = { method: 'POST', headers };
    const response = await fetch(url, option);
    const data = await response.json();
    const joke = toJoke(data);

    if (!joke) {
      throw 'upvote response is invalid!';
    }

    return joke;
  }

  public async downvote(id: string): Promise<Joke> {
    const url = getDownvoteEndpoint(id);
    const option: RequestInit = { method: 'POST', headers };
    const response = await fetch(url, option);
    const data = await response.json();

    const joke = toJoke(data);

    if (!joke) {
      throw 'downvote response is invalid!';
    }

    return joke;
  }
}
