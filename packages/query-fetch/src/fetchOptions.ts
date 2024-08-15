import type { FetchOptions, TDefaultBodyData, TQueryParameter } from './types';

type FetchOptionsKey = string | number | TQueryParameter;

/**
 * @experimental This is experimental feature.
 */
export function fetchOptions<TBodyData = TDefaultBodyData>(
  options: FetchOptions<TBodyData>
): FetchOptions<TBodyData> & { key: FetchOptionsKey[] } {
  const key: FetchOptionsKey[] = [...options.endpoint];

  if (options.queryParameter) {
    key.push(options.queryParameter);
  }

  return { ...options, key } as const;
}
