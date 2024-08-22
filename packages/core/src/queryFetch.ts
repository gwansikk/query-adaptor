import type {
  RequestOptions,
  FetchOptions,
  FetchOptionsWithMethod,
  TInterceptor,
  TResponseData,
  QueryFetchOptions,
  QueryFetch,
  TRequestInterceptor,
} from './types';
import { createBaseURL, formatPath, isContentTypeJson, toURLSearchParams } from './utils';

/**
 * Creates a QueryFetch instance.
 *
 * @param queryFetchOptions - The options for QueryFetch.
 * @returns The QueryFetch instance.
 */
export function createQueryFetch(queryFetchOptions: QueryFetchOptions): QueryFetch {
  const _baseURL = createBaseURL(queryFetchOptions.baseURL);
  const _options = queryFetchOptions.options ?? {};
  const _interceptors = queryFetchOptions.interceptors ?? {};
  let _headers = queryFetchOptions.headers ?? {};

  async function _fetch<TData>(
    path: string,
    fetchOptions: RequestOptions
  ): Promise<TResponseData<TData>> {
    fetchOptions.headers = { ..._headers, ...fetchOptions.headers };

    if (_interceptors.request) {
      fetchOptions = await Promise.resolve(_interceptors.request(fetchOptions));
    }

    const response = await fetch([_baseURL, path].join('/'), {
      ..._options,
      ...fetchOptions,
    });

    if (response.status >= 400) {
      if (_interceptors.error) {
        const errorResponse = await Promise.resolve(_interceptors.error(response, fetchOptions));
        return await errorResponse.json();
      }
    }

    if (_interceptors.response) {
      const modifiedResponse = await Promise.resolve(
        _interceptors.response(response, fetchOptions)
      );
      return await modifiedResponse.json();
    }

    return await response.json();
  }

  async function request<TData, TBodyData>({
    method,
    endpoint,
    queryParameter,
    body,
    options,
  }: FetchOptionsWithMethod<TBodyData>): Promise<TResponseData<TData>> {
    let path = formatPath(endpoint.join('/'));
    const isJson = isContentTypeJson(body);

    const fetchOptions: RequestOptions = {
      ...options,
      method,
      headers: {
        ...{ 'Content-Type': isJson ? 'application/json' : '' },
        ..._headers,
        ...options?.headers,
      },
      body: isJson ? JSON.stringify(body) : (body as BodyInit),
    };

    if (queryParameter) {
      path += `?${toURLSearchParams(queryParameter)}`;
    }

    return _fetch<TData>(path, fetchOptions);
  }

  function setHeaders(newHeaders: HeadersInit) {
    _headers = { ..._headers, ...newHeaders };
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

  function get<TData, TBodyData>(options: FetchOptions<TBodyData>): Promise<TResponseData<TData>> {
    return request<TData, TBodyData>({
      ...options,
      method: 'GET',
    });
  }

  function post<TData, TBodyData>(options: FetchOptions<TBodyData>): Promise<TResponseData<TData>> {
    return request<TData, TBodyData>({
      ...options,
      method: 'POST',
    });
  }

  function patch<TData, TBodyData>(
    options: FetchOptions<TBodyData>
  ): Promise<TResponseData<TData>> {
    return request<TData, TBodyData>({
      ...options,
      method: 'PATCH',
    });
  }

  function put<TData, TBodyData>(options: FetchOptions<TBodyData>): Promise<TResponseData<TData>> {
    return request<TData, TBodyData>({ ...options, method: 'PUT' });
  }

  function del<TData, TBodyData>(options: FetchOptions<TBodyData>): Promise<TResponseData<TData>> {
    return request<TData, TBodyData>({ ...options, method: 'DELETE' });
  }

  return {
    setHeaders,
    setRequestInterceptor,
    setResponseInterceptor,
    setErrorInterceptor,
    get,
    post,
    patch,
    put,
    delete: del,
  };
}
