export type THTTPMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export type TEndpoint = Array<string | number>;

export type TQueryParameter = Record<string, unknown>;

export type TDefaultBodyData = Record<string, unknown>;

export type TDefaultData = Record<string, unknown>;

export interface FetchOptions extends Omit<RequestInit, 'method'> {
  method?: THTTPMethod;
}

export interface FetchArgs<TBodyData = TDefaultBodyData> {
  endpoint: TEndpoint;
  queryParameter?: TQueryParameter;
  options?: FetchOptions;
  body?: TBodyData;
}

export interface HttpArgsWithHTTPMethod<TBodyData> extends FetchArgs<TBodyData> {
  method: THTTPMethod;
}

export type TResponseData<TData = TDefaultData> = TData;

export type TInterceptor<TResponse = Response> = (
  fetchOptions: TResponse,
  method?: string
) => TResponse | Promise<TResponse>;

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
    request?: TInterceptor<FetchOptions>;
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
  setRequestInterceptor: (interceptor: TInterceptor<FetchOptions>) => void;
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
  get: <TData>(args: FetchArgs<TData>) => Promise<TResponseData<TData>>;
  /**
   * Sends a POST request to the endpoint.
   */
  post: <TData, TBodyData = TData>(args: FetchArgs<TBodyData>) => Promise<TResponseData<TData>>;
  /**
   * Sends a PATCH request to the endpoint.
   */
  patch: <TData, TBodyData = TData>(args: FetchArgs<TBodyData>) => Promise<TResponseData<TData>>;
  /**
   * Sends a PUT request to the endpoint.
   */
  put: <TData, TBodyData = TData>(args: FetchArgs<TBodyData>) => Promise<TResponseData<TData>>;
  /**
   * Sends a DELETE request to the endpoint.
   */
  delete: <TData, TBodyData = TData>(args: FetchArgs<TBodyData>) => Promise<TResponseData<TData>>;
}
