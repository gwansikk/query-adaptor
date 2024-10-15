import type { TQueryParameter } from '../types';

/**
 * Creates a query parameter string from the given path and parameter object.
 *
 * @param path - The base URL path to which the query parameters will be appended.
 * @param parameter - An object representing the query parameters to be added to the URL.
 * @returns The URL path with the query parameters appended as a string.
 */
export function createQueryParameter(path: string, parameter: TQueryParameter): string {
  const searchParams = new URLSearchParams(parameter as Record<string, string>);

  path += `?${searchParams.toString()}`;

  return path;
}
