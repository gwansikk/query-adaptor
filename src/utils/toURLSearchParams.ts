import type { TQueryParameter } from '../types';

/**
 * Converts an object to URLSearchParams.
 * @param obj - The object containing query parameters.
 * @returns The URLSearchParams object.
 */
export function toURLSearchParams(obj: TQueryParameter) {
  const params = new URLSearchParams();

  Object.entries(obj).forEach(([key, value]) => params.append(key, value as string));

  return params;
}
