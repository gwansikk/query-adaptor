import { describe, it, expect, beforeEach, expectTypeOf } from 'vitest';
import type { QueryFetch } from './types';
import { createQueryFetch } from './queryFetch';

describe('requests', () => {
  let queryFetch: QueryFetch;

  beforeEach(() => {
    queryFetch = createQueryFetch({
      key: 'GET',
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
  });

  it('should handle GET requests', async () => {
    type Request = {
      userId: number;
      id: number;
      title: string;
      body: string;
    };

    const getData = await queryFetch.get<Request>({ url: 'posts/1' });

    expectTypeOf(getData).toEqualTypeOf<Request>();
    expect(getData).toEqual({
      userId: 1,
      id: 1,
      title: 'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
      body: 'quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto',
    });
  });

  it('should handle POST requests', async () => {
    type Request = {
      title: string;
      body: string;
      userId: number;
    };

    type Response = {
      id: number;
      title: string;
      body: string;
      userId: number;
    };

    const postData = await queryFetch.post<Request, Response>({
      url: 'posts',
      body: {
        title: 'foo',
        body: 'bar',
        userId: 1,
      },
    });

    expectTypeOf(postData).toEqualTypeOf<Response>();
    expect(postData).toEqual({
      id: 101,
      title: 'foo',
      body: 'bar',
      userId: 1,
    });
  });

  it('should handle PATCH requests', async () => {
    type Request = {
      title: string;
    };

    type Response = {
      id: number;
      title: string;
      body: string;
      userId: number;
    };

    const patchData = await queryFetch.patch<Request, Response>({
      url: 'posts/1',
      body: {
        title: 'foo',
      },
    });

    expectTypeOf(patchData).toEqualTypeOf<Response>();
    expect(patchData).toEqual({
      id: 1,
      title: 'foo',
      body: 'quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto',
      userId: 1,
    });
  });

  it('should handle PUT requests', async () => {
    type Request = {
      id: number;
      title: string;
      body: string;
      userId: number;
    };

    const putData = await queryFetch.put({
      url: 'posts/1',
      body: {
        id: 1,
        title: 'foo',
        body: 'bar',
        userId: 1,
      },
    });

    expectTypeOf(putData).toEqualTypeOf<Request>();
    expect(putData).toEqual({
      id: 1,
      title: 'foo',
      body: 'bar',
      userId: 1,
    });
  });

  it('should handle DELETE requests', async () => {
    const deleteData = await queryFetch.delete({ url: 'posts/1' });

    expectTypeOf(deleteData).toEqualTypeOf<unknown>();
    expect(deleteData).toEqual({});
  });
});
