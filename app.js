import express from "express";
import { expressLogger } from "./middleware/logger.js";
import swaggerUiExpress from "swagger-ui-express";
import sse from "./api/sse.js";
import helloRouter from "./api/hello.js";
import { corsMiddleware } from "./middleware/cors.js";
import apiConfig from "./swagger/apiconfig.js";
import { resolve } from "path";
import fs from "node:fs/promises";

const { BASEPATH, swaggerUIPath, swaggerJSONPath } = apiConfig;
// or use node.js 17+: import doc from './swagger-output.json' assert { type: 'json' };
const swaggerSpec = JSON.parse(await fs.readFile(swaggerJSONPath));

const app = express();
app.use(expressLogger);
const router = express.Router();
router.use(express.json());
router.use(corsMiddleware);
// API Router
router.use(helloRouter);
router.get("/sse", sse);
router.use(
  swaggerUIPath,
  swaggerUiExpress.serve,
  swaggerUiExpress.setup(swaggerSpec)
);
app.use(BASEPATH, router);
app.use("/", express.static(resolve("public")));

export default app;
