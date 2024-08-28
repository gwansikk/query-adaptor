import { fetchOptions } from '@query-fetch/core';
import type { ElementTypeof } from './types';

export type TQueryFetchKey =
  | ElementTypeof<Parameters<typeof fetchOptions>[0]['endpoint']>
  | Parameters<typeof fetchOptions>[0]['queryParameter'];

/**
 * @experimental This is experimental feature.
 */
export function queryFetchKey<TBodyData>(
  options: Parameters<typeof fetchOptions<TBodyData>>[0],
  additionalKey?: TQueryFetchKey[]
): TQueryFetchKey[] {
  const key: TQueryFetchKey[] = [...options.endpoint];

  if (additionalKey) {
    key.push(...additionalKey);
  }

  if (options.queryParameter) {
    const filteredObject: Record<string, TQueryFetchKey> = {};

    Object.entries(options.queryParameter).forEach(([param, value]) => {
      if (value !== undefined) {
        filteredObject[param] = value as TQueryFetchKey;
      }
    });

    if (Object.keys(filteredObject).length > 0) {
      key.push(filteredObject);
    }
  }

  return key;
}
