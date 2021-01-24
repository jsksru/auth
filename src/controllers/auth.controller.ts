import { Request, Response } from 'express';
import config from '../config';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { v4 as uuid } from 'uuid';
import UserModel from '../models/user.model';
import TokenModel from '../models/token.model';

const ACCESS_SECRET = config.tokens.access.secret;
const ACCESS_EXPIRE = config.tokens.access.expire;
const API_PREFIX = config.api.prefix;
const API_DOMAIN = config.api.domain;

export const login = async (req: Request, res: Response) => {
  try {
    const username = String(req.body.username) || '';
    const password = String(req.body.password) || '';

    if (!username) throw new Error('Empty username');
    if (!password) throw new Error('Empty password');

    const user = await UserModel.findOne({ username: username.toLocaleLowerCase().trim() });
    if (!user) throw new Error('User not found');

    const verifyPassword = await bcrypt.compare(password, user.password);
    if (!verifyPassword) throw new Error('Bad username or password');

    const accessToken = jwt.sign({ userId: user._id, username: user.username }, ACCESS_SECRET, { expiresIn: ACCESS_EXPIRE });

    const userAgent = req.headers['user-agent'] || null;
    const ipAddress = req.socket.remoteAddress || null;
    const newUuid = uuid();

    const token = new TokenModel({
      userId: user._id,
      refresh: newUuid,
      userAgent,
      ipAddress
    });
    await token.save();

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
    const requestToken = req.cookies.refresh as string || null;
    const userAgent = req.headers['user-agent'] || null;
    const ipAddress = req.socket.remoteAddress || null;
    const newUuid = uuid();

    const resultToken = await TokenModel.findOne({ refresh: requestToken });
    if (!resultToken) throw new Error('Bad refresh token');
    if (resultToken.blocked) throw new Error('Token blocked');
    if (resultToken.ipAddress !== ipAddress || resultToken.userAgent !== userAgent) throw new Error('Ip or User-Agent changed');

    const user = UserModel.findOne({ _id: resultToken.userId });
    if (!user) throw new Error('User not found');

    TokenModel.findByIdAndUpdate({ _id: resultToken._id }, {
      refresh: newUuid,
      lastUpdate: Date.now()
    });

    const accessToken = jwt.sign({ userId: user._id, username: user.username }, ACCESS_SECRET, { expiresIn: ACCESS_EXPIRE });

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