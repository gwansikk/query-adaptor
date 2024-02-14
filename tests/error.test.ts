import { describe, it, expect } from 'vitest';
import ServerChain from '../src';

describe('ServerChain error', () => {
  it.each([
    ['', ''], // baseURL이 빈 문자열인 경우
    [undefined, 'undefined'], // baseURL이 undefined인 경우
  ])('should throw an error if the base URL is not set baseURL: %s', (baseURL, expectedMessage) => {
    expect(() =>
      ServerChain({
        baseURL,
      })
    ).toThrowError(`Base URL is not set: ${expectedMessage}`);
  });
});
