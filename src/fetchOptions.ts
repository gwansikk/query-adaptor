import type { FetchOptions, TDefaultBodyData, TQueryParameter } from './types';

/**
 * @experimental This is experimental feature.
 */
export function fetchOptions<TBodyData = TDefaultBodyData>(options: FetchOptions<TBodyData>) {
  const key: (string | number | TQueryParameter)[] = [...options.endpoint];

  if (options.queryParameter) {
    key.push(options.queryParameter);
  }

  return { ...options, key } as const;
}
