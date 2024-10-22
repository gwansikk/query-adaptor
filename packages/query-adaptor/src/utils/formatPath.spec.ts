import { formatPath } from './formatPath';

describe('formatPath', () => {
  it('should trim spaces from the path', () => {
    const result = formatPath(' path to resource ');

    expect(result).toBe('path to resource');
  });

  it('should remove leading and trailing slashes', () => {
    const result = formatPath('/path/to/resource/');

    expect(result).toBe('path/to/resource');
  });

  it('should replace multiple consecutive slashes with a single slash', () => {
    const result = formatPath('/path//to//resource');

    expect(result).toBe('path/to/resource');
  });

  it('should handle an array of strings and numbers', () => {
    const result = formatPath(['path', 'to', 'resource', 123]);

    expect(result).toBe('path/to/resource/123');
  });

  it('should handle an empty string', () => {
    const result = formatPath('');

    expect(result).toBe('');
  });

  it('should handle an empty array', () => {
    const result = formatPath([]);

    expect(result).toBe('');
  });

  it('should handle a single string without slashes', () => {
    const result = formatPath('resource');

    expect(result).toBe('resource');
  });
});
