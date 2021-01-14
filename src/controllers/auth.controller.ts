import { Request, Response } from 'express';
import config from '../config';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const ACCESS_SECRET = config.tokens.access.secret;
const ACCESS_EXPIRE = config.tokens.access.expire;
const REFRESH_SECRET = config.tokens.refresh.secret;
const REFRESH_EXPIRE = config.tokens.refresh.expire;

interface IUser {
  id: number;
  username: string;
  password: string;
}

const users: IUser[] = [
  {
    id: 1,
    username: 'user',
    password: '$2b$10$AeRxOfzlyD0k7q4I6lGpiO8SQjnDDt1NEZiOFrvE0Of.rJfTaKROa'
  },
  {
    id: 2,
    username: 'admin',
    password: '$2b$10$/KXDNWVypiEZaheDQt5cae./soY0zru8DB/GyVKoN.lDmBubwHPZW'
  }
];

export const login = async (req: Request, res: Response) => {
  try {
    const username = String(req.body.username) || '';
    const password = String(req.body.password) || '';

    if (!username) throw new Error('Empty username');
    if (!password) throw new Error('Empty password');

    const user = users.find(u => u.username === username.trim().toLocaleLowerCase());
    if (!user) throw new Error('User not found');

    const verifyPassword = await bcrypt.compare(password, user.password);
    if (!verifyPassword) throw new Error('Bad username or password');

    const accessToken = jwt.sign(user, ACCESS_SECRET, { expiresIn: ACCESS_EXPIRE });
    const refreshToken = jwt.sign(user, REFRESH_SECRET, { expiresIn: REFRESH_EXPIRE });

    console.log(req.headers['user-agent']);
    console.log(req.socket.remoteAddress);

    res.cookie('refresh', refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      domain: 'localhost',
    });
    res.set('Authorization', 'Bearer ' + accessToken);
    res.status(200).json({ succeed: true });
  } catch (err) {
    res.status(401).json({ error: true, message: err.message });
  }
};

export default {
  login,
};