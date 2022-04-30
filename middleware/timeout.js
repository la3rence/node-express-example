import logger from "./logger.js";
const TIMEOUTMS = 5000;

const timeoutResponse = (req, res, next) => {
  res.setTimeout(TIMEOUTMS, () => {
    logger.warn("Timeout - will response end with 408");
    // res.headersSent to check if already sent
    res.status(408).json({ error: "timeout 408" });
    // override all response functions to fix re-send headers error
    res.json =
      res.send =
      res.sendFile =
      res.jsonP =
      res.end =
      res.sendStatus =
        (body) => {
          logger.warn(`not send: ${body}`);
        };
  });
  next();
};

export default timeoutResponse;
