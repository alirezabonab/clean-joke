import { Result } from '../types/result';

type ErrorResponse = Error | string;

export interface UseCase<T, U> {
  execute: (payload: T) => Promise<Result<ErrorResponse, U>>;
}
