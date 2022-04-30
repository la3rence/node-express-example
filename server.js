import app from "./app.js";
import logger from "./middleware/logger.js";
const PORT = 8080;
app.listen(PORT);
logger.info(`Running on :${PORT}`);
