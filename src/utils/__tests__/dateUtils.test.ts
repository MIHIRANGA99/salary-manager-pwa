import { getDaysInMonth, getTodayDateString } from '../dateUtils';
import { describe, expect, it, vi } from 'vitest';

describe('date utilities', () => {
  it('should return the correct number of days in a month for January', () => {
    expect(getDaysInMonth(2024, 1)).toBe(31); // January
  });

  it('should return the correct number of days in a month for February (non-leap year)', () => {
    expect(getDaysInMonth(2023, 2)).toBe(28); // February 2023
  });

  it('should return the correct number of days in a month for February (leap year)', () => {
    expect(getDaysInMonth(2024, 2)).toBe(29); // February 2024 (leap year)
  });

  it('should return the correct number of days in a month for April', () => {
    expect(getDaysInMonth(2024, 4)).toBe(30); // April
  });

  it('should return today\'s date in YYYY-MM-DD format', () => {
    const mockDate = new Date('2025-12-04T10:00:00.000Z');
    vi.useFakeTimers();
    vi.setSystemTime(mockDate);

    expect(getTodayDateString()).toBe('2025-12-04');

    vi.useRealTimers();
  });
});
