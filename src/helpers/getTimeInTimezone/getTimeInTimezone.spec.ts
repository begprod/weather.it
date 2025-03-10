import { describe, it, expect } from 'vitest';
import { getTimeInTimezone } from '@/helpers';

describe('getDate', () => {
  it('should generate time from timezone shift', () => {
    const date = getTimeInTimezone(14400);

    expect(date).toMatch(/^\d{2}:\d{2}$/);
  });
});
