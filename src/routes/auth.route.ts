import express from 'express';
import authController from '../controllers/auth.controller';

const Router = express.Router();

Router.get('/login', authController.login);

export default Router;