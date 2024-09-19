import type { TEndpoint, TMethod, TQueryParameter, TRequestOptions } from './types';

export interface TFetchOptions<TBody = never> {
  endpoint: TEndpoint;
  queryParameter?: TQueryParameter;
  body?: TBody;
  options?: TRequestOptions;
}

export interface TFetchOptionsWithMethod<TBody = never> extends TFetchOptions<TBody> {
  method: TMethod;
}

/**
 * You can pass it to all Query Fetch interface options
 *
 * @description You can conveniently manage it by passing `fetchOptions` to the Query Fetch API.
 * @see {@link https://query-fetch.gwansik.dev/fetch-options}
 * @experimental This is experimental feature.
 */
export function fetchOptions<TBody = never>(options: TFetchOptions<TBody>): TFetchOptions<TBody> {
  return options;
}
