import { fetchOptions } from '@query-fetch/core';
import { queryFetchKey } from './queryFetchKey';

type TResponseData = {
  id: number;
  title: string;
  body: string;
  userId: number;
};

function postsFetchOptions(id: number, filter?: 'latest' | 'popular') {
  return fetchOptions<TResponseData>({
    endpoint: ['posts', id],
    queryParameter: { filter },
  });
}

describe('queryFetchKey', () => {
  it('should generate the correct key', async () => {
    const key = queryFetchKey(postsFetchOptions(1));

    expect(key).toEqual(['posts', 1]);
  });

  it('should generate the correct key with queryParameter', async () => {
    const key = queryFetchKey(postsFetchOptions(1, 'latest'));

    expect(key).toEqual(['posts', 1, { filter: 'latest' }]);
  });

  it('should generate the correct key with additionalKey', async () => {
    const key = queryFetchKey(postsFetchOptions(1), ['additionalKey']);

    expect(key).toEqual(['posts', 1, 'additionalKey']);
  });
});
