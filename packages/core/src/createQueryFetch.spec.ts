import { createQueryFetch } from './createQueryFetch';
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

describe('createQueryFetch', () => {
  it('should handle GET requests', async () => {
    const data = await queryFetch.get<TResponseData>({
      endpoint: ['posts', 1],
      body: undefined,
    });

    expectTypeOf(data).toEqualTypeOf<TResponseData>();
    expect(data).toEqual({
      userId: 1,
      id: 1,
      title: 'title',
      body: 'body',
    });
  });

  it('should handle GET requests with query parameter', async () => {
    type TResponseData = {
      postId: number;
      id: number;
      name: string;
      email: string;
      body: string;
    };

    const data = await queryFetch.get<TResponseData[]>({
      endpoint: ['comments'],
      queryParameter: {
        postId: 1,
      },
    });

    expectTypeOf(data).toEqualTypeOf<TResponseData[]>();
    expect(data[0]).toEqual({
      postId: 1,
      id: 1,
      name: 'name',
      email: 'email',
      body: 'body',
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
        title: 'title',
        body: 'body',
        userId: 1,
      },
    });

    expectTypeOf(data).toEqualTypeOf<object>();
    expect(data).toEqual({
      id: 1,
    });
  });

  it('should handle PATCH requests', async () => {
    type TRequestData = {
      title: string;
    };

    const data = await queryFetch.patch<TResponseData, TRequestData>({
      endpoint: ['posts', 1],
      body: {
        title: 'title',
      },
    });

    expectTypeOf(data).toEqualTypeOf<TResponseData>();
    expect(data).toEqual({
      id: 1,
      title: 'title',
      body: 'body',
      userId: 1,
    });
  });

  it('should handle PUT requests', async () => {
    const data = await queryFetch.put<TResponseData>({
      endpoint: ['posts', 1],
      body: {
        id: 1,
        title: 'title',
        body: 'body',
        userId: 1,
      },
    });

    expectTypeOf(data).toEqualTypeOf<TResponseData>();
    expect(data).toEqual({
      id: 1,
      title: 'title',
      body: 'body',
      userId: 1,
    });
  });

  it('should handle DELETE requests', async () => {
    type TResponseData = {
      id: number;
    };

    const data = await queryFetch.delete<TResponseData>({ endpoint: ['post', 1] });

    expectTypeOf(data).toEqualTypeOf<TResponseData>();
    expect(data).toEqual({
      id: 1,
    });
  });
});
