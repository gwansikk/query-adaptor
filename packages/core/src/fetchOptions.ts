import type { TFetchOptions, TDefaultData } from './types';

/**
 * You can pass it to all Query Fetch interface options
 *
 * @description You can conveniently manage it by passing `fetchOptions` to the Query Fetch API.
 * @see {@link https://query-fetch.gwansik.dev/fetch-options}
 * @experimental This is experimental feature.
 */
export function fetchOptions<TBodyData = TDefaultData>(
  options: TFetchOptions<TBodyData>
): TFetchOptions<TBodyData> {
  return options;
}
