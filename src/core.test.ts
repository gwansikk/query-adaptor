import { describe, it, expect, beforeEach, expectTypeOf } from 'vitest';
import type { ChainType } from './types';
import Chain from './core';

describe('requests', () => {
  let chain: ChainType;

  beforeEach(() => {
    // Chain 인스턴스 생성 및 interceptors 설정
    chain = Chain({
      key: 'GET',
      baseURL: 'https://jsonplaceholder.typicode.com',
      interceptors: {
        request: (request) => {
          // 요청을 수정하고 수정된 요청을 반환해야 합니다.
          // 예를 들어, 요청에 특정 헤더를 추가하거나 URL을 수정할 수 있습니다.
          request.headers = {
            ...request.headers,
            Authorization: 'Bearer YOUR_ACCESS_TOKEN',
          };
          return request;
        },
        response: (response) => {
          // 응답을 수정하고 수정된 응답을 반환해야 합니다.
          return response;
        },
        error: (response) => {
          // 에러 응답을 수정하고 수정된 응답을 반환해야 합니다.
          return response;
        },
      },
    });
  });

  it('should handle GET requests', async () => {
    type Request = {
      userId: number;
      id: number;
      title: string;
      body: string;
    };

    const getData = await chain.get<Request>({ url: 'posts/1' });

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

    const postData = await chain.post<Request, Response>({
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

    const patchData = await chain.patch<Request, Response>({
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

    const putData = await chain.put({
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
    const deleteData = await chain.delete({ url: 'posts/1' });

    expectTypeOf(deleteData).toEqualTypeOf<unknown>();
    expect(deleteData).toEqual({});
  });
});
