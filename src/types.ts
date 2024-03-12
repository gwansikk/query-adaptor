type MethodType = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export interface FetchOptions extends RequestInit {
  method: MethodType;
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
  method: MethodType;
}

export type ResponseData<R = { [key: string]: unknown }> = R;

export type Interceptor<T> = (input: T, method: string) => T | Promise<T>;

export interface ServerChainOptions {
  key: string;
  baseURL: string;
  debug?: boolean;
  headers?: HeadersInit;
  options: FetchOptions;
  interceptors?: {
    request?: Interceptor<FetchOptions>;
    response?: Interceptor<Response>;
    error?: Interceptor<Response>;
  };
}

export interface ServerChainType {
  setHeaders: (newHeaders: HeadersInit) => void;
  setRequestInterceptor: (interceptor: Interceptor<FetchOptions>) => void;
  setResponseInterceptor: (interceptor: Interceptor<Response>) => void;
  setErrorInterceptor: (interceptor: Interceptor<Response>) => void;
  get: <R>(args: HttpArgs) => Promise<ResponseData<R>>;
  post: <T, R>(args: HttpBodyArgs<T>) => Promise<ResponseData<R>>;
  patch: <T, R>(args: HttpBodyArgs<T>) => Promise<ResponseData<R>>;
  put: <T, R>(args: HttpBodyArgs<T>) => Promise<ResponseData<R>>;
  del: <T, R>(args: HttpBodyArgs<T>) => Promise<ResponseData<R>>;
}
