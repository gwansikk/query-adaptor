export interface FetchOptions extends RequestInit {
  method: string;
  headers?: HeadersInit;
}

export interface HttpArgs {
  url: string;
  options?: FetchOptions;
}

export interface HttpBodyArgs<T = { [key: string]: unknown }> {
  url: string;
  body?: T;
  options?: FetchOptions;
}

export interface HttpBodyArgsWithMethod<T = { [key: string]: unknown }> extends HttpBodyArgs<T> {
  method: string;
}

export type ResponseData<R = { [key: string]: unknown }> = R;

export type Interceptor<T> = (input: T, method: string) => T | Promise<T>;

export interface ServerChainOptions {
  key: string;
  baseURL: string;
  debug?: boolean;
  headers?: HeadersInit;
  interceptors?: {
    request?: Interceptor<FetchOptions>;
    response?: Interceptor<Response>;
    error?: Interceptor<Response>;
  };
}
