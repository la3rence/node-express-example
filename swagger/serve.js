import swaggerUiExpress from 'swagger-ui-express';
import { createRequire } from "module";
const require = createRequire(import.meta.url);
// or use nodejs 17: import doc from './swagger-output.json' assert { type: 'json' };
const swaggerJSON = require('./output.json');

const swagger = swaggerUiExpress.setup(swaggerJSON);

export default swagger; // for get endpoint
export {
  swaggerUiExpress // for handler serve
}