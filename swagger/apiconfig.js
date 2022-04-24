import { fileURLToPath } from 'url';
import { createRequire } from "module";
import { dirname } from 'path';
const require = createRequire(import.meta.url);
// or use node.js 17+: import doc from './swagger-output.json' assert { type: 'json' };
const __dirname = dirname(fileURLToPath(import.meta.url));
const swaggerOutputFileName = "output.json";
const swaggerJSONPath = `${__dirname}/${swaggerOutputFileName}`;
const swaggerJSON = require(swaggerJSONPath);
console.log(swaggerJSON);

export default {
  BASEPATH: "/api",
  swaggerJSONPath,
  swaggerJSON,
  swaggerUIPath: "/docs",
  endpointFiles: ['./app.js'],
}