export type TMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export type TDefaultData<TValue = unknown> = Record<string, TValue>;

export type TRequestOptions = RequestInit & {
  method?: TMethod;
};

export type TFetchOptions<TBodyData = TDefaultData, TQueryParameter = TDefaultData> = {
  endpoint: Array<string | number> | string;
  queryParameter?: TQueryParameter;
  body?: TBodyData;
  options?: TRequestOptions;
};

export type TFetchOptionsWithMethod<TBodyData> = TFetchOptions<TBodyData> & {
  method: TMethod;
};

export type TInterceptor<TResponse = Response, TRequest = TRequestOptions> = (
  response: TResponse,
  request: TRequest
) => TResponse | Promise<TResponse>;

export type TRequestInterceptor = (request: TRequestOptions) => Promise<TRequestOptions>;

export type TFetchAdaptor<TData> = (path: string, options: TRequestOptions) => Promise<TData>;
