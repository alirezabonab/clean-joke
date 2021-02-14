import { FetchMockSandbox } from 'fetch-mock';
import {
  getDownvoteEndpoint,
  getUpvoteEndpoint,
  JokeServiceImp,
  JOKE_ENDPOINT,
} from './jokeService';
import fetch from 'node-fetch';

const fakeJokes = [
  {
    id: '79c084da1dcb4235ad9e2e9510316b52',
    content: 'first joke',
    upvotes: 3,
    downvotes: 2,
  },
  {
    id: '5ad9e2e9510316b5279c084da1dcb423',
    content: 'second joke',
    upvotes: 3,
    downvotes: 2,
  },
];

const modifyJokeId = '79c084da1dcb4235ad9e2e9510316b52';

const fetchMock = (fetch as unknown) as FetchMockSandbox;

fetchMock.mock('*', 200);

describe('JokeServiceImp', () => {
  let jokeService: JokeServiceImp;

  beforeAll(() => {
    jokeService = new JokeServiceImp();
  });

  beforeEach(() => {
    let jokeRequestCounter = 0;
    fetchMock.reset();
    fetchMock.get(JOKE_ENDPOINT, () => {
      const body = fakeJokes[jokeRequestCounter++] || {};
      return {
        status: 200,
        body,
      };
    });
    fetchMock.post(getUpvoteEndpoint(modifyJokeId), () => {
      const body = fakeJokes[0];
      body.upvotes += 1;
      return {
        status: 200,
        body,
      };
    });
    fetchMock.post(getDownvoteEndpoint(modifyJokeId), () => {
      const body = fakeJokes[0];
      body.downvotes += 1;
      return {
        status: 200,
        body,
      };
    });
  });

  it('fetches 2 valid joke', async () => {
    const jokes = await jokeService.list(5);
    expect(jokes).toEqual(fakeJokes);
  });

  it('upvotes the joke', async () => {
    const upvotedJoke = await jokeService.upvote(modifyJokeId);
    expect(upvotedJoke.upvotes).toEqual(4);
  });

  it('downvotes the joke', async () => {
    const downvotedJoke = await jokeService.downvote(modifyJokeId);
    expect(downvotedJoke.downvotes).toEqual(3);
  });
});
