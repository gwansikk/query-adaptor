import { queryFetch, type TFetchOptions } from '@query-fetch/core';

/**
 * You can inject a Fetch Query into the `queryFn` of `useQuery`
 *
 * @experimental This is experimental feature.
 */
export async function queryFetchFn<TData, TBody = never>(
  options: TFetchOptions<TBody>
): Promise<() => Promise<TData>> {
  return () => queryFetch.get<TData, TBody>(options);
}
