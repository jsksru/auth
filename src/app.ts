import config from './config';
import express from 'express';
import Router from './routes';
import cookieParser from 'cookie-parser';
import errorHandler from './middlewares/errors.middleware';

const app = express();
const API_PREFIX = config.api.prefix;

app.disable('x-powered-by');
app.use(express.json());
app.use(cookieParser());

app.use(API_PREFIX, Router);

app.use('*', errorHandler.notFound);
app.use(errorHandler.allErrors);

export default app;