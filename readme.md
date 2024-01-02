# My Express Template

[![Mocha CI](https://github.com/Lonor/express-api/actions/workflows/ci.yaml/badge.svg)](https://github.com/la3rence/express-api/actions/workflows/ci.yaml)
[![codecov](https://codecov.io/gh/la3rence/node-express-example/branch/main/graph/badge.svg?token=KI6j0Pvoid)](https://codecov.io/gh/la3rence/node-express-example)

This is a demo app when I was learning Node.js with pure ESM support, test coverage, ci/cd, container support and swagger integration.

## Start

```sh
pnpm start
```

This will listen the tcp port 8080 to provide the http service.

## Test

```sh
pnpm test
```

Using `mocha`, `chai` to do the E2E testing. (Assertion library and test framework)
Using `c8` to do the code coverage. Try `pnpm run test:coverage` to see the coverage report under the `coverage` directory.

TIPS: Using `mocha -g ${keyword}` to execute the test cases with name contains `${keyword}`.
or `pnpm run test:grep ${keyword}`.

## Env

Touch a file called `.env` to export env variables on local dev machine (by `dotenv`).

## Swagger

This project using `swagger-ui` to provide the swagger UI and using `swagger-autogen` to generate the swagger spec json file. The default swagger ui page is `/api/docs`.

## Serverless

The default directory for these functions is `./api`.

I'm not using the way Vercel recommends, but the traditional way based on express - which makes it easier for me to deploy by any means, like using Docker or directly using node.js.

## License

MIT
