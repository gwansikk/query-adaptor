import { type TFetchOptions } from '@query-fetch/core';
import type { ElementTypeof } from './types';
import { QueryKey } from '@tanstack/react-query';

type TQueryFetchKey<TBody> =
  | ElementTypeof<TFetchOptions<TBody>['endpoint']>
  | TFetchOptions<TBody>['queryParameter'];

export interface TQueryFetchKeyOptions<TBody> extends TFetchOptions<TBody> {
  queryKey?: Array<unknown>;
}

/**
 * You can inject a Fetch Query into the `queryFn` of `useQuery`
 *
 * @experimental This is experimental feature.
 */
export function queryFetchKey<TBody>({
  endpoint,
  queryParameter,
  queryKey,
}: TQueryFetchKeyOptions<TBody>): QueryKey {
  const key: Array<unknown> = [...endpoint];

  if (queryKey) {
    key.push(...queryKey);
  }

  if (queryParameter) {
    const queryKeyFormQueryParameter: Record<string, TQueryFetchKey<TBody>> = {};

    Object.entries(queryParameter).forEach(([param, value]) => {
      if (value !== undefined) {
        queryKeyFormQueryParameter[param] = value as TQueryFetchKey<TBody>;
      }
    });

    if (Object.keys(queryKeyFormQueryParameter).length > 0) {
      key.push(queryKeyFormQueryParameter);
    }
  }

  return key;
}
