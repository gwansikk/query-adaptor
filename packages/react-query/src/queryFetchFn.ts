import { queryFetch, fetchOptions } from '@query-fetch/core';

/**
 * You can inject a Fetch Query into the `queryFn` of `useQuery`
 *
 * @experimental This is experimental feature.
 */
export async function queryFetchFn<TData, TBodyData = never>(
  options: Parameters<typeof fetchOptions<TBodyData>>[0]
): Promise<() => Promise<TData>> {
  return () => queryFetch.get<TData, TBodyData>(options);
}
