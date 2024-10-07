import { beforeAll, afterEach, afterAll } from 'vitest';
import { server } from '@query-adaptor/utils';

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
