import { fileURLToPath } from "url";
import { dirname } from "path";
const __dirname = dirname(fileURLToPath(import.meta.url));
const swaggerOutputFileName = "output.json";
const swaggerJSONPath = `${__dirname}/${swaggerOutputFileName}`;

export default {
  BASEPATH: "/api",
  swaggerJSONPath,
  swaggerUIPath: "/docs",
  endpointFiles: ["./app.js"],
};
