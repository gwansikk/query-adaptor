export function isContentTypeJson<T>(body: T): boolean {
  return !(body instanceof FormData || body instanceof URLSearchParams);
}
