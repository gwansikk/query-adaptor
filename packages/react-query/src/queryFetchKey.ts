import { fetchOptions } from '@query-fetch/core';
import type { ElementTypeof } from './types';

type TKey =
  | ElementTypeof<Parameters<typeof fetchOptions>[0]['endpoint']>
  | Parameters<typeof fetchOptions>[0]['queryParameter'];

/**
 * @experimental This is experimental feature.
 */
export function queryFetchKey<TBodyData>(
  options: Parameters<typeof fetchOptions<TBodyData>>[0],
  additionalKey?: TKey
): TKey[] {
  const key: TKey[] = [...options.endpoint];

  if (options.queryParameter) {
    const filteredObject: Record<string, unknown> = {};
    Object.entries(options.queryParameter).forEach(([param, value]) => {
      if (value !== undefined) {
        filteredObject[param] = value;
      }
    });

    if (Object.keys(filteredObject).length > 0) {
      key.push(filteredObject);
    }
  }

  if (additionalKey) {
    key.push(additionalKey);
  }

  return key;
}
