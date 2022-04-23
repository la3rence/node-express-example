import swaggerAutogen from 'swagger-autogen';

const doc = {
  info: {
    title: 'Express API',
    description: 'github.com/lonor/express-api',
  },
  host: 'localhost:8080',
  servers: [
    {
      "url": "http://localhost:8080",
      "description": "Local"
    },
    {
      "url": "https://node.lawrenceli.vercel.app",
      "description": "Vercel"
    }
  ],
  schemes: ['http'],
  basePath: '/api',
};

const outputFile = './swagger/output.json';
const endpointsFiles = ['./app.js'];

/* NOTE: if you use the express Router, you must pass in the 
   'endpointsFiles' only the root file where the route starts,
   such as index.js, app.js, routes.js, ... */
swaggerAutogen({ openapi: '3.0.0' })(outputFile, endpointsFiles, doc);