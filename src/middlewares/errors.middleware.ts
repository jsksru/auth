import { Request, Response, NextFunction } from 'express';
import AnswerCreator from '../utils/answerCreator';

export const notFound = (req: Request, res: Response) => {
  return AnswerCreator.error.notFound(res, 'Not Found!');
};

export const allErrors = (err: Error, req: Request, res: Response, next: NextFunction) => {
  return AnswerCreator.error.serverError(res, err.message);
};

export default {
  notFound,
  allErrors,
};