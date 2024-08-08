<div align="center">

<h1>🔗 Query Fetch</h1>
<p><b>사용하기 쉽고 가벼운 Fetch API용 확장 라이브러리입니다.</b></p>

[![npm version](https://img.shields.io/npm/v/@gwansikk/query-fetch?color=000&labelColor=000&logo=npm)](https://www.npmjs.com/package/@gwansikk/query-fetch)
[![npm downloads](https://img.shields.io/npm/dt/@gwansikk/query-fetch?color=000&labelColor=000)](https://www.npmjs.com/package/@gwansikk/query-fetch)
[![npm bundle size](https://img.shields.io/bundlephobia/min/@gwansikk/query-fetch?color=000&labelColor=000)](https://www.npmjs.com/package/@gwansikk/query-fetch)

[English](https://github.com/gwansikk/query-fetch/blob/main/README.md)
&nbsp;&nbsp;•&nbsp;&nbsp;
[한국어](https://github.com/gwansikk/query-fetch/blob/main/README-ko_kr.md)

</div>

## Query Fetch란?

Fetch API는 필요한 기능을 제공하지 않거나, 직접 구현해야 하는 경우가 많아요. 실패 시 재요청이나 인증 토큰 갱신, 요청 및 응답 로깅, 요청 취소 등을 직접 구현해야해요. 또한, 요청을 보낼 때마다 같은 설정을 반복해야 하는 경우가 많아요.

더하여 Promise 객체를 잘 다루기는 정말 어려워요. 비동기 처리를 위해 Promise를 사용하다 보면, 복잡한 구조가 생기거나 에러 처리가 까다로워질 수 있어요. 특히 여러 개의 비동기 요청을 순차적으로 처리하거나 병렬로 처리하는 과정에서 코드의 가독성과 유지보수성이 떨어지죠.

이러한 문제를 해결하기 위해 Query Fetch가 만들어졌어요. 네트워크 통신에 대한 부담을 덜고, 핵심 로직에 집중하세요!

## 기능

- **인스턴스 기능**: Query Fetch는 다수의 인스턴스를 생성하여 사용할 수 있어요. 이를 통해 각각의 인스턴스마다 다른 설정을 적용할 수 있으며, 다양한 API 엔드포인트나 서비스와의 통합을 쉽게 관리할 수 있어요.
- **자동 재시도**: 네트워크 오류나 서버 문제로 인해 요청이 실패했을 때, 자동으로 재시도할 수 있는 기능을 제공해요.
- **요청 취소**: 사용자가 필요하지 않은 요청을 취소할 수 있는 기능을 제공해요.
- **인증 토큰 관리**: 인증 토큰이 만료되었을 때 자동으로 갱신하여 요청을 재시도 할 수 있어요.
- **타입 세이프**: TypeScript를 100% 지원하며, 정확한 타입추론으로 불필요한 타입을 최소화 해요.

## 설치

Query Fetch는 npm에 배포되어 있습니다. 아래 명령어를 통해 설치할 수 있어요.

```bash
npm i @gwansikk/query-fetch
```

```bash
pnpm add @gwansikk/query-fetch
```

```bash
yarn add @gwansikk/query-fetch
```

## 사용 방법

> [!IMPORTANT]\
> Query Fetch는 현재 개발중인 패키지에요. 제공되는 API는 언제든지 변경될 수 있어요.

### Instance

```typescript
const queryFetch = createQueryFetch({
  baseURL: 'https://jsonplaceholder.typicode.com',
});

queryFetch.get({ endpoint: ['posts', 1] }).then((data) => console.log(data));
```

### Interceptor

```typescript
const queryFetch = createQueryFetch({
  baseURL: 'https://jsonplaceholder.typicode.com',
  interceptors: {
    request: (request) => {
      console.log('** request interceptor **');
      // 요청을 수정하고 수정된 요청을 반환해야 합니다.
      // 예를 들어, 요청에 특정 헤더를 추가하거나 URL을 수정할 수 있습니다.
      request.headers = {
        ...request.headers,
        Authorization: 'Bearer YOUR_ACCESS_TOKEN',
      };
      return request;
    },
    response: (response) => {
      console.log('** response interceptor **');
      // 응답을 수정하고 수정된 응답을 반환해야 합니다.
      return response;
    },
    error: (response) => {
      console.log('** error interceptor **');
      // 에러 응답을 수정하고 수정된 응답을 반환해야 합니다.
      return response;
    },
  },
});

queryFetch.get({ endpoint: ['posts', 1] }).then((data) => console.log(data));
```

## Roadmap

정식 출시(v1.0.0)를 위한 로드맵입니다.

- [x] 자동 JSON 변환
- [x] 인스턴스 생성
- [x] 요청 및 응답 인터셉터
- [x] 쿼리 파라미터
- [ ] 자동 재시도
- [ ] 오류 상태 처리
- [ ] 요청 취소
- [ ] 인증 토큰 관리

## 기여하기

해당 프로젝트에 기여하고 싶다면 아래 문서를 참고해주세요.

[CONTRIBUTING.md](https://github.com/gwansikk/query-fetch/blob/main/CONTREIBUTING.md)

## 라이선스

자세한 사항은 [LICENSE](https://github.com/gwansikk/query-fetch/blob/main/LICENSE)를 참고해주세요.

MIT © [gwansikk](https://github.com/gwansikk)
