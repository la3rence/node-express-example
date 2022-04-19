import hello from './api/hello.js';
import { goodbye } from "./api/hello.js";
import send from './api/send.js';
import express from 'express';
import logger from 'morgan';
import sse from './api/sse.js';

const app = express();
app.use(logger('dev'));
app.get("/hello", hello);
app.get("/bye", goodbye);
app.get("/send", send);
app.get("/sse", sse);

export default app;