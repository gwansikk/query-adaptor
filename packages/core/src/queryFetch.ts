import type { TFetchOptions } from './fetchOptions';
import type { TFetchAdaptor, TFetchOptionsWithMethod, TRequestOptions } from './types';
import { formatPath, isContentTypeJson } from './utils';

export interface QueryFetch {
  request: <TData, TBody>(
    options: TFetchOptionsWithMethod<TBody>,
    fetchAdaptor?: TFetchAdaptor<TData>
  ) => Promise<TData>;
  get: <TData, TBody = never>(
    options: TFetchOptions<TBody>,
    fetchAdaptor?: TFetchAdaptor<TData>
  ) => Promise<TData>;
  post: <TData, TBody = TData>(
    options: TFetchOptions<TBody>,
    fetchAdaptor?: TFetchAdaptor<TData>
  ) => Promise<TData>;
  patch: <TData, TBody = TData>(
    options: TFetchOptions<TBody>,
    fetchAdaptor?: TFetchAdaptor<TData>
  ) => Promise<TData>;
  put: <TData, TBody = TData>(
    options: TFetchOptions<TBody>,
    fetchAdaptor?: TFetchAdaptor<TData>
  ) => Promise<TData>;
  delete: <TData, TBody = TData>(
    options: TFetchOptions<TBody>,
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
    { method, endpoint, queryParameter, body, options }: TFetchOptionsWithMethod<TBody>,
    fetchAdaptor?: TFetchAdaptor<TData>
  ): Promise<TData> {
    let path = formatPath(...endpoint);
    const isJson = isContentTypeJson(body);

    const requestOptions: TRequestOptions = {
      ...options,
      method,
      headers: {
        'Content-Type': isJson ? 'application/json' : '',
        ...options?.headers,
      },
      body: isJson ? JSON.stringify(body) : (body as BodyInit),
    };

    if (queryParameter) {
      const searchParams = new URLSearchParams();

      Object.entries(queryParameter).forEach(([key, value]) => {
        searchParams.append(key, String(value));
      });

      path += `?${searchParams.toString()}`;
    }

    if (fetchAdaptor) {
      return fetchAdaptor(formatPath(path), requestOptions);
    }

    const response = await fetch(formatPath(path), requestOptions);

    return await response.json();
  },

  get<TData, TBody>(
    fetchOptions: TFetchOptions<TBody>,
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
    fetchOptions: TFetchOptions<TBody>,
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
    fetchOptions: TFetchOptions<TBody>,
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
    fetchOptions: TFetchOptions<TBody>,
    fetchAdaptor?: TFetchAdaptor<TData>
  ): Promise<TData> {
    return this.request<TData, TBody>({ ...fetchOptions, method: 'PUT' }, fetchAdaptor);
  },

  delete<TData, TBody>(
    fetchOptions: TFetchOptions<TBody>,
    fetchAdaptor?: TFetchAdaptor<TData>
  ): Promise<TData> {
    return this.request<TData, TBody>({ ...fetchOptions, method: 'DELETE' }, fetchAdaptor);
  },
} as const;
