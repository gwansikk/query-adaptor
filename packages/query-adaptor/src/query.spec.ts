import { query } from './query';
import { MSW_END_POINT } from '@query-adaptor/utils';

type TResponseData = {
  id: number;
  title: string;
  body: string;
  userId: number;
};

describe('query', () => {
  it('should handle GET requests', async () => {
    const data = await query.get<TResponseData>({
      endpoint: MSW_END_POINT('posts', 1),
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

    const data = await query.get<TResponseData[]>({
      endpoint: MSW_END_POINT('comments'),
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
    type TResponseData = {
      id: number;
    };

    type TRequestData = {
      title: string;
      body: string;
      userId: number;
    };

    const data = await query.post<TResponseData, TRequestData>({
      endpoint: MSW_END_POINT('posts', 1),
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

  it('should handle PATCH requests', async () => {
    const data = await query.patch<TResponseData, { title: string }>({
      endpoint: MSW_END_POINT('posts', 1),
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
    const data = await query.put<TResponseData>({
      endpoint: MSW_END_POINT('posts', 1),
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
    const data = await query.delete<{ id: number }>({
      endpoint: MSW_END_POINT('posts', 1),
    });

    expectTypeOf(data).toEqualTypeOf<{ id: number }>();
    expect(data).toEqual({
      id: 1,
    });
  });

  it('should handle side effects correctly', async () => {
    type TResponseData = {
      id: number;
    };

    type TRequestData = {
      title: string;
      body: string;
      userId: number;
    };

    const body = {
      title: 'title',
      body: 'body',
      userId: 1,
    };

    const data = await query.post<TResponseData, TRequestData>({
      endpoint: MSW_END_POINT('posts', 1),
      body: body,
      onTry: (context) => {
        expectTypeOf(context).toEqualTypeOf<TRequestData | undefined>();
        expect(context).toEqual(body);
      },
      onSuccess: (context, data) => {
        expectTypeOf(context).toEqualTypeOf<TRequestData | undefined>();
        expect(context).toEqual(body);
        expectTypeOf(data).toEqualTypeOf<TResponseData>();
        expect(data).toEqual({ id: 1 });
      },
      onCatch: (context) => {
        expectTypeOf(context).toEqualTypeOf<TRequestData | undefined>();
      },
      onFinally: (context) => {
        expectTypeOf(context).toEqualTypeOf<TRequestData | undefined>();
        expect(context).toEqual(body);
      },
    });

    expectTypeOf(data).toEqualTypeOf<TResponseData>();
    expect(data).toEqual({ id: 1 });
  });

  it('should retry the specified number of times on failure', async () => {
    const retry = 3;
    let count = 0;

    try {
      await query.get({
        endpoint: 'error-url',
        options: {
          retry: retry,
        },
        onCatch: () => {
          count = count + 1;
        },
      });
    } catch (error) {
      expect(error).toBeDefined();
      expect(count).toEqual(4);
    }
  });
});
