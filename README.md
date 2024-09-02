<div align="center">

<h1>🔗 Query Fetch</h1>
<p><b>Powerful and flexible Fetch API Extension Library</b></p>

[![GitHub License](https://img.shields.io/github/license/gwansikk/query-fetch?labelColor=black&color=black)](https://github.com/gwansikk/query-fetch?tab=MIT-1-ov-file)
![Codacy grade](https://img.shields.io/codacy/grade/bf89208f2e9f4590832d09131dd207c2?logo=codacy&labelColor=black&color=black)

[English](https://github.com/gwansikk/query-fetch/blob/main/README.md)
&nbsp;&nbsp;•&nbsp;&nbsp;
[한국어](https://github.com/gwansikk/query-fetch/blob/main/README-ko_kr.md)

</div>

## What is Query Fetch?

The traditional Fetch API provides only basic functionalities, which often requires developers to implement additional features themselves. For example, functionalities such as automatic retry on request failure, authentication token renewal, request and response logging, and request cancellation are not natively supported by the Fetch API. Therefore, these features had to be manually added by the developers. Additionally, there is the inconvenience of having to repeatedly write the same configuration.

To overcome these limitations, we developed Query Fetch. As the name suggests, it allows you to make network requests as easily as making a query, thereby reducing the complexity of network communication. By using a declarative approach, similar to querying, you can alleviate the burden of handling network communication and focus on your core logic!

## Features

- **Extension of the Fetch API**: Query Fetch offers more advanced features compared to the traditional Fetch API. With functionalities like Instance, Interceptor, and Effect, you can minimize complex configurations and implement flexible HTTP communication.
- **Support for Various Environments**: Designed to be easily used in various environments, Query Fetch can function perfectly even in specialized Fetch API environments like Next.js, React Native, Tauri by acting as a simple adapter.
- **Strong Type Safety**: Query Fetch fully supports TypeScript, requiring only the necessary types with accurate type inference. This minimizes unnecessary types and strongly guarantees type safety.

## Packages

### @query-fetch/core &middot; [![npm version](https://img.shields.io/npm/v/@query-fetch/core?color=black&labelColor=black&logo=npm)](https://www.npmjs.com/package/@query-fetch/core) [![NPM Downloads](https://img.shields.io/npm/dm/%40query-fetch%2Fcore?labelColor=black&color=black)](https://www.npmjs.com/package/@query-fetch/core) [![npm bundle size](https://img.shields.io/bundlephobia/min/@query-fetch/core?color=black&labelColor=black)](https://bundlephobia.com/package/@query-fetch/core)

> Provides core features of Query Fetch.

- queryFetch
- createQueryFetch
- queryOptions
- migration utils for Axios, Fetch API

### @query-fetch/react-query &middot; [![npm version](https://img.shields.io/npm/v/@query-fetch/react-query?color=black&labelColor=black&logo=npm)](https://www.npmjs.com/package/@query-fetch/react-query) [![NPM Downloads](https://img.shields.io/npm/dm/%40query-fetch%2Freact-query?labelColor=black&color=black)](https://www.npmjs.com/package/@query-fetch/react-query) [![npm bundle size](https://img.shields.io/bundlephobia/min/@query-fetch/react-query?color=black&labelColor=black)](https://bundlephobia.com/package/@query-fetch/react-query)

> Provides features to easily use Query Fetch with React Query.

- queryFetchKey
- queryFetchFn

### @query-fetch/nextjs &middot; ![POC](https://img.shields.io/badge/POC-black)

> Provides features to easily use Query Fetch with Next.js.

### @query-fetch/tauri &middot; ![POC](https://img.shields.io/badge/POC-black)

> Provides features to easily use Query Fetch with tauri.

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
