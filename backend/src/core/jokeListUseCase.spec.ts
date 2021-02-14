import { JokeListUseCase } from './jokeListUseCase';
import { JokeService } from './jokeService';

const fakeJoke = (index: number) => {
  return {
    id: `${index}9c084da1dcb4235ad9e2e9510316b52`,
    content: `${index} joke`,
    upvotes: 4,
    downvotes: 2,
  };
};

const seekFakeJoke = async (seek: number) => {
  const result = [];

  for (let i = 0; i < seek; i++) {
    result.push(fakeJoke(i));
  }

  return result;
};

describe('JokeListUseCase', () => {
  it('returns list of jokes', () => {
    const fakeJokeService: JokeService = {
      list: jest.fn(seekFakeJoke),
      downvote: jest.fn(),
      upvote: jest.fn(),
    };
    const jokeListUseCase = new JokeListUseCase(fakeJokeService);

    const jokes = jokeListUseCase.execute(5);

    expect(jokes).toEqual(seekFakeJoke(5));
  });
});
