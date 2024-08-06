<div align="center">

<h1>🔗 Query Fetch</h1>
<p><b>Lightweight and Easy-to-Use Fetch API Extension Library.</b></p>

[![npm version](https://img.shields.io/npm/v/@gwansikk/query-fetch?color=000&labelColor=000&logo=npm)](https://www.npmjs.com/package/@gwansikk/query-fetch)
[![npm downloads](https://img.shields.io/npm/dt/@gwansikk/query-fetch?color=000&labelColor=000)](https://www.npmjs.com/package/@gwansikk/query-fetch)
[![npm bundle size](https://img.shields.io/bundlephobia/min/@gwansikk/query-fetch?color=000&labelColor=000)](https://www.npmjs.com/package/@gwansikk/query-fetch)

[English](https://github.com/gwansikk/query-fetch/blob/main/README.md)
&nbsp;&nbsp;•&nbsp;&nbsp;
[한국어](https://github.com/gwansikk/query-fetch/blob/main/README-ko_kr.md)

</div>

## What is Query Fetch?

The Fetch API often lacks necessary features, requiring direct implementation. You have to handle retries on failure, token renewal, request and response logging, request cancellation, and more on your own. Additionally, you often need to repeat the same configurations for every request.

Moreover, dealing with Promise objects can be quite challenging. Using Promises for asynchronous processing can lead to complex structures and difficult error handling. Managing multiple asynchronous requests sequentially or in parallel can reduce code readability and maintainability.

To address these issues, Query Fetch was created. It alleviates the burden of network communication, allowing you to focus on your core logic!

## Features

- **Instance Management**: Query Fetch allows you to create multiple instances, each with different settings. This makes it easy to manage integrations with various API endpoints or services.
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
pnpm add @gwansikk/query-fetch
```

```bash
yarn add @gwansikk/query-fetch
```

## Usage

> [!IMPORTANT]\
> Query Fetch is currently in development. The provided API is subject to change.

### Instance

```typescript
const queryFetch = createQueryFetch({
  baseURL: 'https://jsonplaceholder.typicode.com',
});

queryFetch.get({ endpoint: 'posts/1' }).then((data) => console.log(data));
```

### Interceptor

```typescript
const queryFetch = createQueryFetch({
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

queryFetch.get({ endpoint: 'posts/1' }).then((data) => console.log(data));
```

### FetchOptions

```typescript
const queryFetch = createQueryFetch({
  baseURL: 'https://jsonplaceholder.typicode.com',
});

function postsFetchOptions(id: number) {
  return fetchOptions({
    endpoint: ['post', id],
  });
}

queryFetch.get(postsFetchOptions(1)).then((data) => console.log(data));
```

## Roadmap

Here is the roadmap for the official release (v1.0.0):

- [x] Automatic JSON conversion
- [x] Instance creation
- [x] Request and response interceptors
- [ ] Query Parameter
- [ ] Automatic retries
- [ ] Error status handling
- [ ] Request cancellation
- [ ] Token management

## Contributing

We welcome contribution from everyone in the community. Read below for detailed contribution guide.

[CONTRIBUTING.md](https://github.com/gwansikk/query-fetch/blob/main/CONTREIBUTING.md)

## License

For more details, please refer to the [LICENSE](https://github.com/gwansikk/query-fetch/blob/main/LICENSE).

MIT © [gwansikk](https://github.com/gwansikk)
