/**
 * Formats the given path by removing leading and trailing slashes,
 * and replacing multiple consecutive slashes with a single slash.
 *
 * @param path - The path to be formatted.
 * @returns The formatted path.
 */
export function formatPath(path: Array<string | number> | string): string {
  if (Array.isArray(path)) {
    path = path.join('/');
  }

  return path.replace(/^\//, '').replace(/\/+/g, '/').replace(/\/$/, '');
}
