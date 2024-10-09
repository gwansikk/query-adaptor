export type TMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export type TEndpoint = Array<string | number> | string;

export type TQueryParameter = Record<string, string | number | undefined>;

export type TRequestOptions = RequestInit & {
  method?: TMethod;
};

export type TInterceptor<
  TResponse extends Response = Response,
  TRequest extends TRequestOptions = TRequestOptions,
> = (response: TResponse, request: TRequest) => TResponse | Promise<TResponse>;

export type TRequestInterceptor = (request: TRequestOptions) => Promise<TRequestOptions>;

export type TQueryAdaptor<TData> = (path: string, options: TRequestOptions) => Promise<TData>;
