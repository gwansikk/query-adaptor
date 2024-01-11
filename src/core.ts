import { FetchOptions, GetArgs, Interceptor, PostArgs, ServerChainArgs } from './types';
import { createBaseURL, formatPath, log } from './utils';

export class ServerChain {
  private baseURL: string;
  private headers: HeadersInit;
  private interceptors: {
    request: Interceptor<FetchOptions> | null;
    response: Interceptor<Response> | null;
    error: Interceptor<Response> | null;
  };
  private debug: boolean;

  constructor({
    baseURL,
    headers = {},
    interceptors = {
      request: null,
      response: null,
      error: null,
    },
    debug = false,
  }: ServerChainArgs) {
    this.baseURL = createBaseURL(baseURL);
    this.headers = headers;
    this.interceptors = interceptors;
    this.debug = debug;
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
    url = formatPath(url);

    if (this.interceptors.request) {
      options = this.interceptors.request(options);
    }

    try {
      const response = await fetch(`${this.baseURL}/${url}`, options);

      if (response.status >= 400) {
        if (this.debug) {
          log('debug', `Error ${response.status}`);
        } else if (this.interceptors.error) {
          return (
            this.interceptors.error(response)?.json() ||
            log('interceptor', 'Error intercepted; must return')
          );
        }
      }

      if (this.interceptors.response) {
        return (
          this.interceptors.response(response)?.json() ||
          log('interceptor', 'Response intercepted; must return')
        );
      }

      return response.json();
    } catch (error) {
      throw error;
    }
  }

  async request({
    method,
    url,
    body,
    options,
  }: {
    method: string;
    url: string;
    body?: { [key: string]: unknown };
    options?: FetchOptions;
  }): Promise<any> {
    const fetchOptions: FetchOptions = {
      ...options,
      method,
      headers: { ...this.headers, ...options?.headers },
      body: body ? JSON.stringify(body) : null,
    };

    return this.fetch(url, fetchOptions);
  }

  post({ url, body, options }: PostArgs): Promise<any> {
    return this.request({
      method: 'POST',
      url,
      body,
      options,
    });
  }

  get({ url, options }: GetArgs): Promise<any> {
    return this.request({
      method: 'GET',
      url,
      options,
    });
  }

  put({ url, body, options }: PostArgs): Promise<any> {
    return this.request({ method: 'PUT', url, body, options });
  }

  delete({ url, body, options }: PostArgs): Promise<any> {
    return this.request({ method: 'DELETE', url, body, options });
  }
}
