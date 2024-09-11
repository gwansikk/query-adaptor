import { http, HttpResponse } from 'msw';

export const BASE_URL = 'http://localhost:8585';

function createPath(...path: string[]): string {
  return [BASE_URL, ...path].join('/');
}

export const handlers = [
  http.get(createPath('posts', ':id'), ({ params }) => {
    const { id } = params;

    return HttpResponse.json({
      userId: Number(id),
      id: Number(id),
      title: 'title',
      body: 'body',
    });
  }),
  http.get(createPath('comments'), async ({ request }) => {
    const postId = new URL(request.url).searchParams.get('postId');

    return HttpResponse.json([
      {
        postId: Number(postId),
        id: Number(postId),
        name: 'name',
        email: 'email',
        body: 'body',
      },
    ]);
  }),
  http.post(createPath('posts', ':id'), ({ params }) => {
    const { id } = params;

    return HttpResponse.json({
      id: Number(id),
    });
  }),
  http.patch(createPath('posts', ':id'), async ({ request, params }) => {
    const { id } = params;
    const requestBody = await request.json();

    return HttpResponse.json({
      ...(requestBody as object),
      id: Number(id),
      body: 'body',
      userId: Number(id),
    });
  }),
  http.put(createPath('posts', ':id'), async ({ request, params }) => {
    const { id } = params;
    const requestBody = await request.json();

    return HttpResponse.json({
      ...(requestBody as object),
      id: Number(id),
      userId: Number(id),
    });
  }),
  http.delete(createPath('post', ':id'), ({ params }) => {
    const { id } = params;

    return HttpResponse.json({
      id: Number(id),
    });
  }),
];
