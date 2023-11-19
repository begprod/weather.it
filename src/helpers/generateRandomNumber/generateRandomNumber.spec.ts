import { describe, it, expect } from 'vitest';
import { generateRandomNumber } from '@/helpers';

describe('generateRandomNumber', () => {
  it('correct generate random number', () => {
    const randomNumber = generateRandomNumber(1, 10);

    expect(randomNumber).toBeGreaterThanOrEqual(1);
    expect(randomNumber).toBeLessThanOrEqual(10);
  });
});
