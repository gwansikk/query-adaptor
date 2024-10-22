import { MSW_BASE_URL } from '@query-adaptor/utils';
import { createQueryAdaptor } from './createQueryAdaptor';

type TResponseData = {
  id: number;
  title: string;
  body: string;
  userId: number;
};

const queryAdaptor = createQueryAdaptor({
  baseURL: MSW_BASE_URL,
});

describe('createQueryAdaptor', () => {
  it('should handle GET requests', async () => {
    const data = await queryAdaptor.get<TResponseData>({
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

    const data = await queryAdaptor.get<TResponseData[]>({
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

    const data = await queryAdaptor.post<{ id: 1 }, TRequestData>({
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
    const data = await queryAdaptor.patch<TResponseData, { title: string }>({
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
    const data = await queryAdaptor.put<TResponseData>({
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
    const data = await queryAdaptor.delete<{ id: number }>({ endpoint: ['posts', 1] });

    expectTypeOf(data).toEqualTypeOf<{ id: number }>();
    expect(data).toEqual({
      id: 1,
    });
  });
});
