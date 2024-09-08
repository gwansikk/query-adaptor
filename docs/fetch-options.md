# fetchOptions

::: warning
This feature is currently marked as experimental and may change in future versions.
:::

The `fetchOptions` function is an experimental feature that helps configure options for a fetch request. It allows you to define options such as the endpoint, body data, and other request-related parameters, providing flexibility for both GET and POST requests.

## Parameters

- `options`: An object of type `TFetchOptions<TBodyData>` that contains the configuration for the fetch request.
  - `endpoint`: An array of strings that define the endpoint URL.

## Returns

- A `TFetchOptions<TBodyData>` object containing the configured options.

### Example

```ts
const options = fetchOptions<TResponseData>({
  endpoint: ['posts', 1],
});
```

This example returns the options needed to fetch the post with an ID of `1`.
