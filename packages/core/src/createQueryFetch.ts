import { queryFetch } from './queryFetch';
import type {
  TInterceptor,
  TRequestInterceptor,
  TRequestOptions,
  TFetchOptions,
  TFetchOptionsWithMethod,
} from './types';

export interface CreateQueryFetch {
  setHeaders: (newHeaders: HeadersInit) => void;
  setRequestInterceptor: (interceptor: TRequestInterceptor) => void;
  setResponseInterceptor: (interceptor: TInterceptor<Response>) => void;
  setErrorInterceptor: (interceptor: TInterceptor<Response>) => void;
  request: <TData, TBodyData>(options: TFetchOptionsWithMethod<TBodyData>) => Promise<TData>;
  get: <TData, TBodyData = never>(options: TFetchOptions<TBodyData>) => Promise<TData>;
  post: <TData, TBodyData = TData>(options: TFetchOptions<TBodyData>) => Promise<TData>;
  patch: <TData, TBodyData = TData>(options: TFetchOptions<TBodyData>) => Promise<TData>;
  put: <TData, TBodyData = TData>(options: TFetchOptions<TBodyData>) => Promise<TData>;
  delete: <TData, TBodyData = TData>(options: TFetchOptions<TBodyData>) => Promise<TData>;
}

export interface CreateQueryFetchOptions {
  baseURL: string;
  headers?: HeadersInit;
  options?: TRequestOptions;
  interceptors?: {
    request?: TRequestInterceptor;
    response?: TInterceptor;
    error?: TInterceptor;
  };
}

/**
 * Creates a QueryFetch instance
 *
 * @see {@link https://query-fetch.gwansik.dev/create-query-fetch}
 */
export function createQueryFetch(
  createQueryFetchOptions: CreateQueryFetchOptions
): CreateQueryFetch {
  const _baseURL: URL = new URL(createQueryFetchOptions.baseURL);
  const _options = createQueryFetchOptions.options ?? {};
  const _interceptors = createQueryFetchOptions.interceptors ?? {};
  let _headers = createQueryFetchOptions.headers ?? {};

  async function _fetchFn<TData>(path: string, request: TRequestOptions): Promise<TData> {
    const url: URL = new URL(path, _baseURL);
    request.headers = Object.assign(_headers, request.headers);

    if (_interceptors.request) {
      const newRequest = await Promise.resolve(_interceptors.request(request));
      request = Object.assign(request, newRequest);
    }

    const response = await fetch(url, Object.assign(_options, request));

    if (response.status >= 400) {
      if (_interceptors.error) {
        const errorResponse = await Promise.resolve(_interceptors.error(response, request));
        return await errorResponse.json();
      }
    }

    if (_interceptors.response) {
      const newResponse = await Promise.resolve(_interceptors.response(response, request));
      return await newResponse.json();
    }

    return await response.json();
  }

  async function request<TData, TBodyData>({
    options,
    ...rest
  }: TFetchOptionsWithMethod<TBodyData>): Promise<TData> {
    return await queryFetch.request(
      Object.assign(Object.assign(_headers, options), rest),
      _fetchFn<TData>
    );
  }

  function setHeaders(newHeaders: HeadersInit) {
    _headers = Object.assign(_headers, newHeaders);
  }

  function setRequestInterceptor(interceptor: TRequestInterceptor) {
    _interceptors.request = interceptor;
  }

  function setResponseInterceptor(interceptor: TInterceptor) {
    _interceptors.response = interceptor;
  }

  function setErrorInterceptor(interceptor: TInterceptor) {
    _interceptors.error = interceptor;
  }

  function get<TData, TBodyData>(fetchOptions: TFetchOptions<TBodyData>): Promise<TData> {
    fetchOptions.options = Object.assign(_headers, fetchOptions.options);

    return queryFetch.get(fetchOptions, _fetchFn<TData>);
  }

  function post<TData, TBodyData>(fetchOptions: TFetchOptions<TBodyData>): Promise<TData> {
    fetchOptions.options = Object.assign(_headers, fetchOptions.options);

    return queryFetch.post(fetchOptions, _fetchFn<TData>);
  }

  function patch<TData, TBodyData>(fetchOptions: TFetchOptions<TBodyData>): Promise<TData> {
    fetchOptions.options = Object.assign(_headers, fetchOptions.options);

    return queryFetch.patch(fetchOptions, _fetchFn<TData>);
  }

  function put<TData, TBodyData>(fetchOptions: TFetchOptions<TBodyData>): Promise<TData> {
    fetchOptions.options = Object.assign(_headers, fetchOptions.options);

    return queryFetch.put(fetchOptions, _fetchFn<TData>);
  }

  function del<TData, TBodyData>(fetchOptions: TFetchOptions<TBodyData>): Promise<TData> {
    fetchOptions.options = Object.assign(_headers, fetchOptions.options);

    return queryFetch.delete(fetchOptions, _fetchFn<TData>);
  }

  return {
    setHeaders,
    setRequestInterceptor,
    setResponseInterceptor,
    setErrorInterceptor,
    request,
    get,
    post,
    patch,
    put,
    delete: del,
  };
}
