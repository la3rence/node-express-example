import swaggerAutogen from "swagger-autogen";
import config from "./apiconfig.js";
const { BASEPATH, swaggerJSONPath, endpointFiles, packageInfo } = config;
const { name, homepage, version, license } = packageInfo;
const doc = {
  info: {
    title: name,
    description: `[Source Code](${homepage})`,
    version,
    license,
  },
  servers: [
    {
      url: "http://localhost:8080" + BASEPATH,
      description: "Local",
    },
    {
      url: "{URL}" + BASEPATH,
      description: "Custom Server URL",
      variables: {
        URL: {
          default: "https://node.lawrenceli.me",
        },
      },
    },
  ],
};

/* NOTE: if you use the express Router, you must pass in the 
   'endpointsFiles' only the root file where the route starts,
   such as index.js, app.js, routes.js, ... */
swaggerAutogen({ openapi: "3.0.0" })(swaggerJSONPath, endpointFiles, doc);
