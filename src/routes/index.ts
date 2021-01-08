import express from 'express';
import authRouter from '../routes/auth.route';

const Router = express.Router();

Router.use('/auth', authRouter);

export default Router;