import type {
  FetchOptions,
  HttpArgs,
  HttpBodyArgs,
  HttpBodyArgsWithMethod,
  Interceptor,
  ResponseData,
  QueryFetchOptions,
  QueryFetch,
} from './types';
import { createBaseURL, formatPath } from './utils';

export function createQueryFetch(queryFetchOptions: QueryFetchOptions): QueryFetch {
  const $key = queryFetchOptions.key;
  const $baseURL = createBaseURL($key, queryFetchOptions.baseURL);
  const $options = queryFetchOptions.options ?? {};
  const $interceptors = queryFetchOptions.interceptors ?? {};
  let headers = queryFetchOptions.headers ?? {};

  function setHeaders(newHeaders: HeadersInit) {
    headers = { ...headers, ...newHeaders };
  }

  function setRequestInterceptor(interceptor: Interceptor<FetchOptions>) {
    $interceptors.request = interceptor;
  }

  function setResponseInterceptor(interceptor: Interceptor<Response>) {
    $interceptors.response = interceptor;
  }

  function setErrorInterceptor(interceptor: Interceptor<Response>) {
    $interceptors.error = interceptor;
  }

  async function $fetchFn<R>(url: string, fetchOptions: FetchOptions): Promise<ResponseData<R>> {
    fetchOptions.headers = { ...headers, ...fetchOptions.headers };
    url = formatPath(url);

    if ($interceptors.request) {
      fetchOptions = await Promise.resolve(
        $interceptors.request(fetchOptions, fetchOptions.method)
      );
    }

    const response = await fetch(`${$baseURL}/${url}`, {
      ...$options,
      ...fetchOptions,
    });

    if (response.status >= 400) {
      if ($interceptors.error) {
        const errorResponse = await Promise.resolve(
          $interceptors.error(response, fetchOptions.method)
        );
        return await errorResponse.json();
      }
    }

    if ($interceptors.response) {
      const modifiedResponse = await Promise.resolve(
        $interceptors.response(response, fetchOptions.method)
      );
      return await modifiedResponse.json();
    }

    return await response.json();
  }

  async function $request<T, R>({
    method,
    url,
    body,
    options,
  }: HttpBodyArgsWithMethod<T>): Promise<ResponseData<R>> {
    const isFormDataOrURLSearchParams = body instanceof FormData || body instanceof URLSearchParams;

    const fetchOptions: FetchOptions = {
      ...options,
      method,
      headers: {
        ...(isFormDataOrURLSearchParams ? {} : { 'Content-Type': 'application/json' }),
        ...headers,
        ...options?.headers,
      },
      body: isFormDataOrURLSearchParams ? body : JSON.stringify(body),
    };

    return $fetchFn<R>(url, fetchOptions);
  }

  function get<R>(args: HttpArgs, options?: FetchOptions): Promise<ResponseData<R>> {
    return $request<unknown, R>({
      ...args,
      method: 'GET',
      options,
    });
  }

  function post<T, R>(args: HttpBodyArgs<T>, options?: FetchOptions): Promise<ResponseData<R>> {
    return $request<T, R>({
      ...args,
      method: 'POST',
      options,
    });
  }

  function patch<T, R>(args: HttpBodyArgs<T>, options?: FetchOptions): Promise<ResponseData<R>> {
    return $request<T, R>({
      ...args,
      method: 'PATCH',
      options,
    });
  }

  function put<T, R>(args: HttpBodyArgs<T>, options?: FetchOptions): Promise<ResponseData<R>> {
    return $request<T, R>({ ...args, method: 'PUT', options });
  }

  function del<T, R>(args: HttpBodyArgs<T>, options?: FetchOptions): Promise<ResponseData<R>> {
    return $request<T, R>({ ...args, method: 'DELETE', options });
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
