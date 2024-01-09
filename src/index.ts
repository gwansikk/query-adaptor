interface FetchOptions extends RequestInit {
  headers?: HeadersInit;
}

type Interceptor<T> = (input: T) => T;

export default class ServerChain {
  private baseURL: string;
  private headers: HeadersInit;
  private interceptors: {
    request: Interceptor<FetchOptions> | null;
    response: Interceptor<Response> | null;
  };

  constructor(baseURL: string = "") {
    this.baseURL = baseURL;
    this.headers = {};
    this.interceptors = {
      request: null,
      response: null,
    };
  }

  setHeaders(headers: HeadersInit): void {
    this.headers = { ...this.headers, ...headers };
  }

  private async fetch(url: string, options: FetchOptions): Promise<any> {
    // 기본 헤더와 사용자 정의 헤더 병합
    options.headers = { ...this.headers, ...options.headers };

    // 요청 인터셉터 실행
    if (this.interceptors.request) {
      options = this.interceptors.request(options);
    }

    const response = await fetch(`${this.baseURL}${url}`, options);

    // 응답 인터셉터 실행
    if (this.interceptors.response) {
      return this.interceptors.response(response);
    }

    return response.json();
  }

  get(url: string, options: FetchOptions = {}): Promise<any> {
    return this.fetch(url, { ...options, method: "GET" });
  }

  post(url: string, body: any, options: FetchOptions = {}): Promise<any> {
    return this.fetch(url, {
      ...options,
      body: JSON.stringify(body),
      method: "POST",
    });
  }

  setRequestInterceptor(interceptor: Interceptor<FetchOptions>): void {
    this.interceptors.request = interceptor;
  }

  setResponseInterceptor(interceptor: Interceptor<Response>): void {
    this.interceptors.response = interceptor;
  }
}
