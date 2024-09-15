import type {
  TDefaultBody,
  TDefaultEndpoint,
  TDefaultQueryParameter,
  TRequestOptions,
} from './types';

export interface TFetchOptions<
  TBody = TDefaultBody,
  TEndpoint = TDefaultEndpoint,
  TQueryParameter = TDefaultQueryParameter,
> {
  endpoint: TEndpoint;
  queryParameter?: TQueryParameter;
  body?: TBody;
  options?: TRequestOptions;
}

/**
 * You can pass it to all Query Fetch interface options
 *
 * @description You can conveniently manage it by passing `fetchOptions` to the Query Fetch API.
 * @see {@link https://query-fetch.gwansik.dev/fetch-options}
 * @experimental This is experimental feature.
 */
export function fetchOptions<
  TBody = TDefaultBody,
  TEndpoint = TDefaultEndpoint,
  TQueryParameter = TDefaultQueryParameter,
>(
  options: TFetchOptions<TBody, TEndpoint, TQueryParameter>
): TFetchOptions<TBody, TEndpoint, TQueryParameter> {
  return options;
}
