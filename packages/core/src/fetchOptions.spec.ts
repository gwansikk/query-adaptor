import { createQueryFetch } from './createQueryFetch';
import { fetchOptions } from './fetchOptions';
import { BASE_URL } from '@query-fetch/utils';

type TResponseData = {
  id: number;
  title: string;
  body: string;
  userId: number;
};

const queryFetch = createQueryFetch({
  baseURL: BASE_URL,
});

function postsFetchOptions(id: number) {
  return fetchOptions<TResponseData>({
    endpoint: ['posts', id],
  });
}

describe('fetchOptions', () => {
  it('should handle GET requests', async () => {
    const data = await queryFetch.get<TResponseData, TResponseData>(postsFetchOptions(1));

    expectTypeOf(data).toEqualTypeOf<TResponseData>();
    expect(data).toEqual({
      userId: 1,
      id: 1,
      title: 'title',
      body: 'body',
    });
  });

  it('should handle POST requests', async () => {
    type TRequestData = {
      title: string;
      body: string;
      userId: number;
    };

    const data = await queryFetch.post<TResponseData, TRequestData>({
      ...postsFetchOptions(1),
      body: {
        title: 'title',
        body: 'body',
        userId: 1,
      },
    });

    expectTypeOf(data).toEqualTypeOf<TResponseData>();
    expect(data).toEqual({
      id: 1,
    });
  });
});
