import config from './config';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import Router from './routes';
import cookieParser from 'cookie-parser';
import errorHandler from './middlewares/errors.middleware';

const app = express();
const API_PREFIX = config.api.prefix;
const CORS_ENABLE = config.api.cors.enable;
const CORS_WHITELIST = config.api.cors.whitelist;

app.disable('x-powered-by');
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: CORS_ENABLE ? CORS_WHITELIST : '*',
  exposedHeaders: 'Authorization',
  credentials: true,
}));
app.use(morgan('tiny'));

app.use(API_PREFIX, Router);

app.use('*', errorHandler.notFound);
app.use(errorHandler.allErrors);

export default app;