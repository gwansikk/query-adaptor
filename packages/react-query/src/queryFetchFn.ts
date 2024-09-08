import { queryFetch, fetchOptions } from '@query-fetch/core';

/**
 * @experimental This is experimental feature.
 */
export async function queryFetchFn<TData, TBodyData = never>(
  options: Parameters<typeof fetchOptions<TBodyData>>[0]
): Promise<() => Promise<TData>> {
  return () => queryFetch.get<TData, TBodyData>(options);
}
