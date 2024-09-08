# queryFetch

`QueryFetch` is a library designed to simplify HTTP requests by providing easy-to-use methods for GET, POST, PATCH, PUT, and DELETE operations. It acts as an abstraction over the Fetch API, making it easier to handle requests and manage common concerns such as JSON handling, headers, and query parameters.

## Key Features

- Supports `GET`, `POST`, `PATCH`, `PUT`, and `DELETE` HTTP methods
- Customizable via the `fetchAdaptor`
- Automatically handles JSON request/response bodies
- Easily appends query parameters to URLs

## Request

Performs an HTTP request with the given method. This function is the core of the library and is used internally by all other methods.

### Parameters

- `options`: Configuration for the request.
  - `method`: HTTP method (`GET`, `POST`, `PATCH`, `PUT`, `DELETE`)
  - `endpoint`: The endpoint URL as an array of strings.
  - `queryParameter`: Optional query parameters.
  - `body`: Request payload, typically used in `POST`, `PUT`, and `PATCH` requests.
  - `options`: Additional request options such as headers.
- `fetchAdaptor`: (Optional) A custom fetch adapter for handling requests.

### Returns

- A `Promise<TResponseData<TData>>` containing the response data.

### Example

```ts
const data = await queryFetch.request<TResponseData, never>({
  method: 'GET',
  endpoint: ['https://api.example.com', 'items', '1'],
});
```

## Get

Handles HTTP `GET` requests. Use this method to fetch data from the server.

### Parameters

- `options`: Configuration for the GET request, including the endpoint and any query parameters.
- `fetchAdaptor`: (Optional) A custom fetch adapter for handling requests.

### Example

```ts
const data = await queryFetch.get<TResponseData>({
  endpoint: ['https://jsonplaceholder.typicode.com', 'posts', 1],
});
```

## Post

Handles HTTP `POST` requests. Use this method to send data to the server.

### Example

```ts
const response = await queryFetch.post<TResponseData, TRequestData>({
  endpoint: ['https://jsonplaceholder.typicode.com', 'posts'],
  body: {
    title: 'foo',
    body: 'bar',
    userId: 1,
  },
});
```

## Patch

Handles HTTP `PATCH` requests. Use this method to update part of a resource on the server.

### Example

```ts
const response = await queryFetch.patch<TResponseData, TRequestData>({
  endpoint: ['https://jsonplaceholder.typicode.com', 'posts', 1],
  body: {
    title: 'updated title',
  },
});
```

## Put

Handles HTTP `PUT` requests. Use this method to replace a resource on the server.

### Example

```ts
const response = await queryFetch.put<TResponseData>({
  endpoint: ['https://jsonplaceholder.typicode.com', 'posts', 1],
  body: {
    id: 1,
    title: 'foo',
    body: 'bar',
    userId: 1,
  },
});
```

## Delete

Handles HTTP `DELETE` requests. Use this method to remove a resource from the server.

### Example

```ts
const response = await queryFetch.delete({
  endpoint: ['https://jsonplaceholder.typicode.com', 'posts', 1],
});
```

## FetchAdaptor

Each method accepts an optional `fetchAdaptor` parameter.
