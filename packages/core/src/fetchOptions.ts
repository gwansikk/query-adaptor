import type { TFetchOptions, TDefaultBodyData } from './types';

/**
 * @experimental This is experimental feature.
 * @see {@link https://query-fecth.offlegacy.org/fetch-options}
 */
export function fetchOptions<TBodyData = TDefaultBodyData>(
  options: TFetchOptions<TBodyData>
): TFetchOptions<TBodyData> {
  return options;
}
