import express from 'express';
import logger from 'morgan';
import swaggerUiExpress from 'swagger-ui-express';
import sse from './api/sse.js';
import hello, { goodbye, slow } from "./api/hello.js";
import { sendToIfttt } from './api/send.js';
import { corsMiddleware } from './middleware/cors.js';
import timeoutResponse from './middleware/timeout.js';

import config from './swagger/apiconfig.js';

const { BASEPATH, swaggerUIPath, swaggerJSON } = config;
const app = express();
app.use(logger('dev'));
const router = express.Router();
router.use(express.json());
router.use(timeoutResponse);
router.use(corsMiddleware);
router.post("/hello", hello);
router.get("/bye/:name", goodbye);
router.get("/slow", slow);
router.get("/send", sendToIfttt);
router.get("/sse", sse);
router.use(swaggerUIPath, swaggerUiExpress.serve);
router.get(swaggerUIPath, swaggerUiExpress.setup(swaggerJSON));
app.use(BASEPATH, router);
app.use("/", express.static('public'));

export default app;