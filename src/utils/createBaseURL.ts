import { formatPath } from './formatPath';

/**
 * Creates a base URL by combining a key and a URL.
 * @param url - The URL to be combined with the key.
 * @returns The combined base URL.
 * @throws {Error} If the URL is not provided.
 */
export function createBaseURL(url: string): string {
  if (!url) {
    throw new Error('The instance does not have a BaseURL set.');
  }

  const match = RegExp(/^(https?:\/\/)?(.*)$/).exec(url);
  const protocol = match?.[1] ?? 'https://';
  const baseUrl = formatPath(match?.[2] ?? '');

  return protocol + baseUrl;
}
