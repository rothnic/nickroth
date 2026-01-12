/**
 * filter-bar-transitions.js
 * 
 * Handles filter bar visibility during Astro view transitions.
 * 
 * This script runs globally (in BaseLayout) instead of inside the WorkCategoryFilter
 * component because the component uses transition:persist. Event listeners added
 * inside a persisted component's script only run once on initial load and don't
 * reliably fire on subsequent navigations.
 * 
 * Problem:
 * - Filter bar uses transition:persist to maintain state across navigations
 * - Persisted elements remain visible during view transition animations
 * - Z-index control alone isn't enough - filter bar can still appear immediately
 * 
 * Solution:
 * - Force hide filter bar before view transition animation starts
 * - Conditionally restore visibility based on navigation type:
 *   - Filter-to-filter: Restore immediately after swap
 *   - Detail navigation: Fade in after transition completes
 */

export function initFilterBarTransitions() {
  console.log('[Filter Bar Transitions] Initializing global handlers');

  // Track navigation flags
  document.addEventListener('astro:before-preparation', () => {
    console.log('[Filter Bar] astro:before-preparation - Navigation starting');
    
    // Check if this is a filter-to-filter navigation
    const isFilterNavigation = sessionStorage.getItem('workFilterNavigation') === 'true';
    console.log(`[Filter Bar] Is filter navigation: ${isFilterNavigation}`);
    
    if (isFilterNavigation) {
      // Filter-to-filter: Mark that we should restore visibility immediately after swap
      console.log('[Filter Bar] Filter-to-filter nav - will keep visible');
      sessionStorage.setItem('filterBarKeepVisible', 'true');
      sessionStorage.removeItem('workFilterNavigation');
    } else {
      // Detail page navigation: Will hide it before swap, show after transition
      console.log('[Filter Bar] Detail page nav - will hide before swap');
      sessionStorage.setItem('filterBarShowAfterTransition', 'true');
    }
  });
  
  // CRITICAL: Hide filter bar RIGHT BEFORE view transition animation starts
  // This is the ONLY reliable way to hide persisted elements during transitions
  document.addEventListener('astro:before-swap', () => {
    console.log('[Filter Bar] astro:before-swap - Forcing hide before animation');
    const container = document.getElementById('work-category-filter-container');
    if (container) {
      // Force hide with !important-equivalent inline styles
      container.style.setProperty('opacity', '0', 'important');
      container.style.setProperty('pointer-events', 'none', 'important');
      console.log('[Filter Bar] Filter bar forced to opacity 0');
    }
  });
  
  // For filter-to-filter navigation: restore visibility immediately after swap
  document.addEventListener('astro:after-swap', () => {
    const keepVisible = sessionStorage.getItem('filterBarKeepVisible') === 'true';
    console.log(`[Filter Bar] astro:after-swap - Keep visible: ${keepVisible}`);
    sessionStorage.removeItem('filterBarKeepVisible');
    
    if (keepVisible) {
      const container = document.getElementById('work-category-filter-container');
      if (container) {
        console.log('[Filter Bar] Restoring visibility immediately for filter-to-filter navigation');
        // Remove forced hide from astro:before-swap
        container.style.removeProperty('opacity');
        container.style.removeProperty('pointer-events');
        // Explicitly set visible state
        container.style.opacity = '1';
        container.style.pointerEvents = 'auto';
      }
    }
  });
  
  // For detail page navigation: show filter bar after transition completes
  document.addEventListener('astro:page-load', () => {
    const showAfter = sessionStorage.getItem('filterBarShowAfterTransition') === 'true';
    console.log(`[Filter Bar] astro:page-load - Show after: ${showAfter}`);
    sessionStorage.removeItem('filterBarShowAfterTransition');
    
    if (showAfter) {
      const container = document.getElementById('work-category-filter-container');
      if (container) {
        console.log('[Filter Bar] Fading in after detail page transition');
        // Remove forced hide from astro:before-swap
        container.style.removeProperty('opacity');
        container.style.removeProperty('pointer-events');
        // Quick 100ms fade in after detail page transition
        requestAnimationFrame(() => {
          container.style.transition = 'opacity 0.1s ease-out';
          container.style.opacity = '1';
          container.style.pointerEvents = 'auto';
        });
      }
    }
  });
}
