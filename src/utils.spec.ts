import { describe, it, expect } from 'vitest';
import { createBaseURL, formatPath } from './utils';

describe('utils', () => {
  describe('createBaseURL', () => {
    const key = 'test';

    it('should return a properly formatted URL with https protocol if no protocol is provided', () => {
      const url = 'example.com/path';
      const result = createBaseURL(key, url);
      expect(result).toBe('https://example.com/path');
    });

    it('should throw an error if URL is not set', () => {
      expect(() => createBaseURL(key, '')).toThrow('Base URL is not set: test');
    });

    it('should preserve the provided protocol', () => {
      const url = 'http://example.com/path';
      const result = createBaseURL(key, url);
      expect(result).toBe('http://example.com/path');
    });

    it('should remove duplicate slashes', () => {
      const url = 'https://example.com//path//to//resource';
      const result = createBaseURL(key, url);
      expect(result).toBe('https://example.com/path/to/resource');
    });

    it('should remove the trailing slash', () => {
      const url = 'https://example.com/path/';
      const result = createBaseURL(key, url);
      expect(result).toBe('https://example.com/path');
    });

    it('should handle URLs with no path', () => {
      const url = 'example.com';
      const result = createBaseURL(key, url);
      expect(result).toBe('https://example.com');
    });

    it('should handle URLs with path only', () => {
      const url = '/path/to/resource';
      const result = createBaseURL(key, url);
      expect(result).toBe('https://path/to/resource');
    });
  });

  describe('formatPath', () => {
    it('should remove leading and trailing slashes', () => {
      const path = '/path/to/resource/';
      const result = formatPath(path);
      expect(result).toBe('path/to/resource');
    });

    it('should replace multiple consecutive slashes with a single slash', () => {
      const path = '/path//to//resource';
      const result = formatPath(path);
      expect(result).toBe('path/to/resource');
    });
  });
});
