import winston from "winston";
import expressWinston from "express-winston";

// touching a file seems not allowed on Serverless platform.
const isServerless = process.env.VERCEL === "1";
// if prod, write json logs to file.
const isProd = process.env.NODE_ENV === "PRODUCTION";

const transports = [new winston.transports.Console()];
if (isProd && !isServerless) {
  transports.push(
    new winston.transports.File({
      filename: "logs/winston.log",
      timestamp: true,
    })
  );
}

const logOptions = {
  transports,
  format: winston.format.combine(
    winston.format.uncolorize({ all: !isProd }),
    winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    isProd ? winston.format.json() : winston.format.cli()
  ),
  meta: isProd,
  msg: "{{res.responseTime}}ms  {{res.statusCode}}  {{req.method}}  {{req.url}}", // optional: customize the default logging message. E.g. "{{res.statusCode}} {{req.method}} {{res.responseTime}}ms {{req.url}}"
  expressFormat: false, // Use the default Express/morgan request formatting. Enabling this will override any msg if true. Will only output colors with colorize set to true
  ignoreRoute: function (req, res) {
    return false;
  }, // optional: allows to skip some log messages based on request and/or response
};

const expressLogger = expressWinston.logger(logOptions);
const logger = winston.createLogger(logOptions);
export default logger;
export { expressLogger };
