import { describe, it, expect } from 'vitest';
import { formatDateToLong } from '../formatDate';

describe('formatDateToLong', () => {
  it('should format a valid YYYY-MM-DD date string to a long format in pt-BR', () => {
    const dateString = '2024-07-26';
    const expected = '26 de julho de 2024';
    expect(formatDateToLong(dateString)).toBe(expected);
  });

  it('should handle another valid date correctly', () => {
    const dateString = '2023-01-15';
    const expected = '15 de janeiro de 2023';
    expect(formatDateToLong(dateString)).toBe(expected);
  });

  it('should return the original string if the format is not YYYY-MM-DD', () => {
    const invalidDateString = '26/07/2024';
    expect(formatDateToLong(invalidDateString)).toBe(invalidDateString);
  });

  it('should return the original string for a non-date string', () => {
    const nonDateString = 'not a date';
    expect(formatDateToLong(nonDateString)).toBe(nonDateString);
  });

  it('should return the original string for an empty string', () => {
    const emptyString = '';
    expect(formatDateToLong(emptyString)).toBe(emptyString);
  });

  it('should return the original value for a null value', () => {
    // @ts-expect-error Testing invalid input
    expect(formatDateToLong(null)).toBe(null);
  });

  it('should return the original value for an undefined value', () => {
    // @ts-expect-error Testing invalid input
    expect(formatDateToLong(undefined)).toBe(undefined);
  });
});
