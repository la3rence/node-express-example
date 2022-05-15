import fs from "node:fs/promises";
const swaggerOutputFileName = "spec.json";
const swaggerJSONPath = `./public/api/${swaggerOutputFileName}`;
const packageInfo = JSON.parse(await fs.readFile("./package.json"));

export default {
  BASEPATH: "/api",
  swaggerJSONPath,
  swaggerUIPath: "/docs",
  endpointFiles: [packageInfo.exports],
  packageInfo,
};
