<div align="center">

<h1>🔌🌐 Query Adaptor</h1>
<p><b>Powerful Fetch API, Flexible HTTP Client Management, compatible with all framework environments</b></p>

[![GitHub License](https://img.shields.io/github/license/gwansikk/query-fetch?labelColor=black&color=black)](https://github.com/gwansikk/query-fetch?tab=MIT-1-ov-file)
![Codacy grade](https://img.shields.io/codacy/grade/bf89208f2e9f4590832d09131dd207c2?logo=codacy&labelColor=black&color=black)

[English](https://github.com/gwansikk/query-fetch/blob/main/README.md)
&nbsp;&nbsp;•&nbsp;&nbsp;
[한국어](https://github.com/gwansikk/query-fetch/blob/main/README-ko_kr.md)

</div>

## Why Query Fetch?

Fetch API only provides basic functionality, often requiring developers to implement additional features themselves. For example, automatic retries on request failure, renewing authentication tokens, logging requests and responses, and canceling requests are not supported by the Fetch API and need to be manually added. Additionally, there's the hassle of repeatedly writing the same configurations.

To overcome these limitations, Query Fetch was developed. As the name suggests, it allows for simple, query-like usage that reduces the complexity of network communication logic. Use it declaratively, like making a simple query, to lessen the burden of handling network communication and focus on your core logic!

## Key features

- **🧰 Extension of Fetch API**: Provides richer functionality than Fetch API. With features like Instance, Interceptor, and Effect, it minimizes complex configurations and enables flexible HTTP communication.
- **🧩 Support for Various Environments**: Designed for easy use in various environments. Query Fetch works seamlessly in specialized Fetch API environments like Next.js, React Native, and Tauri by simply being used as an adapter.
- **✨ Strong Type Safety**: Fully supports TypeScript and requires only the necessary types for precise type inference. This minimizes unnecessary types and ensures robust type safety.

## Packages

### query-adaptor &middot; [![npm version](https://img.shields.io/npm/v/query-adaptor?color=000&labelColor=000&logo=npm)](https://www.npmjs.com/package/query-adaptor) [![npm downloads](https://img.shields.io/npm/dm/query-adaptor?color=000&labelColor=000)](https://www.npmjs.com/package/query-adaptor) [![npm bundle size](https://img.shields.io/bundlephobia/min/query-adaptor?color=000&labelColor=000)](https://www.npmjs.com/package/query-adaptor)

> Provides core features of Query Fetch.

- query
- createQueryAdapter
- fetchOptions

### @query-adaptor/react-query &middot; [![npm version](https://img.shields.io/npm/v/@query-adaptor/react-query?color=000&labelColor=000&logo=npm)](https://www.npmjs.com/package/@query-adaptor/react-query) [![npm downloads](https://img.shields.io/npm/dm/@query-adaptor/react-query?color=000&labelColor=000)](https://www.npmjs.com/package/@query-adaptor/react-query) [![npm bundle size](https://img.shields.io/bundlephobia/min/@query-adaptor/react-query?color=000&labelColor=000)](https://www.npmjs.com/package/@query-adaptor/react-query)

> Provides features to easily use Query Fetch with React Query.

- queryFetchFn
- queryFetchKey
- toQueryOptions

## Official Documentation

Visit the [official documentation](https://query-fetch.gwansik.dev) for detailed information on installation, usage, and more.

## Contributing

We welcome contribution from everyone in the community. Read below for detailed contribution guide.

[CONTRIBUTING.md](https://github.com/gwansikk/query-fetch/blob/main/CONTRIBUTING.md)

### Contributors

[![contributors](https://contrib.rocks/image?repo=gwansikk/query-fetch)](https://github.com/gwansikk/query-fetch/contributors)

## License

See [LICENSE](https://github.com/gwansikk/query-fetch/blob/main/LICENSE) for more information.

MIT © [gwansikk](https://github.com/gwansikk)
