import hello from './api/hello.js';
import { goodbye, slow } from "./api/hello.js";
import send from './api/send.js';
import express from 'express';
import logger from 'morgan';
import sse from './api/sse.js';
import { corsMiddleware } from './middleware/cors.js';
import timeoutResponse from './middleware/timeout.js';

const app = express();
app.use(logger('dev'));
app.use(timeoutResponse);
app.use(corsMiddleware);
app.get("/hello", hello);
app.get("/bye", goodbye);
app.get("/slow", slow);
app.get("/send", send);
app.get("/sse", sse);
app.get("/", (req, res) => { res.send("Hello!") });

export default app;