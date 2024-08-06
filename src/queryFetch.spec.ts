import { describe, it, expect, beforeEach, expectTypeOf } from 'vitest';

import { createQueryFetch } from './queryFetch';

type TResponseData = {
  id: number;
  title: string;
  body: string;
  userId: number;
};

const queryFetch = createQueryFetch({
  baseURL: 'https://jsonplaceholder.typicode.com',
});

describe('queryFetch', () => {
  it('should handle GET requests', async () => {
    const data = await queryFetch.get<TResponseData>({
      endpoint: ['posts', 1],
    });

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

    const data = await queryFetch.post<TResponseData, TRequestData>({
      endpoint: ['posts', 1],
      body: {
        title: 'foo',
        body: 'bar',
        userId: 1,
      },
    });

    expectTypeOf(data).toEqualTypeOf<TResponseData>();
    expect(data).toEqual({
      id: 101,
      title: 'foo',
      body: 'bar',
      userId: 1,
    });
  });

  it('should handle PATCH requests', async () => {
    const data = await queryFetch.patch<TResponseData>({
      endpoint: ['posts', 1],
      body: {
        title: 'foo',
      },
    });

    expectTypeOf(data).toEqualTypeOf<TResponseData>();
    expect(data).toEqual({
      id: 1,
      title: 'foo',
      body: 'quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto',
      userId: 1,
    });
  });

  it('should handle PUT requests', async () => {
    const data = await queryFetch.put<TResponseData>({
      endpoint: ['posts', 1],
      body: {
        id: 1,
        title: 'foo',
        body: 'bar',
        userId: 1,
      },
    });

    expectTypeOf(data).toEqualTypeOf<TResponseData>();
    expect(data).toEqual({
      id: 1,
      title: 'foo',
      body: 'bar',
      userId: 1,
    });
  });

  it('should handle DELETE requests', async () => {
    const data = await queryFetch.delete({ endpoint: ['post', 1] });

    expectTypeOf(data).toEqualTypeOf<unknown>();
    expect(data).toEqual({});
  });
});
