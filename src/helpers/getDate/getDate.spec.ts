import { describe, it, expect } from 'vitest';
import { getDate } from '@/helpers';

describe('getDate', () => {
  it('should generate date', () => {
    const date = getDate();

    expect(date).toMatch(/^\d{2}.\d{2}.\d{2}, \d{2}:\d{2}$/);
  });
});
