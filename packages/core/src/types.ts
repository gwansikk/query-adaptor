import type { TFetchOptions } from './fetchOptions';

export type TMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export type TDefaultBody = Record<string, unknown>;

export type TDefaultEndpoint = Array<string | number> | string;

export type TDefaultQueryParameter = Record<string, unknown>;

export type TRequestOptions = RequestInit & {
  method?: TMethod;
};

export type TInterceptor<
  TResponse extends Response = Response,
  TRequest extends TRequestOptions = TRequestOptions,
> = (response: TResponse, request: TRequest) => TResponse | Promise<TResponse>;

export type TRequestInterceptor = (request: TRequestOptions) => Promise<TRequestOptions>;

export type TFetchAdaptor<TData> = (path: string, options: TRequestOptions) => Promise<TData>;

export type TFetchOptionsWithMethod<
  TBody = TDefaultBody,
  TEndpoint = TDefaultEndpoint,
  TQueryParameter = TDefaultQueryParameter,
> = TFetchOptions<TBody, TEndpoint, TQueryParameter> & {
  method: TMethod;
};
