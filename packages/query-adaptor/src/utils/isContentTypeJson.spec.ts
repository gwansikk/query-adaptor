import { isContentTypeJson } from './isContentTypeJson';

describe('isContentTypeJson', () => {
  it('should return true for plain objects', () => {
    const result = isContentTypeJson({ key: 'value' });

    expect(result).toBe(true);
  });

  it('should return true for arrays', () => {
    const result = isContentTypeJson([1, 2, 3]);

    expect(result).toBe(true);
  });

  it('should return true for FormData', () => {
    const formData = new FormData();
    const result = isContentTypeJson(formData);

    expect(result).toBe(true);
  });

  it('should return true for URLSearchParams', () => {
    const params = new URLSearchParams();
    const result = isContentTypeJson(params);

    expect(result).toBe(true);
  });

  it('should return false for string values', () => {
    const result = isContentTypeJson('string value');

    expect(result).toBe(false);
  });

  it('should return false for numbers', () => {
    const result = isContentTypeJson(123);

    expect(result).toBe(false);
  });
});
