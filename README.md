<div align="center">

<h1>🔗 Query Fetch</h1>
<p><b>Lightweight and Easy-to-Use Fetch API Extension Library.</b></p>

![GitHub License](https://img.shields.io/github/license/gwansikk/query-fetch?labelColor=black&color=black)
![Codacy grade](https://img.shields.io/codacy/grade/bf89208f2e9f4590832d09131dd207c2?logo=codacy&labelColor=black&color=black)

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

## Packages

### @query-fetch/core &middot; [![npm version](https://img.shields.io/npm/v/@query-fetch/core?color=black&labelColor=black&logo=npm)](https://www.npmjs.com/package/@query-fetch/core) ![NPM Downloads](https://img.shields.io/npm/dm/%40query-fetch%2Fcore?labelColor=black&color=black) [![npm bundle size](https://img.shields.io/bundlephobia/min/@query-fetch/core?color=black&labelColor=black)](https://www.npmjs.com/package/@query-fetch/core)

> Provides core features of Query Fetch.

- createQueryFetch
- queryOptions

### @query-fetch/react-query &middot; [![npm version](https://img.shields.io/npm/v/@query-fetch/react-query?color=black&labelColor=black&logo=npm)](https://www.npmjs.com/package/@query-fetch/react-query) ![NPM Downloads](https://img.shields.io/npm/dm/%40query-fetch%2Fcore?labelColor=black&color=black) [![npm bundle size](https://img.shields.io/bundlephobia/min/@query-fetch/react-query?color=black&labelColor=black)](https://www.npmjs.com/package/@query-fetch/react-query)

> Provides features to easily use Query Fetch with React Query.

- queryFetchKey

## Official Documentation

Visit the [official documentation](https://offlegacy.org/) for detailed information on installation, usage, and more.

## Contributing

We welcome contribution from everyone in the community. Read below for detailed contribution guide.

[CONTRIBUTING.md](https://github.com/gwansikk/query-fetch/blob/main/CONTREIBUTING.md)

### Contributors

[![contributors](https://contrib.rocks/image?repo=gwansikk/query-fetch)](https://github.com/gwansikk/query-fetch/contributors)

## License

See [LICENSE](https://github.com/gwansikk/query-fetch/blob/main/LICENSE) for more information.

MIT © [gwansikk](https://github.com/gwansikk)
