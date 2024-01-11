import { describe, it, expect } from 'vitest';
import ServerChain from '../src';

describe('ServerChain Test', () => {
  it('should create an instance of ServerChain', () => {
    const server = ServerChain({
      key: 'INSTANCE',
      baseURL: 'https://jsonplaceholder.typicode.com',
      headers: { 'Content-Type': 'application/json' },
    });
    expect(server).toBeTruthy();
  });

  it('should handle request and response interceptors', async () => {
    // ServerChain 인스턴스 생성 및 interceptors 설정
    const server = ServerChain({
      key: 'GET',
      baseURL: 'https://jsonplaceholder.typicode.com',
      headers: { 'Content-Type': 'application/json' },
      interceptors: {
        request: request => {
          console.log('** request interceptor **');
          // 요청을 수정하고 수정된 요청을 반환해야 합니다.
          // 예를 들어, 요청에 특정 헤더를 추가하거나 URL을 수정할 수 있습니다.
          request.headers = {
            ...request.headers,
            Authorization: 'Bearer YOUR_ACCESS_TOKEN',
          };
          return request;
        },
        response: response => {
          console.log('** response interceptor **');
          // 응답을 수정하고 수정된 응답을 반환해야 합니다.
          return response;
        },
        error: response => {
          console.log('** error interceptor **');
          // 에러 응답을 수정하고 수정된 응답을 반환해야 합니다.
          return response;
        },
      },
    });

    // server.get 호출
    const response = await server.get({ url: 'posts/1' });
    expect(response).toEqual({
      userId: 1,
      id: 1,
      title: 'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
      body:
        'quia et suscipit\n' +
        'suscipit recusandae consequuntur expedita et cum\n' +
        'reprehenderit molestiae ut ut quas totam\n' +
        'nostrum rerum est autem sunt rem eveniet architecto',
    });
  });
});
