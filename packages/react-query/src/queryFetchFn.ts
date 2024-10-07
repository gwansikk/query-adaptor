import { FetchOptions, query } from 'query-adaptor';
/**
 * You can inject a Fetch Query into the `queryFn` of `useQuery`
 *
 * @experimental This is experimental feature.
 */
export async function queryFetchFn<TData, TBody = never>(
  options: FetchOptions<TData, TBody>
): Promise<() => Promise<TData>> {
  return () => query.get<TData, TBody>(options);
}
