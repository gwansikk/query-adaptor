import { createBaseURL } from './createBaseURL';

describe('createBaseURL', () => {
  it('should return a properly formatted URL with https protocol if no protocol is provided', () => {
    const url = 'example.com/path';
    const result = createBaseURL(url);
    expect(result).toBe('https://example.com/path');
  });

  it('should throw an error if URL is not set', () => {
    expect(() => createBaseURL('')).toThrow('The instance does not have a BaseURL set.');
  });

  it('should preserve the provided protocol', () => {
    const url = 'http://example.com/path';
    const result = createBaseURL(url);
    expect(result).toBe('http://example.com/path');
  });

  it('should remove duplicate slashes', () => {
    const url = 'https://example.com//path//to//resource';
    const result = createBaseURL(url);
    expect(result).toBe('https://example.com/path/to/resource');
  });

  it('should remove the trailing slash', () => {
    const url = 'https://example.com/path/';
    const result = createBaseURL(url);
    expect(result).toBe('https://example.com/path');
  });

  it('should handle URLs with no path', () => {
    const url = 'example.com';
    const result = createBaseURL(url);
    expect(result).toBe('https://example.com');
  });

  it('should handle URLs with path only', () => {
    const url = '/path/to/resource';
    const result = createBaseURL(url);
    expect(result).toBe('https://path/to/resource');
  });
});
