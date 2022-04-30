import swaggerAutogen from "swagger-autogen";
import config from "./apiconfig.js";

const { BASEPATH, swaggerJSONPath, endpointFiles } = config;

const doc = {
  info: {
    title: "Express API",
    description: "[Source Code](https://github.com/lonor/express-api)",
  },
  servers: [
    {
      url: "http://localhost:8080" + BASEPATH,
      description: "Local",
    },
    {
      url: "https://{URL}",
      description: "Custom Server URL",
      variables: {
        URL: {
          default: "node.lawrenceli.me/api",
        },
      },
    },
  ],
};

/* NOTE: if you use the express Router, you must pass in the 
   'endpointsFiles' only the root file where the route starts,
   such as index.js, app.js, routes.js, ... */
swaggerAutogen({ openapi: "3.0.0" })(swaggerJSONPath, endpointFiles, doc);
