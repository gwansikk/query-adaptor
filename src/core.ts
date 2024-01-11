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

  const fetchFn = async (url: string, options: FetchOptions): Promise<ResponseData> => {
    options.headers = { ...headers, ...options.headers };
    url = formatPath(url);

    if (interceptors.request) {
      options =
        interceptors.request(options) ||
        log(key, 'interceptor', 'request intercepted; must return');
    }

    const response = await fetch(`${baseURL}/${url}`, options);

    if (response.status >= 400) {
      if (debug) {
        log(key, 'debug', `Error ${response.status}`);
      } else if (interceptors.error) {
        return (
          interceptors.error(response)?.json() ||
          log(key, 'interceptor', 'Error intercepted; must return')
        );
      }
    }

    if (interceptors.response) {
      return (
        interceptors.response(response)?.json() ||
        log(key, 'interceptor', 'Response intercepted; must return')
      );
    }

    return response.json();
  };

  const request = async ({
    method,
    url,
    body,
    options,
  }: {
    method: string;
  } & HttpBodyArgs): Promise<ResponseData> => {
    const fetchOptions: FetchOptions = {
      ...options,
      method,
      headers: { ...headers, ...options?.headers },
      body: body ? JSON.stringify(body) : null,
    };

    return fetchFn(url, fetchOptions);
  };

  const post = ({ url, body, options }: HttpBodyArgs): Promise<ResponseData> =>
    request({
      method: 'POST',
      url,
      body,
      options,
    });

  const get = ({ url, options }: HttpArgs): Promise<ResponseData> =>
    request({
      method: 'GET',
      url,
      options,
    });

  const put = ({ url, body, options }: HttpBodyArgs): Promise<ResponseData> =>
    request({ method: 'PUT', url, body, options });

  const del = ({ url, body, options }: HttpBodyArgs): Promise<ResponseData> =>
    request({ method: 'DELETE', url, body, options });

  return {
    setHeaders,
    setRequestInterceptor,
    setResponseInterceptor,
    setErrorInterceptor,
    post,
    get,
    put,
    del,
  };
};

export default ServerChain;
