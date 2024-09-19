import { http, HttpResponse } from 'msw';

export const MSW_BASE_URL = 'http://localhost:8585';

export const MSW_END_POINT = (...path: Array<string | number>) => [MSW_BASE_URL, ...path].join('/');

export const handlers = [
  http.get(MSW_END_POINT('posts', ':id'), ({ params }) => {
    const { id } = params;

    return HttpResponse.json({
      userId: Number(id),
      id: Number(id),
      title: 'title',
      body: 'body',
    });
  }),
  http.get(MSW_END_POINT('comments'), async ({ request }) => {
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
  http.post(MSW_END_POINT('posts', ':id'), ({ params }) => {
    const { id } = params;

    return HttpResponse.json({
      id: Number(id),
    });
  }),
  http.patch(MSW_END_POINT('posts', ':id'), async ({ request, params }) => {
    const { id } = params;
    const requestBody = await request.json();

    return HttpResponse.json({
      ...(requestBody as object),
      id: Number(id),
      body: 'body',
      userId: Number(id),
    });
  }),
  http.put(MSW_END_POINT('posts', ':id'), async ({ request, params }) => {
    const { id } = params;
    const requestBody = await request.json();

    return HttpResponse.json({
      ...(requestBody as object),
      id: Number(id),
      userId: Number(id),
    });
  }),
  http.delete(MSW_END_POINT('posts', ':id'), ({ params }) => {
    const { id } = params;

    return HttpResponse.json({
      id: Number(id),
    });
  }),
];
