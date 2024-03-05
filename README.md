<div align="center">

<h1>⛓️ server-chain</h1>
<p><b>A Simple, Lightweight and Easy-to-Use Extension Library for Fetch API.</b></p>

[![Codacy Badge](https://api.codacy.com/project/badge/Grade/1e35f0a5aab44c849722b9eb6830b7e7)](https://app.codacy.com/gh/gwansikk/server-chain?utm_source=github.com&utm_medium=referral&utm_content=gwansikk/server-chain&utm_campaign=Badge_Grade)
[![npm version](https://img.shields.io/npm/v/@gwansikk/server-chain?logo=npm)](https://www.npmjs.com/package/@gwansikk/server-chain)
[![npm downloads](https://img.shields.io/npm/dt/@gwansikk/server-chain?logo=npm)](https://www.npmjs.com/package/@gwansikk/server-chain)
[![npm bundle size](https://img.shields.io/bundlephobia/min/@gwansikk/server-chain?logo=npm)](https://www.npmjs.com/package/@gwansikk/server-chain)

[English](./README.md)
&nbsp;&nbsp;•&nbsp;&nbsp;
[한국어](./README-ko_kr.md)

</div>

## Installation

- NPM

```bash
npm i @gwansikk/server-chain
```

- Yarn

```bash
yarn add @gwansikk/server-chain
```

# Usage

## Instance

```js
const server = ServerChain({
  key: 'INSTANCE',
  baseURL: 'https://jsonplaceholder.typicode.com',
});

server.get({ url: 'posts/1' }).then(data => console.log(data));
```

## Interceptor

```js
const server = ServerChain({
  key: 'INTERCEPTOR',
  baseURL: 'https://jsonplaceholder.typicode.com',
  interceptors: {
    request: request => {
      console.log('** request interceptor **');
      // You need to modify the request and return the modified request.
      // For example, you can add a specific header to the request or modify the URL.
      request.headers = {
        ...request.headers,
        Authorization: 'Bearer YOUR_ACCESS_TOKEN',
      };
      return request;
    },
    response: response => {
      console.log('** response interceptor **');
      // You need to modify the response and return the modified response.
      return response;
    },
    error: response => {
      console.log('** error interceptor **');
      // You need to modify the error response and return the modified response.
      return response;
    },
  },
});
```

# Roadmap

The list below is a roadmap to get to version 1.0.

- [x] Automatic JSON Conversion
- [x] Instance Creation
- [x] Global Settings
- [x] Request and Response Interceptors
- [ ] Error Status Handling
- [ ] Request Cancellation
- [ ] Progress Bar/Loading Indicator

## Contributing

Information describing how to contribute can be found in the file.  
[CONTRIBUTING.md](./CONTRIBUTING.md)
