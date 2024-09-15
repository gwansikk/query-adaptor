import { type TFetchOptions } from '@query-fetch/core';
import type { ElementTypeof } from './types';
import { QueryKey } from '@tanstack/react-query';

export interface TQueryFetchKeyOptions<TBody, TQueryParameter, TEndpoint>
  extends TFetchOptions<TBody, TQueryParameter, TEndpoint> {
  queryKey?: Array<unknown>;
}

type TQueryFetchKey<TBody, TQueryParameter, TEndpoint> =
  | ElementTypeof<TFetchOptions<TBody, TQueryParameter, TEndpoint>['endpoint']>
  | TFetchOptions<TBody, TQueryParameter, TEndpoint>['queryParameter'];

/**
 * You can inject a Fetch Query into the `queryFn` of `useQuery`
 *
 * @experimental This is experimental feature.
 */
export function queryFetchKey<TBody, TEndpoint extends QueryKey, TQueryParameter>({
  endpoint,
  queryParameter,
  queryKey,
}: TQueryFetchKeyOptions<TBody, TEndpoint, TQueryParameter>): QueryKey {
  const key = [...endpoint];

  if (queryKey) {
    key.push(...queryKey);
  }

  if (queryParameter) {
    const queryKeyFormQueryParameter: Record<
      string,
      TQueryFetchKey<TBody, TQueryParameter, TEndpoint>
    > = {};

    Object.entries(queryParameter).forEach(([param, value]) => {
      if (value !== undefined) {
        queryKeyFormQueryParameter[param] = value as TQueryFetchKey<
          TBody,
          TQueryParameter,
          TEndpoint
        >;
      }
    });

    if (Object.keys(queryKeyFormQueryParameter).length > 0) {
      key.push(queryKeyFormQueryParameter);
    }
  }

  return key;
}
