import express from 'express';
import usersController from '../controllers/users.controller';
import { chechAuth } from '../middlewares/auth.middleware';

const Router = express.Router();

Router.get('/', chechAuth, usersController.getAll);
Router.post('/', chechAuth, usersController.addNew);
Router.put('/:id', chechAuth, usersController.editOne);
Router.delete('/:id', chechAuth, usersController.deleteOne);

export default Router;