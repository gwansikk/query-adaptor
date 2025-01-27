![header](https://github.com/user-attachments/assets/197bbe65-1799-49c0-84f4-aba32ba17509)

<div align="center">

<p><b>어디서나 사용할 수 있는 강력한 HTTP 클라이언트를 만들어보세요</b></p>

![GitHub License](https://img.shields.io/github/license/gwansikk/query-adaptor?labelColor=black&color=black)
![Codacy grade](https://img.shields.io/codacy/grade/bf89208f2e9f4590832d09131dd207c2?logo=codacy&labelColor=black&color=black)

[English](https://github.com/gwansikk/query-adaptor/blob/main/README.md)
&nbsp;&nbsp;•&nbsp;&nbsp;
[한국어](https://github.com/gwansikk/query-adaptor/blob/main/README-ko_kr.md)

</div>

## Query Adaptor란?

Fetch API는 기본적인 기능만 제공하기 때문에 개발자가 필요한 기능을 직접 구현해야 하는 경우가 많아요. 예를 들어 요청 실패 시 자동 재요청, 인증 토큰 갱신, 요청 및 응답 로깅, 요청 취소와 같은 기능은 Fetch API 자체에서는 지원하지 않기 때문에 수동으로 추가해야 했어요. 또한, 동일한 설정을 반복적으로 작성해야 하는 번거로움도 존재해요.

이러한 한계점을 극복하기 위해 개발한 것이 바로 Query Adaptor예요. 이름 그대로 간단하게 질의하듯이 사용할 수 있어 네트워크 통신 로직에 대한 복잡성을 줄여줘요. 간단하게 질의하듯이 선언적으로 사용하여 네트워크 통신에 대한 부담을 덜고, 핵심 로직에 집중하세요!

## 주요 기능

- **🧰 Fetch API의 확장**: Fetch API에서 더 풍부한 기능을 제공해요. Instance, Interceptor, Effect 등의 기능을 통해 복잡한 설정을 최소화하고 유연한 HTTP 통신을 구현할 수 있어요.
- **🧩 다양한 환경 지원**: 다양한 환경에서 손쉽게 사용할 수 있도록 설계되었어요. Query Adaptor를 단순히 어댑터처럼 활용하여, Next.js, React Native, Tauri와 같이 특수한 Fetch API 환경에서도 완벽히 동작해요.
- **✨ 강력한 타입 세이프**: TypeScript를 100% 지원하며, 정확한 타입추론을 위해 필요한 타입만을 요구해요. 덕분에 불필요한 타입을 최소화하고 강력하게 타입 안정성을 보장해요.

## 패키지

### query-adaptor &middot; [![npm version](https://img.shields.io/npm/v/query-adaptor?color=000&labelColor=000&logo=npm)](https://www.npmjs.com/package/query-adaptor) [![npm bundle size](https://img.shields.io/bundlephobia/min/query-adaptor?color=000&labelColor=000)](https://www.npmjs.com/package/query-adaptor)

> Query Adaptor의 핵심 기능을 제공해요.

- query
- createQueryAdaptor
- fetchOptions

<!-- ### @query-adaptor/react &middot; [![npm version](https://img.shields.io/npm/v/@query-adaptor/react?color=000&labelColor=000&logo=npm)](https://www.npmjs.com/package/@query-adaptor/react) [![npm bundle size](https://img.shields.io/bundlephobia/min/@query-adaptor/react?color=000&labelColor=000)](https://www.npmjs.com/package/@query-adaptor/react)

> Query Adaptor를 React 환경에서 쉽게 사용할 수 있도록 도와주는 기능을 제공해요.

- QueryAdaptorProvider
- Query
- Suspense Options -->

### @query-adaptor/react-query &middot; [![npm version](https://img.shields.io/npm/v/@query-adaptor/react-query?color=000&labelColor=000&logo=npm)](https://www.npmjs.com/package/@query-adaptor/react-query) [![npm bundle size](https://img.shields.io/bundlephobia/min/@query-adaptor/react-query?color=000&labelColor=000)](https://www.npmjs.com/package/@query-adaptor/react-query)

> Query Adaptor를 React Query와 쉽게 사용할 수 있도록 도와주는 기능을 제공해요.

- queryFetchFn
- queryFetchKey

## 공식 문서

[공식 문서](https://query-adaptor.gwansik.dev)에 방문하시면 설치, 사용 방법 등 더 자세한 정보를 확인할 수 있어요.

## 기여하기

해당 프로젝트에 기여하고 싶다면 아래 문서를 참고해주세요.

[CONTRIBUTING.md](https://github.com/gwansikk/query-adaptor/blob/main/CONTRIBUTING.md)

### 기여자

[![contributors](https://contrib.rocks/image?repo=gwansikk/query-adaptor)](https://github.com/gwansikk/query-adaptor/contributors)

## 라이선스

자세한 사항은 [LICENSE](https://github.com/gwansikk/query-adaptor/blob/main/LICENSE)를 참고해주세요.

MIT © [gwansikk](https://github.com/gwansikk)
