export interface Joke {
  id: string;
  content: string;
  upvotes: number;
  downvotes: number;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function toJoke(data: any): Joke | undefined {
  const result = {
    id: data.id,
    content: data.content,
    upvotes: data.upvotes,
    downvotes: data.downvotes,
  };

  if (isValidJoke(result)) {
    return result;
  } else {
    return undefined;
  }
}

export function isValidJoke(joke: Joke): boolean {
  const result: boolean =
    !joke.id ||
    joke.id.length !== 32 ||
    !joke.content ||
    joke.content.length === 0 ||
    joke.upvotes === undefined ||
    joke.downvotes === undefined;

  return !result;
}
