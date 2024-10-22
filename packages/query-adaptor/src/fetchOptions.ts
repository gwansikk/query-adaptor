import type { TEndpoint, TMethod, TQueryParameter, TRequestOptions } from './types';

export interface FetchOptions<TBody = unknown> extends TRequestOptions {
  endpoint: TEndpoint;
  queryParameter?: TQueryParameter;
  body?: TBody;
  onTry?: (body: TBody | undefined) => void;
  onSuccess?: (body: TBody | undefined, response: Response) => void;
  onCatch?: (body: TBody | undefined) => void;
  onFinally?: (body: TBody | undefined) => void;
}

export interface FetchOptionsWithMethod<TBody = unknown> extends FetchOptions<TBody> {
  method: TMethod;
}

/**
 * You can pass it to all Query Fetch interface options
 *
 * @description You can conveniently manage it by passing `fetchOptions` to the Query Fetch API.
 * @see {@link https://query-adaptor.gwansik.dev/fetch-options.html}
 * @experimental This is experimental feature.
 */
export function fetchOptions<TBody = unknown>(options: FetchOptions<TBody>): FetchOptions<TBody> {
  return options;
}
