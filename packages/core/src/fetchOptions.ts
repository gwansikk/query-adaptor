import type { TFetchOptions, TDefaultBodyData } from './types';

/**
 * @experimental This is experimental feature.
 */
export function fetchOptions<TBodyData = TDefaultBodyData>(
  options: TFetchOptions<TBodyData>
): TFetchOptions<TBodyData> {
  return options;
}
