import { type FetchOptions } from '@query-fetch/core';
import type { ElementTypeof } from './types';
import { QueryKey } from '@tanstack/react-query';

type TQueryFetchKey<TData, TBody> =
  | ElementTypeof<FetchOptions<TData, TBody>['endpoint']>
  | FetchOptions<TData, TBody>['queryParameter'];

export interface TQueryFetchKeyOptions<TData, TBody> extends FetchOptions<TData, TBody> {
  queryKey?: Array<unknown>;
}

/**
 * You can inject a Fetch Query into the `queryFn` of `useQuery`
 *
 * @experimental This is experimental feature.
 */
export function queryFetchKey<TData, TBody>({
  endpoint,
  queryParameter,
  queryKey,
}: TQueryFetchKeyOptions<TData, TBody>): QueryKey {
  const key: Array<unknown> = [...endpoint];

  if (queryKey) {
    key.push(...queryKey);
  }

  if (queryParameter) {
    const queryKeyFormQueryParameter: Record<string, TQueryFetchKey<TData, TBody>> = {};

    Object.entries(queryParameter).forEach(([param, value]) => {
      if (value !== undefined) {
        queryKeyFormQueryParameter[param] = value as TQueryFetchKey<TData, TBody>;
      }
    });

    if (Object.keys(queryKeyFormQueryParameter).length > 0) {
      key.push(queryKeyFormQueryParameter);
    }
  }

  return key;
}
