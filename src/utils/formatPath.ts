/**
 * Formats the given path by removing leading and trailing slashes,
 * and replacing multiple consecutive slashes with a single slash.
 *
 * @param path - The path to be formatted.
 * @returns The formatted path.
 */
export function formatPath(path: string): string {
  return path.replace(/^\//, '').replace(/\/+/g, '/').replace(/\/$/, '');
}
