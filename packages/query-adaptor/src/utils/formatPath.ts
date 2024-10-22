import type { TQueryParameter } from '../types';

export function formatPath(
  path: Array<string | number> | string,
  parameter?: TQueryParameter
): string {
  let url = Array.isArray(path) ? path.join('/') : path;

  if (parameter) {
    const searchParams = new URLSearchParams(parameter as Record<string, string>);

    url += `?${searchParams.toString()}`;
  }

  return url.trim().replace(/^\//, '').replace(/\/+/g, '/').replace(/\/$/, '');
}
