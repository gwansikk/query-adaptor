import type {
  FetchOptions,
  FetchArgs,
  HttpArgsWithHTTPMethod,
  TInterceptor,
  TResponseData,
  QueryFetchOptions,
  QueryFetch,
} from './types';
import { createBaseURL, formatPath, isContentTypeJson, toURLSearchParams } from './utils';

export function createQueryFetch(queryFetchOptions: QueryFetchOptions): QueryFetch {
  const _baseURL = createBaseURL(queryFetchOptions.baseURL);
  const _options = queryFetchOptions.options ?? {};
  const _interceptors = queryFetchOptions.interceptors ?? {};
  let _headers = queryFetchOptions.headers ?? {};

  async function _fetch<TData>(
    path: string,
    fetchOptions: FetchOptions
  ): Promise<TResponseData<TData>> {
    fetchOptions.headers = { ..._headers, ...fetchOptions.headers };

    if (_interceptors.request) {
      fetchOptions = await Promise.resolve(
        _interceptors.request(fetchOptions, fetchOptions.method)
      );
    }

    const response = await fetch([_baseURL, path].join('/'), {
      ..._options,
      ...fetchOptions,
    });

    if (response.status >= 400) {
      if (_interceptors.error) {
        const errorResponse = await Promise.resolve(
          _interceptors.error(response, fetchOptions.method)
        );
        return await errorResponse.json();
      }
    }

    if (_interceptors.response) {
      const modifiedResponse = await Promise.resolve(
        _interceptors.response(response, fetchOptions.method)
      );
      return await modifiedResponse.json();
    }

    return await response.json();
  }

  function setHeaders(newHeaders: HeadersInit) {
    _headers = { ..._headers, ...newHeaders };
  }

  function setRequestInterceptor(interceptor: TInterceptor<FetchOptions>) {
    _interceptors.request = interceptor;
  }

  function setResponseInterceptor(interceptor: TInterceptor) {
    _interceptors.response = interceptor;
  }

  function setErrorInterceptor(interceptor: TInterceptor) {
    _interceptors.error = interceptor;
  }

  async function request<TData, TBodyData>({
    method,
    endpoint,
    queryParameter,
    body,
    options,
  }: HttpArgsWithHTTPMethod<TBodyData>): Promise<TResponseData<TData>> {
    let path = formatPath(endpoint.join('/'));
    const isJson = isContentTypeJson(body);

    const fetchOptions: FetchOptions = {
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

  function get<TData, TBodyData>(args: FetchArgs<TBodyData>): Promise<TResponseData<TData>> {
    return request<TData, TBodyData>({
      ...args,
      method: 'GET',
    });
  }

  function post<TData, TBodyData>(args: FetchArgs<TBodyData>): Promise<TResponseData<TData>> {
    return request<TData, TBodyData>({
      ...args,
      method: 'POST',
    });
  }

  function patch<TData, TBodyData>(args: FetchArgs<TBodyData>): Promise<TResponseData<TData>> {
    return request<TData, TBodyData>({
      ...args,
      method: 'PATCH',
    });
  }

  function put<TData, TBodyData>(args: FetchArgs<TBodyData>): Promise<TResponseData<TData>> {
    return request<TData, TBodyData>({ ...args, method: 'PUT' });
  }

  function del<TData, TBodyData>(args: FetchArgs<TBodyData>): Promise<TResponseData<TData>> {
    return request<TData, TBodyData>({ ...args, method: 'DELETE' });
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
