import { createBaseURL } from './createBaseURL';

describe('createBaseURL', () => {
  it('should return a properly formatted URL with https protocol if no protocol is provided', () => {
    const result = createBaseURL('example.com/path');

    expect(result).toBe('https://example.com/path');
  });

  it('should throw an error if URL is not set', () => {
    expect(() => createBaseURL('')).toThrow('The instance does not have a BaseURL set.');
  });

  it('should preserve the provided localhost URL', () => {
    const result = createBaseURL('http://localhost:3000');

    expect(result).toBe('http://localhost:3000');
  });

  it('should preserve the provided protocol', () => {
    const result = createBaseURL('http://example.com/path');

    expect(result).toBe('http://example.com/path');
  });

  it('should remove duplicate slashes', () => {
    const result = createBaseURL('https://example.com//path//to//resource');

    expect(result).toBe('https://example.com/path/to/resource');
  });

  it('should remove the trailing slash', () => {
    const result = createBaseURL('https://example.com/path/');

    expect(result).toBe('https://example.com/path');
  });

  it('should handle URLs with no path', () => {
    const result = createBaseURL('example.com');

    expect(result).toBe('https://example.com');
  });

  it('should handle URLs with path only', () => {
    const result = createBaseURL('/path/to/resource');

    expect(result).toBe('https://path/to/resource');
  });
});
