import config from '../config';
import { Response } from 'express';

const API_PREFIX = config.api.prefix;
const API_DOMAIN = config.api.domain;

export const sendTokens = (res: Response, newUuid: string, accessToken: string) => {
  res.cookie('refresh', newUuid, {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
    domain: API_DOMAIN,
    path: API_PREFIX + '/auth/refresh'
  });

  res.set('Authorization', 'Bearer ' + accessToken);
  return res.status(200).json({ succeed: true });
};

export default {
  sendTokens,
}