import { FetchOptions, query } from 'query-adaptor';
/**
 * You can inject a Fetch Query into the `queryFn` of `useQuery`
 *
 * @experimental This is experimental feature.
 */
export async function queryFetchFn<TData, TBody = never>(
  fetchOptions: FetchOptions<TBody>
): Promise<() => Promise<TData>> {
  return {
    GET: () => query.get<TData, TBody>(fetchOptions),
    POST: () => query.post<TData, TBody>(fetchOptions),
    PATCH: () => query.patch<TData, TBody>(fetchOptions),
    DELETE: () => query.delete<TData, TBody>(fetchOptions),
    PUT: () => query.put<TData, TBody>(fetchOptions),
  }[fetchOptions.method ?? 'GET'];
}
