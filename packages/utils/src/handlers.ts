import { http, HttpResponse } from 'msw';

export const BASE_URL = 'http://localhost:8585';

function createPath(...path: string[]): string {
  return [BASE_URL, ...path].join('/');
}

export const handlers = [
  http.get(createPath('posts', ':id'), async ({ params }) => {
    const { id } = params;

    return HttpResponse.json({
      userId: Number(id),
      id: Number(id),
      title: 'title',
      body: 'body',
    });
  }),
  http.get(createPath('comments'), async ({ request }) => {
    const url = new URL(request.url);
    const postId = url.searchParams.get('postId');

    return HttpResponse.json([
      {
        postId: Number(postId),
        id: 1,
        name: 'name',
        email: 'email',
        body: 'body',
      },
    ]);
  }),
  http.post(createPath('posts', ':id'), async ({ params }) => {
    const { id } = params;

    return HttpResponse.json({
      id: Number(id),
    });
  }),
  http.patch(createPath('posts', ':id'), async ({ params }) => {
    const { id } = params;

    return HttpResponse.json({
      id: Number(id),
      title: 'title',
      body: 'body',
      userId: 1,
    });
  }),
  http.put(createPath('posts', ':id'), async ({ params }) => {
    const { id } = params;

    return HttpResponse.json({
      id: Number(id),
      title: 'title',
      body: 'body',
      userId: 1,
    });
  }),
  http.delete(createPath('post', ':id'), async ({ params }) => {
    const { id } = params;

    return HttpResponse.json({
      id: Number(id),
    });
  }),
];
