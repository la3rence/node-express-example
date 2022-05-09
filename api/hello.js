import logger from "../middleware/logger.js";
import express from "express";
const helloRouter = express.Router();

const hello = (req, res) => {
  // #swagger.description = 'Send Hello...'
  /* #swagger.parameters['name'] = {
        in: 'body',
        description: 'Your name...'
     } */
  const { name } = req.body;
  logger.info(`${name} is coming...`);
  res.status(200).json({ hello: `${name}` });
};

const goodbye = (req, res) => {
  // #swagger.description = 'Send bye...'
  const { name } = req.params;
  logger.info(`${name} is leaving...`);
  res.send(`bye...${name}`);
};

const slow = async (req, res) => {
  logger.warn("start to do very slow jobs...");
  await sleep(6000);
  logger.info("finally end! try to send response...");
  res.status(200).json({ slow: "response" });
};

const sleep = async (time) =>
  new Promise((resolve) => {
    setTimeout(resolve, time);
  });

helloRouter.post("/hello", hello);
helloRouter.get("/bye/:name", goodbye);
helloRouter.get("/slow", slow);
export default hello;
export { helloRouter };
