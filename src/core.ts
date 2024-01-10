import { FetchOptions, GetArgs, Interceptor, PostArgs } from "./types";
import { logging } from "./utils";

export default class ServerChain {
  private baseURL: string;
  private headers: HeadersInit;
  private interceptors: {
    request: Interceptor<FetchOptions> | null;
    response: Interceptor<Response> | null;
    error: Interceptor<Response> | null;
  };

  constructor(baseURL: string) {
    this.baseURL = baseURL;
    this.headers = {};
    this.interceptors = {
      request: null,
      response: null,
      error: null,
    };
  }

  setHeaders(headers: HeadersInit): void {
    this.headers = { ...this.headers, ...headers };
  }

  setRequestInterceptor(interceptor: Interceptor<FetchOptions>): void {
    this.interceptors.request = interceptor;
  }

  setResponseInterceptor(interceptor: Interceptor<Response>): void {
    this.interceptors.response = interceptor;
  }

  setErrorInterceptor(interceptor: Interceptor<Response>): void {
    this.interceptors.error = interceptor;
  }

  private async fetch(url: string, options: FetchOptions): Promise<any> {
    options.headers = { ...this.headers, ...options.headers };

    if (this.interceptors.request) {
      options = this.interceptors.request(options);
    }

    const endpoint = [this.baseURL, url].join("/");
    const response = await fetch(endpoint, options);

    if (this.interceptors.error && response.status >= 400) {
      return logging(this.interceptors.error(response)?.json());
    }

    if (this.interceptors.response) {
      return logging(this.interceptors.response(response)?.json());
    }

    return response.json();
  }

  get({ url, options = {} }: GetArgs): Promise<any> {
    return this.fetch(url, { ...options, method: "GET" });
  }

  post({ url, body, options = {} }: PostArgs): Promise<any> {
    return this.fetch(url, {
      ...options,
      body: JSON.stringify(body),
      method: "POST",
    });
  }
}
