import hello from './api/hello.js';
import { goodbye, slow } from "./api/hello.js";
import send from './api/send.js';
import express from 'express';
import logger from 'morgan';
import sse from './api/sse.js';
import { corsMiddleware } from './middleware/cors.js';
import timeoutResponse from './middleware/timeout.js';

const app = express();
const router = express.Router();
router.use(logger('dev'));
router.use(timeoutResponse);
router.use(corsMiddleware);
router.get("/hello", hello);
router.get("/bye", goodbye);
router.get("/slow", slow);
router.get("/send", send);
router.get("/sse", sse);
router.get("/", (req, res) => { res.send("Hello!") });

app.use('/api', router);

export default app;