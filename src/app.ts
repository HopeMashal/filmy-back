import { config } from 'dotenv';
import path from 'path';
config({ path: path.resolve(__dirname, '../../.env') });
import apiRouter from '../api/routers/api.router';
import express, { Express } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import { corsConfig } from './config';

import '../db/mongoose';
const app: Express = express();

app.use(cors());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,POST,PUT,PATCH,DELETE,OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});
app.use(morgan('dev'));
app.use(helmet());
app.use(express.json({}));
app.use(express.urlencoded({ extended: false }));
app.use('/api', apiRouter);

app.use('*', ((err, req, res, next) => {
  res.status(500).send('Server Error');
}) as express.ErrorRequestHandler);

export { app };