import type {
  TFetchAdaptor,
  TFetchOptions,
  TFetchOptionsWithMethod,
  TRequestOptions,
} from './types';
import { formatPath, isContentTypeJson } from './utils';

export interface QueryFetch {
  request: <TData, TBodyData>(
    options: TFetchOptionsWithMethod<TBodyData>,
    fetchAdaptor?: TFetchAdaptor<TData>
  ) => Promise<TData>;
  get: <TData, TBodyData = never>(
    options: TFetchOptions<TBodyData>,
    fetchAdaptor?: TFetchAdaptor<TData>
  ) => Promise<TData>;
  post: <TData, TBodyData = TData>(
    options: TFetchOptions<TBodyData>,
    fetchAdaptor?: TFetchAdaptor<TData>
  ) => Promise<TData>;
  patch: <TData, TBodyData = TData>(
    options: TFetchOptions<TBodyData>,
    fetchAdaptor?: TFetchAdaptor<TData>
  ) => Promise<TData>;
  put: <TData, TBodyData = TData>(
    options: TFetchOptions<TBodyData>,
    fetchAdaptor?: TFetchAdaptor<TData>
  ) => Promise<TData>;
  delete: <TData, TBodyData = TData>(
    options: TFetchOptions<TBodyData>,
    fetchAdaptor?: TFetchAdaptor<TData>
  ) => Promise<TData>;
}

/**
 * @see {@link https://query-fecth.offlegacy.org/query-fetch}
 */
export const queryFetch: QueryFetch = {
  async request<TData, TBodyData>(
    { method, endpoint, queryParameter, body, options }: TFetchOptionsWithMethod<TBodyData>,
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

  get<TData, TBodyData>(
    fetchOptions: TFetchOptions<TBodyData>,
    fetchAdaptor?: TFetchAdaptor<TData>
  ): Promise<TData> {
    return this.request<TData, TBodyData>(
      {
        ...fetchOptions,
        method: 'GET',
      },
      fetchAdaptor
    );
  },

  post<TData, TBodyData>(
    fetchOptions: TFetchOptions<TBodyData>,
    fetchAdaptor?: TFetchAdaptor<TData>
  ): Promise<TData> {
    return this.request<TData, TBodyData>(
      {
        ...fetchOptions,
        method: 'POST',
      },
      fetchAdaptor
    );
  },

  patch<TData, TBodyData>(
    fetchOptions: TFetchOptions<TBodyData>,
    fetchAdaptor?: TFetchAdaptor<TData>
  ): Promise<TData> {
    return this.request<TData, TBodyData>(
      {
        ...fetchOptions,
        method: 'PATCH',
      },
      fetchAdaptor
    );
  },

  put<TData, TBodyData>(
    fetchOptions: TFetchOptions<TBodyData>,
    fetchAdaptor?: TFetchAdaptor<TData>
  ): Promise<TData> {
    return this.request<TData, TBodyData>({ ...fetchOptions, method: 'PUT' }, fetchAdaptor);
  },

  delete<TData, TBodyData>(
    fetchOptions: TFetchOptions<TBodyData>,
    fetchAdaptor?: TFetchAdaptor<TData>
  ): Promise<TData> {
    return this.request<TData, TBodyData>({ ...fetchOptions, method: 'DELETE' }, fetchAdaptor);
  },
} as const;
