import type { TEndpoint, TMethod, TQueryParameter, TRequestOptions } from './types';

export interface FetchOptions<TData = unknown, TBody = unknown> {
  endpoint: TEndpoint;
  queryParameter?: TQueryParameter;
  body?: TBody;
  options?: TRequestOptions;
  onTry?: (context: TBody | undefined) => void;
  onSuccess?: (context: TBody | undefined, data: TData) => void;
  onCatch?: (context: TBody | undefined) => void;
  onFinally?: (context: TBody | undefined, data: TData) => void;
}

export interface FetchOptionsWithMethod<TData = unknown, TBody = unknown>
  extends FetchOptions<TData, TBody> {
  method: TMethod;
}

/**
 * You can pass it to all Query Fetch interface options
 *
 * @description You can conveniently manage it by passing `fetchOptions` to the Query Fetch API.
 * @see {@link https://query-fetch.gwansik.dev/fetch-options}
 * @experimental This is experimental feature.
 */
export function fetchOptions<TData = unknown, TBody = unknown>(
  options: FetchOptions<TData, TBody>
): FetchOptions<TData, TBody> {
  return options;
}
