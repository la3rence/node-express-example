import hello from './api/hello.js';
import { goodbye } from "./api/hello.js";
import send from './api/send.js';
import express from 'express';
import logger from 'morgan';

const app = express();
app.use(logger('dev'));
app.get("/hello", hello);
app.get("/bye", goodbye);
app.get("/send", send);

export default app;