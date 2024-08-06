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
  const baseURL = createBaseURL(queryFetchOptions.baseURL);
  const options = queryFetchOptions.options ?? {};
  const interceptors = queryFetchOptions.interceptors ?? {};
  let headers = queryFetchOptions.headers ?? {};

  function setHeaders(newHeaders: HeadersInit) {
    headers = { ...headers, ...newHeaders };
  }

  function setRequestInterceptor(interceptor: Interceptor<FetchOptions>) {
    interceptors.request = interceptor;
  }

  function setResponseInterceptor(interceptor: Interceptor) {
    interceptors.response = interceptor;
  }

  function setErrorInterceptor(interceptor: Interceptor) {
    interceptors.error = interceptor;
  }

  async function fetchFn<R>(parh: string, fetchOptions: FetchOptions): Promise<ResponseData<R>> {
    fetchOptions.headers = { ...headers, ...fetchOptions.headers };

    if (interceptors.request) {
      fetchOptions = await Promise.resolve(interceptors.request(fetchOptions, fetchOptions.method));
    }

    const response = await fetch([baseURL, parh].join('/'), {
      ...options,
      ...fetchOptions,
    });

    if (response.status >= 400) {
      if (interceptors.error) {
        const errorResponse = await Promise.resolve(
          interceptors.error(response, fetchOptions.method)
        );
        return await errorResponse.json();
      }
    }

    if (interceptors.response) {
      const modifiedResponse = await Promise.resolve(
        interceptors.response(response, fetchOptions.method)
      );
      return await modifiedResponse.json();
    }

    return await response.json();
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
        ...(isJson ? { 'Content-Type': 'application/json' } : {}),
        ...headers,
        ...options?.headers,
      },
      body: isJson ? JSON.stringify(body) : (body as BodyInit),
    };

    if (queryParameter) {
      path += `?${toURLSearchParams(queryParameter)}`;
    }

    return fetchFn<R>(path, fetchOptions);
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
