export const log = (title: string, massage: string): void => {
  console.warn('[chain]', `${title}: `, massage);
};

export const createBaseURL = (url: string): string => {
  const match = url.match(/^(https?:\/\/)?(.*)$/);
  const protocol = match ? match[1] || 'https://' : 'https://';
  let restOfUrl = match ? match[2] : url;

  restOfUrl = restOfUrl.replace(/\/\/+/g, '/');

  if (restOfUrl.endsWith('/')) {
    restOfUrl = restOfUrl.substring(0, restOfUrl.length - 1);
  }

  return protocol + restOfUrl;
};

export const formatPath = (path: string): string => {
  return path.replace(/^\//, '').replace(/\/+/g, '/');
};
