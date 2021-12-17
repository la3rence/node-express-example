import hello from './api/hello.js';
import { goodbye } from "./api/greeting.js";
import express from 'express';
import logger from 'morgan'

const app = express();
app.use(logger('dev'))
app.get("/", hello);
app.get("/bye", goodbye);
app.listen(80);