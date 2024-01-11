export interface FetchOptions extends RequestInit {
  headers?: HeadersInit;
}

export interface HttpArgs {
  url: string;
  options?: FetchOptions;
}

export interface HttpBodyArgs {
  url: string;
  body?: { [key: string]: unknown };
  options?: FetchOptions;
}

export type ResponseData = { [key: string]: unknown };

export type Interceptor<T> = (input: T) => T;

export interface ServerChainOptions {
  key: string;
  baseURL: string;
  debug?: boolean;
  headers?: HeadersInit;
  interceptors?: {
    request: Interceptor<FetchOptions> | null;
    response: Interceptor<Response> | null;
    error: Interceptor<Response> | null;
  };
}
