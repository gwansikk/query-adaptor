export type HTTPMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export type Endpoint = Array<string | number>;

export type QueryParameter = Record<string, unknown>;

export interface FetchOptions extends Omit<RequestInit, 'method'> {
  method?: HTTPMethod;
}

export interface FetchArgs<T = Record<string, unknown>> {
  endpoint: Endpoint;
  queryParameter?: QueryParameter;
  options?: FetchOptions;
  body?: T;
}

export interface HttpArgsWithHTTPMethod<T> extends FetchArgs<T> {
  method: HTTPMethod;
}

export type ResponseData<R = Record<string, unknown>> = R;

export type Interceptor<T = Response> = (fetchOptions: T, method?: string) => T | Promise<T>;

export interface QueryFetchOptions {
  /**
   * The base URL to use for instance.
   */
  baseURL: string;
  /**
   * The headers to use for instance.
   */
  headers?: HeadersInit;
  /**
   * The options to use for instance.
   */
  options?: FetchOptions;
  /**
   * The interceptors to use for instance.
   */
  interceptors?: {
    /**
     * The request interceptor to use for instance.
     */
    request?: Interceptor<FetchOptions>;
    /**
     * The response interceptor to use for instance.
     */
    response?: Interceptor;
    /**
     * The error interceptor to use for instance.
     */
    error?: Interceptor;
  };
}

/**
 * Represents the QueryFetch interface.
 * This interface defines the methods and properties available in the QueryFetch.
 */
export interface QueryFetch {
  /**
   * Sets the headers for instance.
   */
  setHeaders: (newHeaders: HeadersInit) => void;
  /**
   * Sets the request interceptor for instance.
   */
  setRequestInterceptor: (interceptor: Interceptor<FetchOptions>) => void;
  /**
   * Sets the response interceptor for instance.
   */
  setResponseInterceptor: (interceptor: Interceptor<Response>) => void;
  /**
   * Sets the error interceptor for instance.
   */
  setErrorInterceptor: (interceptor: Interceptor<Response>) => void;
  /**
   * Sends a GET request to the specified URL.
   */
  get: <R>(args: FetchArgs) => Promise<ResponseData<R>>;
  /**
   * Sends a POST request to the specified URL.
   */
  post: <R, D = unknown>(args: FetchArgs<D>) => Promise<ResponseData<R>>;
  /**
   * Sends a PATCH request to the specified URL.
   */
  patch: <R, D = unknown>(args: FetchArgs<D>) => Promise<ResponseData<R>>;
  /**
   * Sends a PUT request to the specified URL.
   */
  put: <R, D = unknown>(args: FetchArgs<D>) => Promise<ResponseData<R>>;
  /**
   * Sends a DELETE request to the specified URL.
   */
  delete: <R, D = unknown>(args: FetchArgs<D>) => Promise<ResponseData<R>>;
}
