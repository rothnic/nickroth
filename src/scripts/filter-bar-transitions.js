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
 * - Persisted elements remain visible and animate during view transitions
 * - This causes filter bar to immediately appear when navigating from detail pages
 * 
 * Solution Strategy:
 * - CONDITIONALLY DISABLE transition:persist when navigating from detail pages
 * - When persist is removed, element is treated like any other (swapped normally)
 * - This prevents the "immediate visibility" problem entirely
 * - Re-enable persist after the transition for future navigations
 */

export function initFilterBarTransitions() {
  console.log('[Filter Bar Transitions] Initializing global handlers');

  // Track navigation flags and manage transition:persist directive
  document.addEventListener('astro:before-preparation', () => {
    console.log('[Filter Bar] astro:before-preparation - Navigation starting');
    
    const nav = document.getElementById('work-category-nav');
    if (!nav) return;
    
    // Check if this is a filter-to-filter navigation
    const isFilterNavigation = sessionStorage.getItem('workFilterNavigation') === 'true';
    console.log(`[Filter Bar] Is filter navigation: ${isFilterNavigation}`);
    
    if (isFilterNavigation) {
      // Filter-to-filter: Keep transition:persist enabled
      console.log('[Filter Bar] Filter-to-filter nav - keeping transition:persist');
      sessionStorage.setItem('filterBarKeepVisible', 'true');
      sessionStorage.removeItem('workFilterNavigation');
    } else {
      // Detail page navigation: REMOVE transition:persist so element gets swapped normally
      console.log('[Filter Bar] Detail page nav - removing transition:persist to prevent immediate visibility');
      
      // Check if we're navigating TO a page with filter bar (from detail page)
      // If so, remove persist so filter bar doesn't appear during transition
      const currentPath = window.location.pathname;
      const isOnDetailPage = currentPath.includes('/work/') && currentPath !== '/work' && !currentPath.includes('/category');
      
      if (isOnDetailPage) {
        // We're ON a detail page, navigating TO work/category page
        // Remove transition:persist so filter bar gets created fresh (not persisted)
        console.log('[Filter Bar] Removing transition:persist attribute');
        nav.removeAttribute('data-astro-transition-persist');
        nav.removeAttribute('data-astro-transition-persist-props');
        sessionStorage.setItem('filterBarPersistRemoved', 'true');
      }
      
      sessionStorage.setItem('filterBarShowAfterTransition', 'true');
    }
  });
  
  // Before DOM swap: Handle element based on whether persist was removed
  document.addEventListener('astro:before-swap', () => {
    console.log('[Filter Bar] astro:before-swap - Handling transition');
    
    const persistRemoved = sessionStorage.getItem('filterBarPersistRemoved') === 'true';
    
    if (persistRemoved) {
      // Persist was removed - element will be swapped normally by Astro
      // No need to force hide, as new element won't exist until after transition
      console.log('[Filter Bar] Persist removed - element will swap normally');
    } else {
      // Persist is active - force hide to prevent visibility during transition
      const container = document.getElementById('work-category-filter-container');
      if (container) {
        container.style.setProperty('opacity', '0', 'important');
        container.style.setProperty('pointer-events', 'none', 'important');
        console.log('[Filter Bar] Persist active - forcing hide');
      }
    }
  });
  
  // After DOM swap: Restore persist attribute and handle visibility
  document.addEventListener('astro:after-swap', () => {
    const keepVisible = sessionStorage.getItem('filterBarKeepVisible') === 'true';
    const persistRemoved = sessionStorage.getItem('filterBarPersistRemoved') === 'true';
    
    console.log(`[Filter Bar] astro:after-swap - Keep visible: ${keepVisible}, Persist removed: ${persistRemoved}`);
    
    sessionStorage.removeItem('filterBarKeepVisible');
    sessionStorage.removeItem('filterBarPersistRemoved');
    
    // Re-enable transition:persist for future navigations
    const nav = document.getElementById('work-category-nav');
    if (nav && persistRemoved) {
      console.log('[Filter Bar] Re-enabling transition:persist');
      nav.setAttribute('data-astro-transition-persist', '');
    }
    
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
  
  // After page fully loaded: Ensure filter bar is visible with fade-in
  document.addEventListener('astro:page-load', () => {
    const showAfter = sessionStorage.getItem('filterBarShowAfterTransition') === 'true';
    console.log(`[Filter Bar] astro:page-load - Show after: ${showAfter}`);
    sessionStorage.removeItem('filterBarShowAfterTransition');
    
    const container = document.getElementById('work-category-filter-container');
    if (container && showAfter) {
      console.log('[Filter Bar] Fading in after detail page transition');
      // If persist was removed, element is fresh from DOM swap - just ensure it's visible
      // If persist was kept, remove any forced hide and fade in
      container.style.removeProperty('opacity');
      container.style.removeProperty('pointer-events');
      
      // Quick 100ms fade in
      requestAnimationFrame(() => {
        container.style.transition = 'opacity 0.1s ease-out';
        container.style.opacity = '1';
        container.style.pointerEvents = 'auto';
      });
    }
  });
}
