# Express Demo

[![Mocha CI](https://github.com/Lonor/express-api/actions/workflows/ci.yaml/badge.svg)](https://github.com/Lonor/express-api/actions/workflows/ci.yaml)

## Start

```sh
npm start
```

Will listen the tcp port 8080 to provide http service.

## Test

```sh
npm test
```

Using `mocha`, `chai` to do the E2E testing.

Using `mocha -g ${keyword}` to execute the test cases with name contains `${keyword}`.
or `npm run test:grep ${keyword}`.

## Env

One endpoint is using environment value. e.g., `IFTTT_KEY`.

Touch a file called `.env` to export env variables (by dotenv).

## Serverless

The default directory for these functions is `./api`.

I'm not using the way Vercel recommends, but the traditional way based on express - which makes it easier for me to deploy by any means, like using Docker or directly using node.js.

## License

MIT
