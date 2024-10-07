import type { FetchOptions, FetchOptionsWithMethod } from './fetchOptions';
import type { TFetchAdaptor, TRequestOptions } from './types';
import { formatPath, isContentTypeJson } from './utils';

export interface QueryFetch {
  request: <TData, TBody>(
    options: FetchOptionsWithMethod<TData, TBody>,
    fetchAdaptor?: TFetchAdaptor<TData>
  ) => Promise<TData>;
  get: <TData, TBody = never>(
    options: FetchOptions<TData, TBody>,
    fetchAdaptor?: TFetchAdaptor<TData>
  ) => Promise<TData>;
  post: <TData, TBody = TData>(
    options: FetchOptions<TData, TBody>,
    fetchAdaptor?: TFetchAdaptor<TData>
  ) => Promise<TData>;
  patch: <TData, TBody = TData>(
    options: FetchOptions<TData, TBody>,
    fetchAdaptor?: TFetchAdaptor<TData>
  ) => Promise<TData>;
  put: <TData, TBody = TData>(
    options: FetchOptions<TData, TBody>,
    fetchAdaptor?: TFetchAdaptor<TData>
  ) => Promise<TData>;
  delete: <TData, TBody = TData>(
    options: FetchOptions<TData, TBody>,
    fetchAdaptor?: TFetchAdaptor<TData>
  ) => Promise<TData>;
}

/**
 * Use the Fetch API easily and declaratively
 *
 * @see {@link https://query-fetch.gwansik.dev/query-fetch}
 */
export const queryFetch: QueryFetch = {
  async request<TData, TBody>(
    options: FetchOptionsWithMethod<TData, TBody>,
    fetchAdaptor?: TFetchAdaptor<TData>
  ): Promise<TData> {
    let path = formatPath(options.endpoint);
    const isJson = isContentTypeJson(options.body);

    const requestOptions: TRequestOptions = {
      ...options,
      method: options.method,
      headers: {
        'Content-Type': isJson ? 'application/json' : '',
        ...options.options?.headers,
      },
      body: isJson ? JSON.stringify(options.body) : (options.body as BodyInit),
    };

    if (options.queryParameter) {
      const searchParams = new URLSearchParams();

      Object.entries(options.queryParameter).forEach(([key, value]) => {
        searchParams.append(key, String(value));
      });

      path += `?${searchParams.toString()}`;
    }

    if (options.onTry) {
      options.onTry(options.body);
    }

    if (fetchAdaptor) {
      return fetchAdaptor(formatPath(path), requestOptions);
    }

    const response = await fetch(formatPath(path), requestOptions);
    const data = await response.json();

    if (response.ok && options.onSuccess) {
      options.onSuccess(options.body, data);
    } else if (options.onCatch) {
      options.onCatch(options.body);
    }

    if (options.onFinally) {
      options.onFinally(options.body, data);
    }

    return data;
  },

  get<TData, TBody>(
    fetchOptions: FetchOptions<TData, TBody>,
    fetchAdaptor?: TFetchAdaptor<TData>
  ): Promise<TData> {
    return this.request<TData, TBody>(
      {
        ...fetchOptions,
        method: 'GET',
      },
      fetchAdaptor
    );
  },

  post<TData, TBody>(
    fetchOptions: FetchOptions<TData, TBody>,
    fetchAdaptor?: TFetchAdaptor<TData>
  ): Promise<TData> {
    return this.request<TData, TBody>(
      {
        ...fetchOptions,
        method: 'POST',
      },
      fetchAdaptor
    );
  },

  patch<TData, TBody>(
    fetchOptions: FetchOptions<TData, TBody>,
    fetchAdaptor?: TFetchAdaptor<TData>
  ): Promise<TData> {
    return this.request<TData, TBody>(
      {
        ...fetchOptions,
        method: 'PATCH',
      },
      fetchAdaptor
    );
  },

  put<TData, TBody>(
    fetchOptions: FetchOptions<TData, TBody>,
    fetchAdaptor?: TFetchAdaptor<TData>
  ): Promise<TData> {
    return this.request<TData, TBody>({ ...fetchOptions, method: 'PUT' }, fetchAdaptor);
  },

  delete<TData, TBody>(
    fetchOptions: FetchOptions<TData, TBody>,
    fetchAdaptor?: TFetchAdaptor<TData>
  ): Promise<TData> {
    return this.request<TData, TBody>({ ...fetchOptions, method: 'DELETE' }, fetchAdaptor);
  },
} as const;
