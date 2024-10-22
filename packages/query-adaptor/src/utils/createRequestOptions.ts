import { FetchOptionsWithMethod } from '../fetchOptions';

import { isContentTypeJson } from './isContentTypeJson';

export function createRequestOptions<TBody>(options: FetchOptionsWithMethod<TBody>): RequestInit {
  const isJson = isContentTypeJson(options.body);
  const headers = new Headers();

  if (isContentTypeJson(options.body)) {
    headers.set('Content-Type', 'application/json');
  }

  const requestOptions: RequestInit = Object.assign(options, {
    method: options.method,
    headers: headers,
    body: isJson ? JSON.stringify(options.body) : (options.body as BodyInit),
  });

  return requestOptions;
}
