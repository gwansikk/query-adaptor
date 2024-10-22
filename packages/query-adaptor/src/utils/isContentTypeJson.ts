export function isContentTypeJson<T>(body: T): boolean {
  return typeof body === 'object' && body !== null;
}
