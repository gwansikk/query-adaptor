export type TMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export type TEndpoint = Array<string | number> | string;

export type TQueryParameter = Record<string, string | number | undefined>;

export type TRequestOptions = Omit<RequestInit, 'body' | 'method'> & {
  method?: TMethod;
  body?: unknown;
  retry?: number;
};

export type TInterceptor<
  TResponse extends Response = Response,
  TRequest extends RequestInit = RequestInit,
> = (response: TResponse, request: TRequest) => TResponse | Promise<TResponse>;

export type TRequestInterceptor = (request: RequestInit) => RequestInit | Promise<RequestInit>;

export type TErrorInterceptor = (error: unknown, request: RequestInit) => void;

export type TQueryAdaptor<TData> = (path: string, options: RequestInit) => Promise<TData>;
