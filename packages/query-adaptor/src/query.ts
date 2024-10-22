import type { FetchOptions, FetchOptionsWithMethod } from './fetchOptions';
import { formatPath } from './utils';
import { createRequestOptions } from './utils/createRequestOptions';

export interface Query {
  request: <TBody>(fetchOptions: FetchOptionsWithMethod<TBody>) => Promise<Response>;
  get: <TData, TBody = never>(fetchOptions: FetchOptions<TBody>) => Promise<TData>;
  post: <TData, TBody = TData>(fetchOptions: FetchOptions<TBody>) => Promise<TData>;
  patch: <TData, TBody = TData>(fetchOptions: FetchOptions<TBody>) => Promise<TData>;
  put: <TData, TBody = TData>(fetchOptions: FetchOptions<TBody>) => Promise<TData>;
  delete: <TData, TBody = TData>(fetchOptions: FetchOptions<TBody>) => Promise<TData>;
}

/**
 * Use the Fetch API easily and declaratively
 *
 * @see {@link https://query-adaptor.gwansik.dev/query.html}
 */
export const query: Query = {
  async request<TBody>(fetchOptions: FetchOptionsWithMethod<TBody>): Promise<Response> {
    const url = formatPath(fetchOptions.endpoint, fetchOptions.queryParameter);
    const options = createRequestOptions(fetchOptions);

    try {
      if (fetchOptions.onTry) {
        fetchOptions.onTry(fetchOptions.body);
      }

      const response = await fetch(url, options);

      if (response.ok && fetchOptions.onSuccess) {
        fetchOptions.onSuccess(fetchOptions.body, response);
      }

      return response;
    } catch (error) {
      if (fetchOptions.onCatch) {
        fetchOptions.onCatch(fetchOptions.body);
      }

      if (fetchOptions.retry) {
        if (fetchOptions.retry <= 0) {
          throw new Error();
        }

        fetchOptions.retry = fetchOptions.retry - 1;

        return this.request(fetchOptions);
      }

      throw new Error(error instanceof Error ? error.message : String(error));
    } finally {
      if (fetchOptions.onFinally) {
        fetchOptions.onFinally(fetchOptions.body);
      }
    }
  },

  async get<TData, TBody>(fetchOptions: FetchOptions<TBody>): Promise<TData> {
    const response = await this.request<TBody>(Object.assign(fetchOptions, { method: 'GET' }));
    return response.json();
  },

  async post<TData, TBody>(fetchOptions: FetchOptions<TBody>): Promise<TData> {
    const response = await this.request<TBody>(Object.assign(fetchOptions, { method: 'POST' }));
    return response.json();
  },

  async patch<TData, TBody>(fetchOptions: FetchOptions<TBody>): Promise<TData> {
    const response = await this.request<TBody>(Object.assign(fetchOptions, { method: 'PATCH' }));
    return response.json();
  },

  async put<TData, TBody>(fetchOptions: FetchOptions<TBody>): Promise<TData> {
    const response = await this.request<TBody>(Object.assign(fetchOptions, { method: 'PUT' }));
    return response.json();
  },

  async delete<TData, TBody>(fetchOptions: FetchOptions<TBody>): Promise<TData> {
    const response = await this.request<TBody>(Object.assign(fetchOptions, { method: 'DELETE' }));
    return response.json();
  },
} as const;
