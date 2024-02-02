import {
  FetchOptions,
  HttpArgs,
  HttpBodyArgs,
  Interceptor,
  ResponseData,
  ServerChainOptions,
} from './types';
import { createBaseURL, formatPath, log } from './utils';

const ServerChain = (serverChainArgs: ServerChainOptions) => {
  const key = serverChainArgs.key;
  const baseURL = createBaseURL(serverChainArgs.baseURL);
  const debug = serverChainArgs.debug || false;
  let headers = serverChainArgs.headers || {};
  const interceptors = serverChainArgs.interceptors || {
    request: null,
    response: null,
    error: null,
  };

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

  const fetchFn = async <R>(url: string, options: FetchOptions): Promise<ResponseData<R>> => {
    options.headers = { ...headers, ...options.headers };
    url = formatPath(url);

    if (interceptors.request) {
      options = await Promise.resolve(interceptors.request(options, options.method));
    }

    const response = await fetch(`${baseURL}/${url}`, options);

    if (response.status >= 400) {
      if (debug) {
        log(key, 'debug', `Error ${response.status}`);
      }
      if (interceptors.error) {
        const errorResponse = await Promise.resolve(interceptors.error(response, options.method));
        return errorResponse.json();
      }
    }

    if (interceptors.response) {
      const modifiedResponse = await Promise.resolve(
        interceptors.response(response, options.method)
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
  }: {
    method: string;
  } & HttpBodyArgs<T>): Promise<ResponseData<R>> => {
    const fetchOptions: FetchOptions = {
      ...options,
      method,
      headers: { ...headers, ...options?.headers },
      body: body ? JSON.stringify(body) : null,
    };

    return fetchFn(url, fetchOptions);
  };

  const post = <T, R>(args: HttpBodyArgs<T>): Promise<ResponseData<R>> =>
    request({
      ...args,
      method: 'POST',
    });

  const get = <R>(args: HttpArgs): Promise<ResponseData<R>> =>
    request({
      ...args,
      method: 'GET',
    });

  const patch = <T, R>(args: HttpBodyArgs<T>): Promise<ResponseData<R>> =>
    request({
      ...args,
      method: 'patch',
    });

  const put = <T, R>(args: HttpBodyArgs<T>): Promise<ResponseData<R>> =>
    request({ ...args, method: 'PUT' });

  const del = <T, R>(args: HttpBodyArgs<T>): Promise<ResponseData<R>> =>
    request({ ...args, method: 'DELETE' });

  return {
    setHeaders,
    setRequestInterceptor,
    setResponseInterceptor,
    setErrorInterceptor,
    request,
    post,
    get,
    patch,
    put,
    del,
  };
};

export default ServerChain;
