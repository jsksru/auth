import express from 'express';
import authRouter from '../routes/auth.route';
import usersRouter from '../routes/users.route';

const Router = express.Router();

Router.use('/auth', authRouter);
Router.use('/users', usersRouter);

export default Router;