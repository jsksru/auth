import config from './config';
import express from 'express';
// import session from 'express-session';
import Router from './routes';
import errorHandler from './middlewares/errors.middleware';

const app = express();
const API_PREFIX = config.api.prefix;
// const COOKIES_CONFIG = config.cookiesConfig;

app.use(express.json());
// app.use(session(COOKIES_CONFIG));

app.use(API_PREFIX, Router);

app.use('*', errorHandler.notFound);
app.use(errorHandler.allErrors);

export default app;