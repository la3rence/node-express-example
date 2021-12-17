import hello from './api/hello.js';
import { goodbye } from "./api/greeting.js";
import express from 'express';

const app = express();
app.get("/", hello);
app.get("/bye", goodbye);
app.listen(80);