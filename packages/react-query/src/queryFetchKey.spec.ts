import { fetchOptions } from 'query-adaptor';
import { queryFetchKey } from './queryFetchKey';
import { queryOptions } from '@tanstack/react-query';

function postsFetchOptions(id: number, filter?: 'latest' | 'popular') {
  return fetchOptions({
    endpoint: ['posts', id],
    queryParameter: { filter },
  });
}

describe('queryFetchKey', () => {
  it('should generate the correct key', async () => {
    const key = queryFetchKey({ ...postsFetchOptions(1) });
    const queryKey = queryOptions({ queryKey: key }).queryKey;

    expect(key).toEqual(['posts', 1]);
    expect(queryKey).toEqual(['posts', 1]);
  });

  it('should generate the correct key with queryParameter', async () => {
    const key = queryFetchKey(postsFetchOptions(1, 'latest'));
    const queryKey = queryOptions({ queryKey: key }).queryKey;

    expect(key).toEqual(['posts', 1, { filter: 'latest' }]);
    expect(queryKey).toEqual(['posts', 1, { filter: 'latest' }]);
  });

  it('should generate the correct key with additionalKey', async () => {
    const key = queryFetchKey({
      ...postsFetchOptions(1),
      queryKey: ['additionalKey', { id: 1 }],
    });
    const queryKey = queryOptions({ queryKey: key }).queryKey;

    expect(key).toEqual(['posts', 1, 'additionalKey', { id: 1 }]);
    expect(queryKey).toEqual(['posts', 1, 'additionalKey', { id: 1 }]);
  });
});
