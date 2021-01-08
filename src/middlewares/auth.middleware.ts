import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const chechAuth = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.get('Authorization')?.replace('Bearer ', '');
    if (!token) throw new Error('Token not found');
    const verifyToken = jwt.verify(token, 'secret');
    if (verifyToken) next();
  } catch (err) {
    res.status(401).json({ error: true, message: err.message });
  }
};

export default {
  chechAuth,
};