export type THTTPMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export type TEndpoint = Array<string | number> | string;

export type TQueryParameter = Record<string, unknown>;

export type TDefaultBodyData = Record<string, unknown>;

export type TDefaultData = Record<string, unknown>;

export interface RequestOptions extends Omit<RequestInit, 'method'> {
  method?: THTTPMethod;
}

export interface FetchOptions<TBodyData = TDefaultBodyData> {
  endpoint: TEndpoint;
  queryParameter?: TQueryParameter;
  options?: RequestOptions;
  body?: TBodyData;
}

export interface FetchOptionsWithMethod<TBodyData> extends FetchOptions<TBodyData> {
  method: THTTPMethod;
}

export type TResponseData<TData = TDefaultData> = TData;

export type TInterceptor<TResponse = Response, TRequest = RequestOptions> = (
  response: TResponse,
  request: TRequest
) => TResponse | Promise<TResponse>;

export type TRequestInterceptor = (
  TRequest: RequestOptions
) => RequestOptions | Promise<RequestOptions>;

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
  options?: RequestOptions;
  /**
   * The interceptors to use for instance.
   */
  interceptors?: {
    /**
     * The request interceptor to use for instance.
     */
    request?: TRequestInterceptor;
    /**
     * The response interceptor to use for instance.
     */
    response?: TInterceptor;
    /**
     * The error interceptor to use for instance.
     */
    error?: TInterceptor;
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
  setRequestInterceptor: (interceptor: TRequestInterceptor) => void;
  /**
   * Sets the response interceptor for instance.
   */
  setResponseInterceptor: (interceptor: TInterceptor<Response>) => void;
  /**
   * Sets the error interceptor for instance.
   */
  setErrorInterceptor: (interceptor: TInterceptor<Response>) => void;
  /**
   * Sends a GET request to the endpoint.
   */
  get: <TData>(options: FetchOptions<TData>) => Promise<TResponseData<TData>>;
  /**
   * Sends a POST request to the endpoint.
   */
  post: <TData, TBodyData = TData>(
    options: FetchOptions<TBodyData>
  ) => Promise<TResponseData<TData>>;
  /**
   * Sends a PATCH request to the endpoint.
   */
  patch: <TData, TBodyData = TData>(
    options: FetchOptions<TBodyData>
  ) => Promise<TResponseData<TData>>;
  /**
   * Sends a PUT request to the endpoint.
   */
  put: <TData, TBodyData = TData>(
    options: FetchOptions<TBodyData>
  ) => Promise<TResponseData<TData>>;
  /**
   * Sends a DELETE request to the endpoint.
   */
  delete: <TData, TBodyData = TData>(
    options: FetchOptions<TBodyData>
  ) => Promise<TResponseData<TData>>;
}
