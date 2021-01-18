import express from 'express';
import authController from '../controllers/auth.controller';

const Router = express.Router();

Router.post('/login', authController.login);
Router.post('/refresh', authController.refresh);

export default Router;