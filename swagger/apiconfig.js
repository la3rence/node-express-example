import { fileURLToPath } from "url";
import { dirname } from "path";
import fs from "node:fs/promises";
const __dirname = dirname(fileURLToPath(import.meta.url));
const swaggerOutputFileName = "output.json";
const swaggerJSONPath = `${__dirname}/${swaggerOutputFileName}`;
const packageInfo = JSON.parse(await fs.readFile("./package.json"));

export default {
  BASEPATH: "/api",
  swaggerJSONPath,
  swaggerUIPath: "/docs",
  endpointFiles: [packageInfo.exports],
  packageInfo,
};
