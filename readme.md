# Express Demo

## Start

```sh
npm run start
```

Will listen the tcp port 8080 to provide http service.

## Test

```sh
npm run test
```

Using `mocha`, `chai` to do the E2E testing.

Using `mocha -g ${keyword}` to execute the test cases with name contains `${keyword}`.
or `npm run unit ${keyword`.

## Env

One end point is using environment value. e.g., `IFTTT_KEY`.

Check out the docs in [WebHooks - IFTTT](https://ifttt.com/maker_webhooks).

Touch a file called `.env` to export env variables. (dotenv)

## Serverless

As per the guide of Vercel, we can export the function as a serverless function by default export (ESM).

The default directory for these functions is `./api`.
