import swaggerUiExpress from 'swagger-ui-express';
console.log("start create require");
import { createRequire } from "module";
const require = createRequire(import.meta.url);
// or use nodejs 17: import doc from './swagger-output.json' assert { type: 'json' };
const swaggerJSON = require('./output.json');
console.log("end create require");
const swagger = swaggerUiExpress.setup(swaggerJSON);

export default swagger; // for get endpoint
export {
  swaggerUiExpress // for handler serve
}