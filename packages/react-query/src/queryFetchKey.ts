import { fetchOptions } from '@query-fetch/core';

/**
 * @experimental This is experimental feature.
 */
export function queryFetchKey<TBodyData>(
  options: Parameters<typeof fetchOptions<TBodyData>>
): ReturnType<typeof fetchOptions>['key'] {
  return fetchOptions(...options).key;
}
