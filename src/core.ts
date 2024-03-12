import {
  FetchOptions,
  HttpArgs,
  HttpBodyArgs,
  HttpBodyArgsWithMethod,
  Interceptor,
  ResponseData,
  ServerChainOptions,
  ServerChainType,
} from './types';
import { createBaseURL, formatPath, log } from './utils';

const ServerChain = (serverChainArgs: ServerChainOptions): ServerChainType => {
  const key = serverChainArgs.key;
  const mode = serverChainArgs.mode;
  const baseURL =
    mode === 'development' ? serverChainArgs.baseURL : createBaseURL(serverChainArgs.baseURL);
  const debug = serverChainArgs.debug || false;
  let headers = serverChainArgs.headers || {};
  const options = serverChainArgs.options || {};
  const interceptors = serverChainArgs.interceptors || {};

  const setHeaders = (newHeaders: HeadersInit): void => {
    headers = { ...headers, ...newHeaders };
  };

  const setRequestInterceptor = (interceptor: Interceptor<FetchOptions>): void => {
    interceptors.request = interceptor;
  };

  const setResponseInterceptor = (interceptor: Interceptor<Response>): void => {
    interceptors.response = interceptor;
  };

  const setErrorInterceptor = (interceptor: Interceptor<Response>): void => {
    interceptors.error = interceptor;
  };

  const fetchFn = async <R>(url: string, fetchOptions: FetchOptions): Promise<ResponseData<R>> => {
    fetchOptions.headers = { ...headers, ...fetchOptions.headers };
    url = formatPath(url);

    if (interceptors.request) {
      fetchOptions = await Promise.resolve(interceptors.request(fetchOptions, fetchOptions.method));
    }

    const response = await fetch(`${baseURL}/${url}`, {
      ...options,
      ...fetchOptions,
    });

    if (response.status >= 400) {
      if (debug) log(key, 'debug', `Error ${response.status}`);

      if (interceptors.error) {
        const errorResponse = await Promise.resolve(
          interceptors.error(response, fetchOptions.method)
        );
        return errorResponse.json();
      }
    }

    if (interceptors.response) {
      const modifiedResponse = await Promise.resolve(
        interceptors.response(response, fetchOptions.method)
      );
      return modifiedResponse.json();
    }

    return response.json();
  };

  const request = async <T, R>({
    method,
    url,
    body,
    options,
  }: HttpBodyArgsWithMethod<T>): Promise<ResponseData<R>> => {
    const isFormDataOrURLSearchParams = body instanceof FormData || body instanceof URLSearchParams;

    const fetchOptions: FetchOptions = {
      ...options,
      method,
      headers: {
        ...(isFormDataOrURLSearchParams ? {} : { 'Content-Type': 'application/json' }),
        ...headers,
        ...options?.headers,
      },
      body: isFormDataOrURLSearchParams ? body : body ? JSON.stringify(body) : null,
    };

    return fetchFn(url, fetchOptions);
  };

  const get = <R>(args: HttpArgs, options?: FetchOptions): Promise<ResponseData<R>> =>
    request<unknown, R>({
      ...args,
      method: 'GET',
      options,
    });

  const post = <T, R>(args: HttpBodyArgs<T>, options?: FetchOptions): Promise<ResponseData<R>> =>
    request<T, R>({
      ...args,
      method: 'POST',
      options,
    });

  const patch = <T, R>(args: HttpBodyArgs<T>, options?: FetchOptions): Promise<ResponseData<R>> =>
    request<T, R>({
      ...args,
      method: 'PATCH',
      options,
    });

  const put = <T, R>(args: HttpBodyArgs<T>, options?: FetchOptions): Promise<ResponseData<R>> =>
    request<T, R>({ ...args, method: 'PUT', options });

  const del = <T, R>(args: HttpBodyArgs<T>, options?: FetchOptions): Promise<ResponseData<R>> =>
    request<T, R>({ ...args, method: 'DELETE', options });

  return {
    setHeaders,
    setRequestInterceptor,
    setResponseInterceptor,
    setErrorInterceptor,
    get,
    post,
    patch,
    put,
    del,
  };
};

export default ServerChain;
