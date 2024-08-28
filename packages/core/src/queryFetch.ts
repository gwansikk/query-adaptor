import type {
  TFetchOptions,
  TFetchOptionsWithMethod,
  TRequestOptions,
  TResponseData,
} from './types';
import { formatPath, isContentTypeJson, toURLSearchParams } from './utils';

export type QueryFetch = {
  request: <TData, TBodyData>(
    options: TFetchOptionsWithMethod<TBodyData>,
    fetchAdaptor?: FetchAdaptor<TData>
  ) => Promise<TResponseData<TData>>;
  get: <TData, TBodyData = never>(
    options: TFetchOptions<TBodyData>,
    fetchAdaptor?: FetchAdaptor<TData>
  ) => Promise<TResponseData<TData>>;
  post: <TData, TBodyData = TData>(
    options: TFetchOptions<TBodyData>,
    fetchAdaptor?: FetchAdaptor<TData>
  ) => Promise<TResponseData<TData>>;
  patch: <TData, TBodyData = TData>(
    options: TFetchOptions<TBodyData>,
    fetchAdaptor?: FetchAdaptor<TData>
  ) => Promise<TResponseData<TData>>;
  put: <TData, TBodyData = TData>(
    options: TFetchOptions<TBodyData>,
    fetchAdaptor?: FetchAdaptor<TData>
  ) => Promise<TResponseData<TData>>;
  delete: <TData, TBodyData = TData>(
    options: TFetchOptions<TBodyData>,
    fetchAdaptor?: FetchAdaptor<TData>
  ) => Promise<TResponseData<TData>>;
};

export type FetchAdaptor<TData> = (
  path: string,
  request: TRequestOptions
) => Promise<TResponseData<TData>>;

export const queryFetch: QueryFetch = {
  async request<TData, TBodyData>(
    { method, endpoint, queryParameter, body, options }: TFetchOptionsWithMethod<TBodyData>,
    fetchAdaptor?: FetchAdaptor<TData>
  ): Promise<TResponseData<TData>> {
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
      path += `?${toURLSearchParams(queryParameter)}`;
    }

    if (fetchAdaptor) {
      return fetchAdaptor(formatPath(path), requestOptions);
    }

    const response = await fetch(formatPath(path), requestOptions);

    return await response.json();
  },

  get<TData, TBodyData>(
    fetchOptions: TFetchOptions<TBodyData>,
    fetchAdaptor?: FetchAdaptor<TData>
  ): Promise<TResponseData<TData>> {
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
    fetchAdaptor?: FetchAdaptor<TData>
  ): Promise<TResponseData<TData>> {
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
    fetchAdaptor?: FetchAdaptor<TData>
  ): Promise<TResponseData<TData>> {
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
    fetchAdaptor?: FetchAdaptor<TData>
  ): Promise<TResponseData<TData>> {
    return this.request<TData, TBodyData>({ ...fetchOptions, method: 'PUT' }, fetchAdaptor);
  },

  delete<TData, TBodyData>(
    fetchOptions: TFetchOptions<TBodyData>,
    fetchAdaptor?: FetchAdaptor<TData>
  ): Promise<TResponseData<TData>> {
    return this.request<TData, TBodyData>({ ...fetchOptions, method: 'DELETE' }, fetchAdaptor);
  },
} as const;
