import { describe, it, expect } from 'vitest';
import { formatPath } from './formatPath';

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
