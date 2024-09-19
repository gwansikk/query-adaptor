import { MSW_BASE_URL } from '@query-fetch/utils';
import { createQueryFetch } from './createQueryFetch';

type TResponseData = {
  id: number;
  title: string;
  body: string;
  userId: number;
};

const queryFetch = createQueryFetch({
  baseURL: MSW_BASE_URL,
});

describe('createQueryFetch', () => {
  it('should handle GET requests', async () => {
    const data = await queryFetch.get<TResponseData>({
      endpoint: ['posts', 1],
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

    const data = await queryFetch.post<{ id: 1 }, TRequestData>({
      endpoint: ['posts', 1],
      body: {
        title: 'title',
        body: 'body',
        userId: 1,
      },
    });

    expectTypeOf(data).toEqualTypeOf<{ id: 1 }>();
    expect(data).toEqual({
      id: 1,
    });
  });

  it('should handle PATCH requests', async () => {
    const data = await queryFetch.patch<TResponseData, { title: string }>({
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
    const data = await queryFetch.delete<{ id: number }>({ endpoint: ['posts', 1] });

    expectTypeOf(data).toEqualTypeOf<{ id: number }>();
    expect(data).toEqual({
      id: 1,
    });
  });
});
