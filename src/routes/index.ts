import express from 'express';
import authRouter from './auth.route';
import usersRouter from './users.route';

const Router = express.Router();

Router.use('/auth', authRouter);
Router.use('/users', usersRouter);

export default Router;