import { saveToLocalStorage, getFromLocalStorage, generateUniqueId } from '../localStorage';
import { beforeEach, describe, expect, it, vi } from 'vitest';

describe('localStorage utilities', () => {
  const MOCK_STORAGE: { [key: string]: string } = {};

  beforeEach(() => {
    // Mock localStorage
    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: vi.fn((key: string) => MOCK_STORAGE[key] || null),
        setItem: vi.fn((key: string, value: string) => {
          MOCK_STORAGE[key] = value;
        }),
        removeItem: vi.fn((key: string) => {
          delete MOCK_STORAGE[key];
        }),
        clear: vi.fn(() => {
          for (const key in MOCK_STORAGE) {
            delete MOCK_STORAGE[key];
          }
        }),
      },
      writable: true,
    });
    window.localStorage.clear(); // Clear before each test
  });

  it('should save a value to localStorage', () => {
    saveToLocalStorage('testKey', 'testValue');
    expect(window.localStorage.setItem).toHaveBeenCalledWith('testKey', 'testValue');
    expect(MOCK_STORAGE['testKey']).toBe('testValue');
  });

  it('should retrieve a value from localStorage', () => {
    MOCK_STORAGE['testKey'] = 'testValue';
    const value = getFromLocalStorage('testKey');
    expect(window.localStorage.getItem).toHaveBeenCalledWith('testKey');
    expect(value).toBe('testValue');
  });

  it('should return null if key does not exist in localStorage', () => {
    const value = getFromLocalStorage('nonExistentKey');
    expect(window.localStorage.getItem).toHaveBeenCalledWith('nonExistentKey');
    expect(value).toBeNull();
  });

  it('should generate a unique ID', () => {
    const id1 = generateUniqueId();
    const id2 = generateUniqueId();
    expect(id1).toBeTypeOf('string');
    expect(id2).toBeTypeOf('string');
    expect(id1).not.toBe(id2);
    expect(id1.length).toBeGreaterThan(0);
    expect(id2.length).toBeGreaterThan(0);
  });
});
