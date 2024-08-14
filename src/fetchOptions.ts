import type { FetchArgs, TDefaultBodyData, TQueryParameter } from './types';

/**
 * @experimental This is experimental feature.
 */
export function fetchOptions<TBodyData = TDefaultBodyData>(args: FetchArgs<TBodyData>) {
  const key: (string | number | TQueryParameter)[] = [...args.endpoint];

  if (args.queryParameter) {
    key.push(args.queryParameter);
  }

  return { ...args, key } as const;
}
