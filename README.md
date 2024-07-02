<div align="center">

<h1>🔗 Query Fetch</h1>
<p><b>Lightweight and Easy-to-Use Fetch API Extension Library.</b></p>

[![npm version](https://img.shields.io/npm/v/@gwansikk/query-fetch?logo=npm)](https://www.npmjs.com/package/@gwansikk/query-fetch)
[![npm downloads](https://img.shields.io/npm/dt/@gwansikk/server-chain?logo=npm)](https://www.npmjs.com/package/@gwansikk/query-fetch)
[![npm bundle size](https://img.shields.io/bundlephobia/min/@gwansikk/query-fetch?logo=npm)](https://www.npmjs.com/package/@gwansikk/query-fetch)

[English](https://github.com/gwansikk/query-fetch/blob/main/README.md)
&nbsp;&nbsp;•&nbsp;&nbsp;
[한국어](https://github.com/gwansikk/query-fetch/blob/main/README-ko_kr.md)

</div>

## What is Query Fetch?

Handling Promise objects can be quite challenging. When using Promises for asynchronous processing, complex structures can arise, and error handling can become tricky. This is especially true when processing multiple asynchronous requests sequentially or in parallel, which can degrade code readability and maintainability.

Additionally, the Fetch API often lacks necessary features or requires manual implementation. You may need to handle tasks such as retrying failed requests, refreshing authentication tokens, logging requests and responses, and canceling requests. Repeating the same settings for each request can also be tedious.

To address these issues, Query Fetch was created. Reduce the burden of network communication and focus on your core logic!

## Features

- **Instance Management**: Query Fetch allows you to create multiple instances, each with different settings. This makes it easy to manage integrations with various API endpoints or services.
- **Request and Response Logging**: Logs all requests and responses for easier debugging and monitoring.
- **Automatic Retries**: Automatically retries requests in case of network errors or server issues.
- **Request Cancellation**: Provides the ability to cancel unnecessary requests.
- **Token Management**: Automatically refreshes authentication tokens when they expire and retries the request.
- **Type Safe**: Fully supports TypeScript, ensuring accurate type inference and minimizing unnecessary types.

## Installation

Query Fetch is available on npm. You can install it using the following commands.

```bash
npm i @gwansikk/query-fetch
```

```bash
yarn add @gwansikk/query-fetch
```

## Usage

> [!IMPORTANT]\
> Query Fetch is currently in development. The provided API is subject to change.

### Instance

```js
const queryFetch = createQueryFetch({
  key: 'INSTANCE',
  baseURL: 'https://jsonplaceholder.typicode.com',
});

server.get({ url: 'posts/1' }).then((data) => console.log(data));
```

### Interceptor

```js
const queryFetch = createQueryFetch({
  key: 'INTERCEPTOR',
  baseURL: 'https://jsonplaceholder.typicode.com',
  interceptors: {
    request: (request) => {
      console.log('** request interceptor **');
      // Modify and return the request.
      // For example, you can add specific headers or modify the URL.
      request.headers = {
        ...request.headers,
        Authorization: 'Bearer YOUR_ACCESS_TOKEN',
      };
      return request;
    },
    response: (response) => {
      console.log('** response interceptor **');
      // Modify and return the response.
      return response;
    },
    error: (response) => {
      console.log('** error interceptor **');
      // Modify and return the error response.
      return response;
    },
  },
});
```

## Roadmap

Here is the roadmap for the official release (v1.0.0):

- [x] Automatic JSON conversion
- [x] Instance creation
- [x] Request and response interceptors
- [ ] Automatic retries
- [ ] Error status handling
- [ ] Request cancellation
- [ ] Token management
- [ ] Request and response logging
- [ ] Type safe support

## Contributing

We welcome contribution from everyone in the community. Read below for detailed contribution guide.

[CONTRIBUTING.md](https://github.com/gwansikk/query-fetch/blob/main/CONTRIBUTING.md)

## License

For more details, please refer to the [LICENSE](https://github.com/gwansikk/query-fetch/blob/main/LICENSE).

MIT © [gwansikk](https://github.com/gwansikk)
