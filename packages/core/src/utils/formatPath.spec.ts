import { formatPath } from './formatPath';

describe('formatPath', () => {
  it('should remove leading and trailing slashes', () => {
    const result = formatPath('/path/to/resource/');

    expect(result).toBe('path/to/resource');
  });

  it('should replace multiple consecutive slashes with a single slash', () => {
    const result = formatPath('/path//to//resource');

    expect(result).toBe('path/to/resource');
  });
});
