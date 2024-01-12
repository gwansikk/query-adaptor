<div align="center">

<h1>⛓️ server-chain</h1>
<p><b>사용하기 쉽고 가벼운 Fetch API용 확장 라이브러리입니다.</b></p>

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
      // 요청을 수정하고 수정된 요청을 반환해야 합니다.
      // 예를 들어, 요청에 특정 헤더를 추가하거나 URL을 수정할 수 있습니다.
      request.headers = {
        ...request.headers,
        Authorization: 'Bearer YOUR_ACCESS_TOKEN',
      };
      return request;
    },
    response: response => {
      console.log('** response interceptor **');
      // 응답을 수정하고 수정된 응답을 반환해야 합니다.
      return response;
    },
    error: response => {
      console.log('** error interceptor **');
      // 에러 응답을 수정하고 수정된 응답을 반환해야 합니다.
      return response;
    },
  },
});
```

# Roadmap

The list below is a roadmap to get to version 1.0.

- [x] 자동 JSON 변환
- [x] 인스턴스 생성
- [x] 전역 설정
- [x] 요청 및 응답 인터셉터
- [ ] 오류 상태 처리
- [ ] 요청 취소
- [ ] 진행 상태 / 로딩 인디케이터

## Contributing

해당 프로젝트에 기여하고 싶다면 아래 문서를 참고해주세요.  
[CONTRIBUTING.md](./CONTRIBUTING.md)
