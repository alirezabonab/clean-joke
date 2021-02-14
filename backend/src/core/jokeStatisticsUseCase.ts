import { Result, success, UseCase } from '../types';
import { Joke } from './jokeEntity';
import { JokesStatistics } from './jokeStatisticsEntity';

export function assertNever(): never {
  throw new Error('unsupported type.');
}

type AverageType = 'upvote' | 'downvote';

export function average(jokes: Joke[], averageType: AverageType): number {
  if (jokes.length === 0) {
    return 0;
  }

  const average = jokes.reduce((acc, jokes) => {
    if (averageType === 'upvote') {
      return acc + jokes.upvotes;
    } else if (averageType === 'downvote') {
      return acc + jokes.downvotes;
    } else {
      return assertNever();
    }
  }, 0);

  return average / jokes.length;
}

export function mostCommonLetter(str: string): string {
  const letters = str.replace(/\s/g, '').split('');
  const lettrsOccurrence: Map<string, number> = letters.reduce(
    (acc, letter) => {
      if (!acc.has(letter)) {
        acc.set(letter, 1);
        return acc;
      }
      const letterCount = acc.get(letter);
      acc.set(letter, letterCount + 1);
      return acc;
    },
    new Map()
  );

  let maxCount = 0;
  let maxLetter = '';

  lettrsOccurrence.forEach((value, key) => {
    if (value > maxCount) {
      maxLetter = key;
      maxCount = value;
    }
  });

  return maxLetter;
}

export class JokeStatisticsUseCase implements UseCase<Joke[], JokesStatistics> {
  public async execute(jokes: Joke[]): Promise<Result<Error, JokesStatistics>> {
    const upvotesAverage = average(jokes, 'upvote');
    const downvotesAverage = average(jokes, 'downvote');

    const fullJokesContentText = jokes.map((joke) => joke.content).join('');

    const sumJokesLength = fullJokesContentText.length;

    const lastJokeFirstLetter = jokes[jokes.length - 1].content.substr(0, 1);
    const firstLetterRegex = new RegExp(lastJokeFirstLetter, 'g');
    const firstLetterOccurrence = (
      fullJokesContentText.match(firstLetterRegex) || []
    ).length;

    const mostCommonLetterInAllJokes = mostCommonLetter(fullJokesContentText);

    const statistics = {
      upvotesAverage,
      downvotesAverage,
      sumJokesLength,
      firstLetterOccurrence,
      mostCommonLetterInAllJokes,
    };
    return success(statistics);
  }
}
