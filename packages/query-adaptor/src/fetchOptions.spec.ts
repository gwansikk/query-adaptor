import { createQueryAdaptor } from './createQueryAdaptor';
import { fetchOptions } from './fetchOptions';
import { MSW_BASE_URL } from '@query-adaptor/utils';

type TResponseData = {
  id: number;
  title: string;
  body: string;
  userId: number;
};

const queryAdaptor = createQueryAdaptor({
  baseURL: MSW_BASE_URL,
});

function postsFetchOptions(id: number) {
  return fetchOptions({
    endpoint: ['posts', id],
  });
}

describe('fetchOptions', () => {
  it('should handle GET requests', async () => {
    const data = await queryAdaptor.get<TResponseData>(postsFetchOptions(1));

    expectTypeOf(data).toEqualTypeOf<TResponseData>();
    expect(data).toEqual({
      userId: 1,
      id: 1,
      title: 'title',
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
      ...postsFetchOptions(1),
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
});
