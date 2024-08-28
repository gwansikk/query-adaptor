export type THTTPMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export type TEndpoint = Array<string | number> | string;

export type TQueryParameter<TValue = unknown> = Record<string, TValue>;

export type TDefaultBodyData<TValue = unknown> = Record<string, TValue>;

export type TDefaultData<TValue = unknown> = Record<string, TValue>;

export type TRequestOptions = Omit<RequestInit, 'method'> & {
  method?: THTTPMethod;
};

export type TFetchOptions<TBodyData = TDefaultBodyData> = {
  endpoint: TEndpoint;
  queryParameter?: TQueryParameter;
  options?: TRequestOptions;
  body?: TBodyData;
};

export type TFetchOptionsWithMethod<TBodyData> = TFetchOptions<TBodyData> & {
  method: THTTPMethod;
};

export type TResponseData<TData = TDefaultData> = TData;

export type TInterceptor<TResponse = Response, TRequest = TRequestOptions> = (
  response: TResponse,
  request: TRequest
) => TResponse | Promise<TResponse>;

export type TRequestInterceptor = (
  request: TRequestOptions
) => TRequestOptions | Promise<TRequestOptions>;
