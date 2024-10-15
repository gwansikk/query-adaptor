import { FetchOptionsWithMethod } from '../fetchOptions';
import type { TRequestOptions } from '../types';
import { isContentTypeJson } from './isContentTypeJson';

/**
 * Creates request options for a fetch call.
 *
 * @param {FetchOptionsWithMethod<TData, TBody>} options - The options for the fetch request, including method, headers, and body.
 * @returns {TRequestOptions} The formatted request options, including method, headers, and body.
 */
export function createRequestOptions<TData, TBody>(
  options: FetchOptionsWithMethod<TData, TBody>
): TRequestOptions {
  const isJson = isContentTypeJson(options.body);

  const requestOptions: TRequestOptions = {
    ...options,
    method: options.method,
    headers: {
      'Content-Type': isJson ? 'application/json' : '',
      ...options.options?.headers,
    },
    body: isJson ? JSON.stringify(options.body) : (options.body as BodyInit),
  };

  return requestOptions;
}
