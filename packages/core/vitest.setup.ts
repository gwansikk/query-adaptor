import { beforeAll, afterEach, afterAll } from 'vitest';
import { server } from '@query-fetch/utils';

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
