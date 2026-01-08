/**
 * Utility function to calculate the optimal scroll position for a horizontally
 * scrollable filter bar, positioning the active filter near the start with a
 * small offset to reveal part of the previous filter.
 * 
 * @module filterScrollUtils
 */

export interface FilterScrollParams {
  /** Current scroll position of the nav element */
  currentScrollLeft: number;
  /** Total scrollable width of the nav content */
  scrollWidth: number;
  /** Visible width of the nav element */
  clientWidth: number;
  /** offsetLeft of the first filter (anchor position) */
  firstFilterOffsetLeft: number;
  /** offsetLeft of the active filter */
  activeFilterOffsetLeft: number;
  /** Offset to show a peek of the previous filter (default: 30) */
  peekOffset?: number;
  /** Threshold for "already at position" check (default: 10) */
  threshold?: number;
}

export interface FilterScrollResult {
  /** Target scroll position (clamped to valid range) */
  targetScroll: number;
  /** Maximum scroll position */
  maxScroll: number;
  /** Whether scrolling should be skipped (already at or near target) */
  shouldSkip: boolean;
  /** Reason for the result (for debugging) */
  reason: string;
}

/**
 * Calculates the optimal scroll position for the filter bar.
 * 
 * Logic:
 * 1. If active filter is the first one, target scroll is 0
 * 2. Otherwise, position active filter at the anchor point (where first filter sits)
 *    minus a peek offset to show part of the previous filter
 * 3. Clamp to valid scroll range (0 to maxScroll)
 * 4. If current scroll is within threshold of target, skip scrolling
 * 
 * @param params - The scroll calculation parameters
 * @returns The scroll calculation result
 */
export function calculateFilterScroll(params: FilterScrollParams): FilterScrollResult {
  const {
    currentScrollLeft,
    scrollWidth,
    clientWidth,
    firstFilterOffsetLeft,
    activeFilterOffsetLeft,
    peekOffset = 30,
    threshold = 10
  } = params;

  // Calculate max scroll
  const maxScroll = Math.max(0, scrollWidth - clientWidth);

  // If no overflow, no scrolling needed
  if (maxScroll === 0) {
    return {
      targetScroll: 0,
      maxScroll: 0,
      shouldSkip: true,
      reason: 'No overflow - container fits all content'
    };
  }

  // If active filter is the first one (ALL PROJECTS), scroll to start
  if (activeFilterOffsetLeft <= firstFilterOffsetLeft) {
    const shouldSkip = currentScrollLeft < threshold;
    return {
      targetScroll: 0,
      maxScroll,
      shouldSkip,
      reason: shouldSkip 
        ? 'First filter active, already at start' 
        : 'First filter active, scrolling to start'
    };
  }

  // Calculate target: position active filter at anchor, minus peek
  // This makes the active filter appear where the first filter sits,
  // but offset to show part of the previous filter
  let targetScroll = activeFilterOffsetLeft - firstFilterOffsetLeft - peekOffset;

  // Clamp to valid range
  targetScroll = Math.max(0, Math.min(targetScroll, maxScroll));

  // Check if we're already at or near the target
  const difference = Math.abs(currentScrollLeft - targetScroll);
  const shouldSkip = difference < threshold;

  return {
    targetScroll,
    maxScroll,
    shouldSkip,
    reason: shouldSkip
      ? `Already at target (diff: ${difference.toFixed(1)}px)`
      : `Scrolling from ${currentScrollLeft.toFixed(0)} to ${targetScroll.toFixed(0)}`
  };
}

/**
 * Determines if the active filter is visible within the nav viewport.
 * Used as an additional check before deciding to scroll.
 * 
 * @param navRect - Bounding rect of the nav element
 * @param filterRect - Bounding rect of the active filter
 * @param buffer - Buffer space on each side (default: 20)
 * @returns true if the filter is fully visible with buffer
 */
export function isFilterVisible(
  navRect: { left: number; right: number },
  filterRect: { left: number; right: number },
  buffer = 20
): boolean {
  return filterRect.left >= navRect.left + buffer && 
         filterRect.right <= navRect.right - buffer;
}
