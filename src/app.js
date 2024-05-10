import express from 'express';
import { Liquid } from 'liquidjs';
import path from 'path';
import cookieParser from 'cookie-parser';

import morgan from 'morgan';
import cors from 'cors';

import {
  authRouter, usersRouter, productsRouter, cartsRouter,
} from './routes';

const app = express();
const engine = new Liquid();

app.engine('liquid', engine.express());
app.set('views', path.join(__dirname, '..', 'views')); // specify the views directory
app.set('view engine', 'liquid'); // set liquid to default

app.use(express.json());
app.use(express.urlencoded({
  extended: true,
}));
app.use(cors());
app.use(morgan('tiny'));
app.use(cookieParser());

app.use('/auth', authRouter);
app.use('/users', usersRouter);
app.use('/products', productsRouter);
app.use('/cart', cartsRouter);

export default app;
