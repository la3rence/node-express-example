import app from "./app.js";
import logger from "./middleware/logger.js";
import env from "./config/env.js";
const TCP_PORT = env.TCP_PORT;
const PORT = TCP_PORT || 8080;
app.listen(PORT);
logger.info(`Running on :${PORT}`);
