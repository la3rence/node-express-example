import winston from "winston";
import expressWinston from "express-winston";

// touching a file seems not allowed on Serverless platform.
const allowedTouchFile = process.env.VERCEL !== "1";

const transports = [new winston.transports.Console()];
if (allowedTouchFile) {
  transports.push(
    new winston.transports.File({ filename: "logs/winston.log" })
  );
}

const logOptions = {
  transports,
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.cli()
  ),
  meta: false, // optional: control whether you want to log the meta data about the request (default to true)
  msg: "{{res.responseTime}}ms\t{{res.statusCode}}\t{{req.method}}\t{{req.url}}", // optional: customize the default logging message. E.g. "{{res.statusCode}} {{req.method}} {{res.responseTime}}ms {{req.url}}"
  expressFormat: false, // Use the default Express/morgan request formatting. Enabling this will override any msg if true. Will only output colors with colorize set to true
  colorize: true, // Color the text and status code, using the Express/morgan color palette (text: gray, status: default green, 3XX cyan, 4XX yellow, 5XX red).
  ignoreRoute: function (req, res) {
    return false;
  }, // optional: allows to skip some log messages based on request and/or response
};

const expressLogger = expressWinston.logger(logOptions);
const logger = winston.createLogger(logOptions);
export default logger;
export { expressLogger };
