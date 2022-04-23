import swaggerUiExpress from 'swagger-ui-express';
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const swaggerDoc = require('./../swagger-output.json');

const swagger = swaggerUiExpress.setup(swaggerDoc);

export default swagger;