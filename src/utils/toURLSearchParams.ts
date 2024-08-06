import type { QueryParameter } from '../types';

export function toURLSearchParams(obj: QueryParameter) {
  const params = new URLSearchParams();

  Object.entries(obj).forEach(([key, value]) => params.append(key, value as string));

  return params;
}
