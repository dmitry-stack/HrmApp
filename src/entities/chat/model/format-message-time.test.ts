import { describe, it, expect } from 'vitest';
import { formatMessageTime } from './format-message-time';

describe('formatMessageTime', () => {
  const timeFormatRegex = /\d{1,2}:\d{2}/;

  describe('Handling Empty or Invalid Values', () => {
    it('returns an empty string for falsy values (null, undefined, 0, "")', () => {
      expect(formatMessageTime(null)).toBe('');
      expect(formatMessageTime(undefined)).toBe('');
      expect(formatMessageTime('')).toBe('');
      expect(formatMessageTime(0)).toBe('');
    });

    it('returns an empty string for an invalid date string', () => {
      expect(formatMessageTime('not-a-date')).toBe('');
    });

    it('returns an empty string for unsupported types (arrays, arbitrary objects, boolean)', () => {
      expect(formatMessageTime({})).toBe('');
      expect(formatMessageTime([])).toBe('');
      expect(formatMessageTime(true)).toBe('');
      expect(formatMessageTime({ someKey: 123 })).toBe('');
    });
  });

  describe('Firestore Timestamp-like Objects', () => {
    it('correctly formats an object with a .toDate() method returning a Date', () => {
      const mockDate = new Date(2026, 8, 10, 15, 45);
      const mockFirestoreTimestamp = {
        toDate: () => mockDate,
      };

      const result = formatMessageTime(mockFirestoreTimestamp);

      expect(result).toMatch(timeFormatRegex);
      expect(result).toBe(
        mockDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      );
    });

    it('returns an empty string if .toDate() does not return a Date object', () => {
      const brokenTimestamp = {
        toDate: () => '2026-09-10',
      };

      expect(formatMessageTime(brokenTimestamp)).toBe('');
    });
  });

  describe('Standard Date Types (Date, timestamp number, ISO string)', () => {
    it('correctly formats a native Date object', () => {
      const date = new Date(2026, 0, 1, 9, 5);
      const result = formatMessageTime(date);

      expect(result).toMatch(timeFormatRegex);
      expect(result).toBe(
        date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      );
    });

    it('correctly formats a numerical timestamp (milliseconds)', () => {
      const date = new Date(2026, 4, 20, 18, 20);
      const timestampMs = date.getTime();

      const result = formatMessageTime(timestampMs);

      expect(result).toMatch(timeFormatRegex);
      expect(result).toBe(
        date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      );
    });

    it('correctly formats a valid ISO date string', () => {
      const isoString = '2026-09-10T12:30:00.000Z';
      const expectedDate = new Date(isoString);

      const result = formatMessageTime(isoString);

      expect(result).toMatch(timeFormatRegex);
      expect(result).toBe(
        expectedDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      );
    });
  });
});
