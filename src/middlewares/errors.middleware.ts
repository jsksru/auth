import { Request, Response, NextFunction } from 'express';

export const notFound = (req: Request, res: Response) => {
  res.status(404).json({ error: true, message: 'Not Found!'});
};

export const allErrors = (err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({ error: true, message: err.message});
};

export default {
  notFound,
  allErrors,
};