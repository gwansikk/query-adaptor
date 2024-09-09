<div align="center">

<h1>🔌🌐 Query Fetch</h1>
<p><b>Powerful and flexible Fetch API Adaptor Library</b></p>

[![GitHub License](https://img.shields.io/github/license/gwansikk/query-fetch?labelColor=black&color=black)](https://github.com/gwansikk/query-fetch?tab=MIT-1-ov-file)
![Codacy grade](https://img.shields.io/codacy/grade/bf89208f2e9f4590832d09131dd207c2?logo=codacy&labelColor=black&color=black)

[English](https://github.com/gwansikk/query-fetch/blob/main/README.md)
&nbsp;&nbsp;•&nbsp;&nbsp;
[한국어](https://github.com/gwansikk/query-fetch/blob/main/README-ko_kr.md)

</div>

## What is Query Fetch?

Fetch API only provides basic functionality, often requiring developers to implement additional features themselves. For example, automatic retries on request failure, renewing authentication tokens, logging requests and responses, and canceling requests are not supported by the Fetch API and need to be manually added. Additionally, there's the hassle of repeatedly writing the same configurations.

To overcome these limitations, Query Fetch was developed. As the name suggests, it allows for simple, query-like usage that reduces the complexity of network communication logic. Use it declaratively, like making a simple query, to lessen the burden of handling network communication and focus on your core logic!

## Features

- **🧰 Extension of Fetch API**: Provides richer functionality than Fetch API. With features like Instance, Interceptor, and Effect, it minimizes complex configurations and enables flexible HTTP communication.
- **🧩 Support for Various Environments**: Designed for easy use in various environments. Query Fetch works seamlessly in specialized Fetch API environments like Next.js, React Native, and Tauri by simply being used as an adapter.
- **✨ Strong Type Safety**: Fully supports TypeScript and requires only the necessary types for precise type inference. This minimizes unnecessary types and ensures robust type safety.

## Packages

### @query-fetch/core &middot; [![npm version](https://img.shields.io/npm/v/@query-fetch/core?color=black&labelColor=black&logo=npm)](https://www.npmjs.com/package/@query-fetch/core) [![NPM Downloads](https://img.shields.io/npm/dt/%40query-fetch%2Fcore?labelColor=black&color=black)](https://www.npmjs.com/package/@query-fetch/core) [![npm bundle size](https://img.shields.io/bundlephobia/min/@query-fetch/core?color=black&labelColor=black)](https://bundlephobia.com/package/@query-fetch/core)

> Provides core features of Query Fetch.

- queryFetch
- createQueryFetch
- queryOptions
- migration utils for other fetch packages..

### @query-fetch/react-query &middot; [![npm version](https://img.shields.io/npm/v/@query-fetch/react-query?color=black&labelColor=black&logo=npm)](https://www.npmjs.com/package/@query-fetch/react-query) [![NPM Downloads](https://img.shields.io/npm/dt/%40query-fetch%2Freact-query?labelColor=black&color=black)](https://www.npmjs.com/package/@query-fetch/react-query) [![npm bundle size](https://img.shields.io/bundlephobia/min/@query-fetch/react-query?color=black&labelColor=black)](https://bundlephobia.com/package/@query-fetch/react-query)

> Provides features to easily use Query Fetch with React Query.

- queryFetchKey
- queryFetchFn

### @query-fetch/nextjs &middot; ![POC](https://img.shields.io/badge/POC-black)

> Provides features to easily use Query Fetch with NEXT.js.

### @query-fetch/react-native &middot; ![POC](https://img.shields.io/badge/POC-black)

> Provides features to easily use Query Fetch with React Native.

### @query-fetch/tauri &middot; ![POC](https://img.shields.io/badge/POC-black)

> Provides features to easily use Query Fetch with Tauri.

## Official Documentation

Visit the [official documentation](https://query-fecth.offlegacy.org) for detailed information on installation, usage, and more.

## Contributing

We welcome contribution from everyone in the community. Read below for detailed contribution guide.

[CONTRIBUTING.md](https://github.com/gwansikk/query-fetch/blob/main/CONTREIBUTING.md)

### Contributors

[![contributors](https://contrib.rocks/image?repo=gwansikk/query-fetch)](https://github.com/gwansikk/query-fetch/contributors)

## License

See [LICENSE](https://github.com/gwansikk/query-fetch/blob/main/LICENSE) for more information.

MIT © [gwansikk](https://github.com/gwansikk)
