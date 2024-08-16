import type { FetchOptions, TDefaultBodyData } from './types';

/**
 * @experimental This is experimental feature.
 */
export function fetchOptions<TBodyData = TDefaultBodyData>(
  options: FetchOptions<TBodyData>
): FetchOptions<TBodyData> {
  return options;
}
