import { describe, it, expect } from 'vitest';
import { calculateFilterScroll, isFilterVisible } from './filterScrollUtils';

describe('calculateFilterScroll', () => {
  // Common test setup
  const baseParams = {
    scrollWidth: 800,
    clientWidth: 400,
    firstFilterOffsetLeft: 10,
    peekOffset: 30,
    threshold: 10
  };

  describe('when there is no overflow', () => {
    it('should skip scrolling and return 0', () => {
      const result = calculateFilterScroll({
        ...baseParams,
        currentScrollLeft: 0,
        scrollWidth: 400, // Same as clientWidth = no overflow
        clientWidth: 400,
        activeFilterOffsetLeft: 100
      });

      expect(result.targetScroll).toBe(0);
      expect(result.maxScroll).toBe(0);
      expect(result.shouldSkip).toBe(true);
      expect(result.reason).toContain('No overflow');
    });
  });

  describe('when active filter is the first one (ALL PROJECTS)', () => {
    it('should scroll to 0 when not already there', () => {
      const result = calculateFilterScroll({
        ...baseParams,
        currentScrollLeft: 200,
        activeFilterOffsetLeft: 10 // Same as firstFilterOffsetLeft
      });

      expect(result.targetScroll).toBe(0);
      expect(result.shouldSkip).toBe(false);
      expect(result.reason).toContain('scrolling to start');
    });

    it('should skip when already at start', () => {
      const result = calculateFilterScroll({
        ...baseParams,
        currentScrollLeft: 5, // Within threshold of 0
        activeFilterOffsetLeft: 10
      });

      expect(result.targetScroll).toBe(0);
      expect(result.shouldSkip).toBe(true);
      expect(result.reason).toContain('already at start');
    });
  });

  describe('when active filter is in the middle', () => {
    it('should calculate correct target with peek offset', () => {
      const result = calculateFilterScroll({
        ...baseParams,
        currentScrollLeft: 0,
        activeFilterOffsetLeft: 150 // Middle filter
      });

      // Expected: 150 - 10 - 30 = 110
      expect(result.targetScroll).toBe(110);
      expect(result.shouldSkip).toBe(false);
    });

    it('should skip when already at target position', () => {
      const result = calculateFilterScroll({
        ...baseParams,
        currentScrollLeft: 112, // Within threshold of 110
        activeFilterOffsetLeft: 150
      });

      expect(result.targetScroll).toBe(110);
      expect(result.shouldSkip).toBe(true);
    });
  });

  describe('when active filter is at the end', () => {
    it('should clamp to maxScroll when target exceeds it', () => {
      const result = calculateFilterScroll({
        ...baseParams,
        currentScrollLeft: 0,
        activeFilterOffsetLeft: 600 // Near the end
      });

      // Expected: 600 - 10 - 30 = 560, but maxScroll = 400
      expect(result.targetScroll).toBe(400); // Clamped
      expect(result.maxScroll).toBe(400);
    });

    it('should skip when already at maxScroll', () => {
      const result = calculateFilterScroll({
        ...baseParams,
        currentScrollLeft: 398, // Within threshold of 400
        activeFilterOffsetLeft: 600
      });

      expect(result.shouldSkip).toBe(true);
      expect(result.reason).toContain('Already at target');
    });

    it('should skip when current scroll equals maxScroll exactly', () => {
      const result = calculateFilterScroll({
        ...baseParams,
        currentScrollLeft: 400, // Exactly at maxScroll
        activeFilterOffsetLeft: 600
      });

      expect(result.targetScroll).toBe(400);
      expect(result.shouldSkip).toBe(true);
    });
  });

  describe('edge cases', () => {
    it('should handle negative calculated scroll by clamping to 0', () => {
      const result = calculateFilterScroll({
        ...baseParams,
        currentScrollLeft: 0,
        activeFilterOffsetLeft: 20, // Very close to first filter
        peekOffset: 50 // Large peek offset
      });

      // Expected: 20 - 10 - 50 = -40, clamped to 0
      expect(result.targetScroll).toBe(0);
    });

    it('should use default peekOffset if not provided', () => {
      const result = calculateFilterScroll({
        currentScrollLeft: 0,
        scrollWidth: 800,
        clientWidth: 400,
        firstFilterOffsetLeft: 10,
        activeFilterOffsetLeft: 150
        // peekOffset not provided, defaults to 30
      });

      // Expected: 150 - 10 - 30 = 110
      expect(result.targetScroll).toBe(110);
    });
  });
});

describe('isFilterVisible', () => {
  const navRect = { left: 0, right: 400 };

  it('should return true when filter is fully visible with buffer', () => {
    const filterRect = { left: 50, right: 150 };
    expect(isFilterVisible(navRect, filterRect, 20)).toBe(true);
  });

  it('should return false when filter is too close to left edge', () => {
    const filterRect = { left: 10, right: 100 }; // 10 < 0 + 20
    expect(isFilterVisible(navRect, filterRect, 20)).toBe(false);
  });

  it('should return false when filter is too close to right edge', () => {
    const filterRect = { left: 300, right: 390 }; // 390 > 400 - 20
    expect(isFilterVisible(navRect, filterRect, 20)).toBe(false);
  });

  it('should return false when filter extends beyond viewport', () => {
    const filterRect = { left: -10, right: 100 };
    expect(isFilterVisible(navRect, filterRect, 20)).toBe(false);
  });
});
