import config from '../config';
import { Response } from 'express';
import AnswerCreator from './answerCreator';

const API_PREFIX = config.api.prefix;
const API_DOMAIN = config.api.domain;
const HTTPS_ENABLE = config.api.mode.https.enable;
const COOKIE_MAX_AGE = config.tokens.refresh.lifetime;

export const sendTokens = (res: Response, newUuid: string, accessToken: string) => {
  res.cookie('refresh', newUuid, {
    httpOnly: true,
    secure: HTTPS_ENABLE ? true : false,
    sameSite: 'strict',
    domain: API_DOMAIN,
    path: API_PREFIX + '/auth/refresh',
    expires: new Date(Date.now() + COOKIE_MAX_AGE),
  });

  res.set('Authorization', 'Bearer ' + accessToken);
  return AnswerCreator.success.emptyOk(res);
};

export default {
  sendTokens,
};