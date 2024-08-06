import { describe, it, expect, expectTypeOf } from 'vitest';

import { createQueryFetch } from './queryFetch';
import { fetchOptions } from './fetchOptions';

type TResponseData = {
  id: number;
  title: string;
  body: string;
  userId: number;
};

const queryFetch = createQueryFetch({
  baseURL: 'https://jsonplaceholder.typicode.com',
});

function postsFetchOptions(id: number) {
  return fetchOptions({
    endpoint: ['posts', id],
  });
}

describe('fetchOptions', () => {
  it('should handle GET requests', async () => {
    const data = await queryFetch.get<TResponseData>(postsFetchOptions(1));

    expectTypeOf(data).toEqualTypeOf<TResponseData>();
    expect(data).toEqual({
      userId: 1,
      id: 1,
      title: 'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
      body: 'quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto',
    });
  });

  it('should handle POST requests', async () => {
    type TRequestData = {
      title: string;
      body: string;
      userId: number;
    };

    const data = await queryFetch.post<object, TRequestData>({
      endpoint: ['posts', 1],
      body: {
        title: 'foo',
        body: 'bar',
        userId: 1,
      },
    });

    expectTypeOf(data).toEqualTypeOf<object>();
    expect(data).toEqual({});
  });
});
