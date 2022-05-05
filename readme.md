# Express Demo

[![Mocha CI](https://github.com/Lonor/express-api/actions/workflows/ci.yaml/badge.svg)](https://github.com/Lonor/express-api/actions/workflows/ci.yaml)
[![codecov](https://codecov.io/gh/Lonor/express-api/branch/main/graph/badge.svg?token=KI6j0Pvoid)](https://codecov.io/gh/Lonor/express-api)

## Start

```sh
npm start
```

This will listen the tcp port 8080 to provide the http service.

## Test

```sh
npm test
```

Using `mocha`, `chai` to do the E2E testing.

TIPS: Using `mocha -g ${keyword}` to execute the test cases with name contains `${keyword}`.
or `npm run test:grep ${keyword}`.

## Env

One endpoint is using environment value. e.g., `IFTTT_KEY`.

Touch a file called `.env` to export env variables (by dotenv).

## Serverless

The default directory for these functions is `./api`.

I'm not using the way Vercel recommends, but the traditional way based on express - which makes it easier for me to deploy by any means, like using Docker or directly using node.js.

## License

MIT
