import { NextFunction, Request, RequestHandler, Response } from 'express';

export const awaitHandlerFactory = (middleware: RequestHandler) => {
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await middleware(req, res, next);
    } catch (e) {
      next(e);
    }
  };
};
