import { Request, Response } from 'express';
import config from '../config';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { v4 as uuid } from 'uuid';

const ACCESS_SECRET = config.tokens.access.secret;
const ACCESS_EXPIRE = config.tokens.access.expire;
const API_PREFIX = config.api.prefix;
const API_DOMAIN = config.api.domain;

interface IUser {
  id: number;
  username: string;
  password: string;
}
interface IToken {
  id: string;
  userId: number;
  refresh: string;
  userAgent: string | null;
  ipAddress: string | null;
  lastUpdate: number;
  blocked: boolean;
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
const tokens: IToken[] = [];

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

    const userAgent = req.headers['user-agent'] || null;
    const ipAddress = req.socket.remoteAddress || null;
    const newUuid = uuid();

    tokens.push({
      id: uuid(),
      userId: user.id,
      refresh: newUuid,
      userAgent,
      ipAddress,
      lastUpdate: Date.now(),
      blocked: false,
    });

    res.cookie('refresh', newUuid, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      domain: API_DOMAIN,
      path: API_PREFIX + '/auth/refresh'
    });

    res.set('Authorization', 'Bearer ' + accessToken);
    res.status(200).json({ succeed: true });
  } catch (err) {
    res.status(401).json({ error: true, message: err.message });
  }
};

export const refresh = async (req: Request, res: Response) => {
  try {
    const token = req.cookies.refresh as string || null;
    const userAgent = req.headers['user-agent'] || null;
    const ipAddress = req.socket.remoteAddress || null;
    const newUuid = uuid();

    const tokenIndex = tokens.findIndex(t => t.refresh === token);
    if (tokenIndex === -1) throw new Error('Bad refresh token');
    if (tokens[tokenIndex].blocked) throw new Error('Token blocked');
    if (tokens[tokenIndex].ipAddress !== ipAddress || tokens[tokenIndex].userAgent !== userAgent) throw new Error('Ip or User-Agent changed');

    const user = users.find(u => u.id === tokens[tokenIndex].userId);
    if (!user) throw new Error('User not found');

    tokens[tokenIndex].refresh = newUuid;
    tokens[tokenIndex].lastUpdate = Date.now();

    const accessToken = jwt.sign(user, ACCESS_SECRET, { expiresIn: ACCESS_EXPIRE });

    res.cookie('refresh', newUuid, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      domain: API_DOMAIN,
      path: API_PREFIX + '/auth/refresh'
    });
    res.set('Authorization', 'Bearer ' + accessToken);
    res.status(200).json({ succeed: true });
  } catch (err) {
    res.status(401).json({ error: true, message: err.message });
  }
};

export default {
  login,
  refresh,
};