/**
 * Checks if the content type of the body is JSON.
 *
 * @param body - The body to check the content type of.
 * @returns A boolean indicating whether the content type is JSON or not.
 */
export function isContentTypeJson<T>(body: T): boolean {
  return !(body instanceof FormData || body instanceof URLSearchParams);
}
