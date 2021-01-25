import { Request, Response, NextFunction } from 'express';
import AnswerCreator from '../utils/answerCreator';

export const notFound = (req: Request, res: Response) => {
  AnswerCreator.error.notFound(res, 'Not Found!');
};

export const allErrors = (err: Error, req: Request, res: Response, next: NextFunction) => {
  AnswerCreator.error.serverError(res, err.message);
};

export default {
  notFound,
  allErrors,
};