import express from 'express';
import Router from './routes';
import errorHandler from './middlewares/errors.middleware';

const app = express();

app.use(express.json());
app.use(Router);

app.use('*', errorHandler.notFound);
app.use(errorHandler.allErrors);

app.listen(3000, () => console.log('Server listening on 3000 port...'));