import { query } from './query';
import type { FetchOptions, FetchOptionsWithMethod } from './fetchOptions';
import type {
  TErrorInterceptor,
  TInterceptor,
  TRequestInterceptor,
  TRequestOptions,
} from './types';
import { formatPath } from './utils';
import { createRequestOptions } from './utils/createRequestOptions';

export interface CreateQueryAdaptor {
  setRequestInterceptor: (interceptor: TRequestInterceptor) => void;
  setResponseInterceptor: (interceptor: TInterceptor<Response>) => void;
  setErrorInterceptor: (interceptor: TErrorInterceptor) => void;
  request: <TData, TBody>(options: FetchOptionsWithMethod<TBody>) => Promise<TData>;
  get: <TData, TBody = never>(options: FetchOptions<TBody>) => Promise<TData>;
  post: <TData, TBody = TData>(options: FetchOptions<TBody>) => Promise<TData>;
  patch: <TData, TBody = TData>(options: FetchOptions<TBody>) => Promise<TData>;
  put: <TData, TBody = TData>(options: FetchOptions<TBody>) => Promise<TData>;
  delete: <TData, TBody = TData>(options: FetchOptions<TBody>) => Promise<TData>;
}

export interface CreateQueryAdaptorOptions {
  baseURL: string;
  client?: (request: Request) => Promise<Response>;
  requestOptions?: TRequestOptions;
  interceptors?: {
    request?: TRequestInterceptor;
    response?: TInterceptor;
    error?: TErrorInterceptor;
  };
}

/**
 * Create a QueryAdaptor
 *
 * @see {@link https://query-adaptor.gwansik.dev/create-query-adaptor.html}
 */
export function createQueryAdaptor(
  createQueryFetchOptions: CreateQueryAdaptorOptions
): CreateQueryAdaptor {
  const _baseURL = createQueryFetchOptions.baseURL;
  const _interceptors = createQueryFetchOptions.interceptors ?? {};
  const _requestOptions = createQueryFetchOptions.requestOptions ?? {};
  const _client = createQueryFetchOptions.client ?? null;

  async function _fetchFn<TData, TBody>(
    fetchOptions: FetchOptionsWithMethod<TBody>
  ): Promise<TData> {
    const url = formatPath([_baseURL, ...fetchOptions.endpoint]);
    let options = createRequestOptions(Object.assign(_requestOptions, fetchOptions));

    if (_interceptors.request) {
      const newRequest = await Promise.resolve(_interceptors.request(options));
      options = Object.assign(options, newRequest);
    }

    try {
      let response: Response;

      if (_client) {
        response = await _client(
          new Request(formatPath(url, fetchOptions.queryParameter), options)
        );
      } else {
        response = await query.request<TBody>({
          ...options,
          endpoint: url,
        } as FetchOptionsWithMethod<TBody>);
      }

      if (_interceptors.response) {
        const newResponse = await Promise.resolve(_interceptors.response(response, options));
        return await newResponse.json();
      }

      return await response.json();
    } catch (error) {
      if (_interceptors.error) {
        await Promise.resolve(_interceptors.error(error, options));
      }

      throw new Error(error instanceof Error ? error.message : String(error));
    }
  }

  function setRequestInterceptor(interceptor: TRequestInterceptor) {
    _interceptors.request = interceptor;
  }

  function setResponseInterceptor(interceptor: TInterceptor) {
    _interceptors.response = interceptor;
  }

  function setErrorInterceptor(interceptor: TErrorInterceptor) {
    _interceptors.error = interceptor;
  }

  function request<TData, TBody>(fetchOptions: FetchOptionsWithMethod<TBody>): Promise<TData> {
    return _fetchFn(fetchOptions);
  }

  function get<TData, TBody>(fetchOptions: FetchOptions<TBody>): Promise<TData> {
    return _fetchFn(Object.assign(fetchOptions, { method: 'GET' }));
  }

  function post<TData, TBody>(fetchOptions: FetchOptions<TBody>): Promise<TData> {
    return _fetchFn(Object.assign(fetchOptions, { method: 'POST' }));
  }

  function patch<TData, TBody>(fetchOptions: FetchOptions<TBody>): Promise<TData> {
    return _fetchFn(Object.assign(fetchOptions, { method: 'PATCH' }));
  }

  function put<TData, TBody>(fetchOptions: FetchOptions<TBody>): Promise<TData> {
    return _fetchFn(Object.assign(fetchOptions, { method: 'PUT' }));
  }

  function del<TData, TBody>(fetchOptions: FetchOptions<TBody>): Promise<TData> {
    return _fetchFn(Object.assign(fetchOptions, { method: 'DELETE' }));
  }

  return {
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
