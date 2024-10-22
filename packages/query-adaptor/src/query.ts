import type { FetchOptions, FetchOptionsWithMethod } from './fetchOptions';
import type { TQueryAdaptor } from './types';
import { formatPath } from './utils';
import { createQueryParameter } from './utils/createQueryParameter';
import { createRequestOptions } from './utils/createRequestOptions';

export interface Query {
  request: <TData, TBody>(
    options: FetchOptionsWithMethod<TData, TBody>,
    adaptor?: TQueryAdaptor<TData>
  ) => Promise<TData>;
  get: <TData, TBody = never>(
    options: FetchOptions<TData, TBody>,
    adaptor?: TQueryAdaptor<TData>
  ) => Promise<TData>;
  post: <TData, TBody = TData>(
    options: FetchOptions<TData, TBody>,
    adaptor?: TQueryAdaptor<TData>
  ) => Promise<TData>;
  patch: <TData, TBody = TData>(
    options: FetchOptions<TData, TBody>,
    adaptor?: TQueryAdaptor<TData>
  ) => Promise<TData>;
  put: <TData, TBody = TData>(
    options: FetchOptions<TData, TBody>,
    adaptor?: TQueryAdaptor<TData>
  ) => Promise<TData>;
  delete: <TData, TBody = TData>(
    options: FetchOptions<TData, TBody>,
    adaptor?: TQueryAdaptor<TData>
  ) => Promise<TData>;
}

/**
 * Use the Fetch API easily and declaratively
 *
 * @see {@link https://query-fetch.gwansik.dev/query-fetch}
 */
export const query: Query = {
  async request<TData, TBody>(
    options: FetchOptionsWithMethod<TData, TBody>,
    adaptor?: TQueryAdaptor<TData>
  ): Promise<TData> {
    let path = formatPath(options.endpoint);
    const requestOptions = createRequestOptions(options);

    if (options.queryParameter) {
      path = createQueryParameter(path, options.queryParameter);
    }

    try {
      if (options.onTry) {
        options.onTry(options.body);
      }

      if (adaptor) {
        return adaptor(formatPath(path), requestOptions);
      }

      const response = await fetch(formatPath(path), requestOptions);
      const responsedata = await response.json();

      if (response.ok && options.onSuccess) {
        options.onSuccess(options.body, responsedata);
      }

      return responsedata;
    } catch (error) {
      if (options.onCatch) {
        options.onCatch(options.body);
      }

      if (!options?.options?.retry) {
        throw new Error('retry is undefined');
      }

      if (options.options.retry <= 0) {
        throw new Error('retry is over');
      }

      options.options.retry = options.options.retry - 1;

      return this.request(options, adaptor);
    } finally {
      if (options.onFinally) {
        options.onFinally(options.body);
      }
    }
  },

  get<TData, TBody>(
    fetchOptions: FetchOptions<TData, TBody>,
    adaptor?: TQueryAdaptor<TData>
  ): Promise<TData> {
    return this.request<TData, TBody>(
      {
        ...fetchOptions,
        method: 'GET',
      },
      adaptor
    );
  },

  post<TData, TBody>(
    fetchOptions: FetchOptions<TData, TBody>,
    adaptor?: TQueryAdaptor<TData>
  ): Promise<TData> {
    return this.request<TData, TBody>(
      {
        ...fetchOptions,
        method: 'POST',
      },
      adaptor
    );
  },

  patch<TData, TBody>(
    fetchOptions: FetchOptions<TData, TBody>,
    adaptor?: TQueryAdaptor<TData>
  ): Promise<TData> {
    return this.request<TData, TBody>(
      {
        ...fetchOptions,
        method: 'PATCH',
      },
      adaptor
    );
  },

  put<TData, TBody>(
    fetchOptions: FetchOptions<TData, TBody>,
    adaptor?: TQueryAdaptor<TData>
  ): Promise<TData> {
    return this.request<TData, TBody>({ ...fetchOptions, method: 'PUT' }, adaptor);
  },

  delete<TData, TBody>(
    fetchOptions: FetchOptions<TData, TBody>,
    adaptor?: TQueryAdaptor<TData>
  ): Promise<TData> {
    return this.request<TData, TBody>({ ...fetchOptions, method: 'DELETE' }, adaptor);
  },
} as const;
