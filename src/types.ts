export interface FetchOptions extends RequestInit {
  headers?: HeadersInit;
}

export interface GetArgs {
  url: string;
  options?: FetchOptions;
}

export interface PostArgs {
  url: string;
  body: { [key: string]: unknown };
  options?: FetchOptions;
}

export type Interceptor<T> = (input: T) => T;
