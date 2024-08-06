import type {
  FetchOptions,
  FetchArgs,
  HttpArgsWithHTTPMethod,
  Interceptor,
  ResponseData,
  QueryFetchOptions,
  QueryFetch,
} from './types';
import { createBaseURL, formatPath, isContentTypeJson, toURLSearchParams } from './utils';

export function createQueryFetch(queryFetchOptions: QueryFetchOptions): QueryFetch {
  const _baseURL = createBaseURL(queryFetchOptions.baseURL);
  const _options = queryFetchOptions.options ?? {};
  const _interceptors = queryFetchOptions.interceptors ?? {};
  let _headers = queryFetchOptions.headers ?? {};

  async function _fetch<R>(path: string, fetchOptions: FetchOptions): Promise<ResponseData<R>> {
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

  function setRequestInterceptor(interceptor: Interceptor<FetchOptions>) {
    _interceptors.request = interceptor;
  }

  function setResponseInterceptor(interceptor: Interceptor) {
    _interceptors.response = interceptor;
  }

  function setErrorInterceptor(interceptor: Interceptor) {
    _interceptors.error = interceptor;
  }

  async function request<R, D>({
    method,
    endpoint,
    queryParameter,
    body,
    options,
  }: HttpArgsWithHTTPMethod<D>): Promise<ResponseData<R>> {
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

    return _fetch<R>(path, fetchOptions);
  }

  function get<R>(args: FetchArgs): Promise<ResponseData<R>> {
    return request<R, never>({
      ...args,
      method: 'GET',
      body: undefined,
    });
  }

  function post<R, D>(args: FetchArgs<D>): Promise<ResponseData<R>> {
    return request<R, D>({
      ...args,
      method: 'POST',
    });
  }

  function patch<R, D>(args: FetchArgs<D>): Promise<ResponseData<R>> {
    return request<R, D>({
      ...args,
      method: 'PATCH',
    });
  }

  function put<R, D>(args: FetchArgs<D>): Promise<ResponseData<R>> {
    return request<R, D>({ ...args, method: 'PUT' });
  }

  function del<R, D>(args: FetchArgs<D>): Promise<ResponseData<R>> {
    return request<R, D>({ ...args, method: 'DELETE' });
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
