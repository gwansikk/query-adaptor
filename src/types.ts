type MethodType = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export interface FetchOptions extends Omit<RequestInit, 'method'> {
  method?: MethodType;
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

export interface HttpBodyArgsWithMethod<T> extends HttpBodyArgs<T> {
  method: MethodType;
}

export type ResponseData<R = { [key: string]: unknown }> = R;

export type Interceptor<T> = (fetchOptions: T, method?: string) => T | Promise<T>;

export interface ChainOptions {
  /**
   * The API key to use for instance.
   */
  key: string;
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
    response?: Interceptor<Response>;
    /**
     * The error interceptor to use for instance.
     */
    error?: Interceptor<Response>;
  };
}

/**
 * Represents the ChainType interface.
 * This interface defines the methods and properties available in the ChainType.
 */
export interface ChainType {
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
  get: <R>(args: HttpArgs) => Promise<ResponseData<R>>;
  /**
   * Sends a POST request to the specified URL.
   */
  post: <T, R extends T>(args: HttpBodyArgs<T>) => Promise<ResponseData<R>>;
  /**
   * Sends a PATCH request to the specified URL.
   */
  patch: <T, R extends T>(args: HttpBodyArgs<T>) => Promise<ResponseData<R>>;
  /**
   * Sends a PUT request to the specified URL.
   */
  put: <T, R extends T>(args: HttpBodyArgs<T>) => Promise<ResponseData<R>>;
  /**
   * Sends a DELETE request to the specified URL.
   */
  delete: <T, R extends T>(args: HttpBodyArgs<T>) => Promise<ResponseData<R>>;
}
