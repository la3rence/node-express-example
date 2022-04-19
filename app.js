import hello from './api/hello.js';
import { goodbye } from "./api/hello.js";
import send from './api/send.js';
import express from 'express';
import logger from 'morgan';
import sse from './api/sse.js';
import { corsMiddleware } from './cors/wrapper.js';

const app = express();
app.use(logger('dev'));
// to add a middleware to all requests
app.use((req, res, next) => {
  next();
});
app.use(corsMiddleware);
app.get("/hello", hello);
app.get("/bye", goodbye);
app.get("/send", send);
app.get("/sse", sse);
app.get("/", (req, res) => { res.send("Hello!") });
export default app;