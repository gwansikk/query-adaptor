import type { TFetchOptions, TDefaultData } from './types';

/**
 * @experimental This is experimental feature.
 * @see {@link https://query-fecth.offlegacy.org/fetch-options}
 */
export function fetchOptions<TBodyData = TDefaultData>(
  options: TFetchOptions<TBodyData>
): TFetchOptions<TBodyData> {
  return options;
}
