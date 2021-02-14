import {
  average,
  JokeStatisticsUseCase,
  mostCommonLetter,
} from './jokeStatisticsUseCase';

const fakeJokes = [
  {
    id: '79c084da1dcb4235ad9e2e9510316b52',
    content: 'first joke',
    upvotes: 4,
    downvotes: 2,
  },
  {
    id: '5ad9e2e9510316b5279c084da1dcb423',
    content: 'second joke',
    upvotes: 6,
    downvotes: 2,
  },
];

describe('Joke Statistics', () => {
  describe('average', () => {
    it('returns downvotes average', () => {
      const result = average(fakeJokes, 'downvote');
      expect(result).toEqual(2);
    });

    it('returns upvotes average', () => {
      const result = average(fakeJokes, 'upvote');
      expect(result).toEqual(5);
    });
  });

  describe('mostCommonLetter', () => {
    it('returns most common letter in string', () => {
      const result = mostCommonLetter('Hello World');
      expect(result).toEqual('l');
    });
  });

  describe('JokeStatisticsUseCase', () => {
    it('returns statistics for jokes array', async () => {
      const jokeStatisticsUseCase: JokeStatisticsUseCase = new JokeStatisticsUseCase();
      const result = await jokeStatisticsUseCase.execute(fakeJokes);
      const expected = {
        downvotesAverage: 2,
        firstLetterOccurrence: 2,
        mostCommonLetterInAllJokes: 'o',
        sumJokesLength: 21,
        upvotesAverage: 5,
      };
      expect(result.value).toEqual(expected);
      expect(result.isError()).toEqual(false);
      expect(result.isSuccess()).toEqual(true);
    });
  });
});
