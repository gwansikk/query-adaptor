# createQueryFetch

`CreateQueryFetch` is a utility function that allows you to create a customized `QueryFetch` instance. This instance can be configured with a base URL, default headers, and interceptors for requests, responses, and errors. The instance provides flexibility in managing HTTP requests by applying global settings across multiple requests.

## Key Features

- Allows setting global headers for all requests
- Customizable request and response interceptors
- Error handling through an error interceptor
- Reusable instance with consistent configuration

## setHeaders

Sets or updates the default headers for the `QueryFetch` instance. These headers are automatically included in every request made by this instance.

### Parameters

- `newHeaders`: A `HeadersInit` object that contains the headers to be added or updated.

### Example

```ts
queryFetch.setHeaders({
  Authorization: 'Bearer token',
  'Content-Type': 'application/json',
});
```

In this example, all subsequent requests made by the `queryFetch` instance will automatically include the `Authorization` and `Content-Type` headers.

## setRequestInterceptor

Sets a request interceptor function to modify or inspect the request before it is sent to the server. This is useful for adding additional logic, such as authentication tokens, before making the request.

### Parameters

- `interceptor`: A function that takes the `request` object as a parameter and returns a modified `request` object.

### Example

```ts
queryFetch.setRequestInterceptor((request) => {
  request.headers['Authorization'] = 'Bearer newToken';
  console.log('Request intercepted:', request);
  return request;
});
```

In this example, the request interceptor adds an authorization token to every request before it is sent.

## setResponseInterceptor

Sets a response interceptor function to modify or inspect the response after it is received. This is useful for transforming response data or handling specific status codes globally.

### Parameters

- `interceptor`: A function that takes the `response` object as a parameter and returns a modified or original `response`.

### Example

```ts
queryFetch.setResponseInterceptor(async (response) => {
  if (response.status === 200) {
    console.log('Response received successfully:', response);
  }
  return response;
});
```

This example logs every successful response and allows you to modify or handle the response globally.

## setErrorInterceptor

Sets an error interceptor function to handle errors globally when the server returns a status code of 400 or above. This is useful for logging errors or handling authentication failures.

### Parameters

- `interceptor`: A function that takes the `error` response and the original request as parameters. It returns the handled error response.

### Example

```ts
queryFetch.setErrorInterceptor(async (response, request) => {
  if (response.status === 401) {
    console.error('Unauthorized access - refreshing token');
    // Optionally refresh token logic can go here
  }
  return response;
});
```

In this example, an error interceptor checks if the response status is 401 (Unauthorized) and logs the error or handles token refreshing.

## Creating a QueryFetch Instance

The `createQueryFetch` function returns an instance of `QueryFetch` that can be reused across multiple requests. You can customize the base URL, headers, and interceptors during the creation of the instance.

### Example

```ts
const queryFetch = createQueryFetch({
  baseURL: 'https://api.example.com',
  headers: {
    'Content-Type': 'application/json',
  },
});

queryFetch.setHeaders({
  Authorization: 'Bearer token',
});

queryFetch.setRequestInterceptor((request) => {
  console.log('Intercepting request:', request);
  return request;
});

queryFetch.setResponseInterceptor((response) => {
  console.log('Intercepting response:', response);
  return response;
});

queryFetch.setErrorInterceptor((response) => {
  console.log('Handling error:', response);
  return response;
});
```
