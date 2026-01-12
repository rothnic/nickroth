/**
 * filter-bar-transitions.js
 * 
 * Handles filter bar visibility AND z-index stacking during Astro view transitions.
 * 
 * This script runs globally (in BaseLayout) instead of inside the WorkCategoryFilter
 * component because the component uses transition:persist. Event listeners added
 * inside a persisted component's script only run once on initial load and don't
 * reliably fire on subsequent navigations.
 * 
 * Problem 1 - Filter Bar Visibility:
 * - Filter bar uses transition:persist to maintain state across navigations
 * - Persisted elements remain visible and animate during view transitions
 * - This causes filter bar to immediately appear when navigating from detail pages
 * 
 * Solution 1 - Conditional Persistence:
 * - CONDITIONALLY DISABLE transition:persist when navigating from detail pages
 * - When persist is removed, element is treated like any other (swapped normally)
 * - This prevents the "immediate visibility" problem entirely
 * - Re-enable persist after the transition for future navigations
 * 
 * Problem 2 - Z-Index Stacking:
 * - CSS wildcards don't work with pseudo-elements (::view-transition-group(work-card-*) is invalid)
 * - Each work card has dynamic slug-based transition groups
 * - Without explicit z-index, filter bar can overlay transitioning work cards
 * 
 * Solution 2 - Dynamic Z-Index Injection:
 * - Detect which work card is transitioning by checking data attributes
 * - Dynamically inject <style> tag with explicit z-index for that card's groups
 * - Remove injected styles after transition completes
 * - Ensures proper stacking: filter (1) < root (5) < work cards (100)
 */

export function initFilterBarTransitions() {
  console.log('[Filter Bar Transitions] Initializing global handlers');

  let injectedStyleElement = null;

  // Helper: Inject z-index styles for specific work card transition groups
  function injectWorkCardStyles(slug) {
    if (!slug) return;
    
    // Remove any existing injected styles
    if (injectedStyleElement) {
      injectedStyleElement.remove();
      injectedStyleElement = null;
    }
    
    // Create style element with explicit z-index for this card's groups
    const style = document.createElement('style');
    style.id = 'work-card-transition-z-index';
    style.textContent = `
      /* Dynamically injected z-index for work card: ${slug} */
      ::view-transition-group(work-card-${slug}),
      ::view-transition-group(work-img-${slug}),
      ::view-transition-group(work-body-${slug}),
      ::view-transition-group(work-title-${slug}),
      ::view-transition-group(work-impact-${slug}) {
        z-index: 100 !important;
      }
      
      /* Root content sits between filter and work cards */
      ::view-transition-group(root) {
        z-index: 5 !important;
      }
    `;
    
    document.head.appendChild(style);
    injectedStyleElement = style;
    console.log(`[Filter Bar] Injected z-index styles for work card: ${slug}`);
  }

  // Helper: Remove injected styles
  function removeInjectedStyles() {
    if (injectedStyleElement) {
      injectedStyleElement.remove();
      injectedStyleElement = null;
      console.log('[Filter Bar] Removed injected z-index styles');
    }
  }

  // Track navigation flags and manage transition:persist directive + z-index injection
  document.addEventListener('astro:before-preparation', (event) => {
    console.log('[Filter Bar] astro:before-preparation - Navigation starting');
    
    const nav = document.getElementById('work-category-nav');
    if (!nav) {
      console.log('[Filter Bar] Nav element not found');
      return;
    }
    
    // Detect which work card is being clicked (if any)
    const targetUrl = event.to?.pathname || window.location.pathname;
    const workCardMatch = targetUrl.match(/\/work\/([^/]+)/);
    const targetSlug = workCardMatch ? workCardMatch[1] : null;
    
    // Check if clicking FROM a work card by looking for the clicked element
    const clickedCard = document.querySelector('[data-card-id]');
    const sourceSlug = clickedCard?.getAttribute('data-card-id') || null;
    
    // Inject z-index styles for transitioning work card
    if (targetSlug && targetSlug !== 'index') {
      injectWorkCardStyles(targetSlug);
    } else if (sourceSlug) {
      injectWorkCardStyles(sourceSlug);
    }
    
    // Check if this is a filter-to-filter navigation
    const isFilterNavigation = sessionStorage.getItem('workFilterNavigation') === 'true';
    console.log(`[Filter Bar] Is filter navigation: ${isFilterNavigation}`);
    
    if (isFilterNavigation) {
      // Filter-to-filter: Keep transition:persist enabled
      console.log('[Filter Bar] Filter-to-filter nav - keeping transition:persist');
      sessionStorage.setItem('filterBarKeepVisible', 'true');
      sessionStorage.removeItem('workFilterNavigation');
    } else {
      // NOT a filter navigation - check if we're navigating from detail page
      const currentPath = window.location.pathname;
      const isOnDetailPage = currentPath.includes('/work/') && currentPath !== '/work' && !currentPath.includes('/category');
      
      console.log(`[Filter Bar] Current path: ${currentPath}`);
      console.log(`[Filter Bar] Is on detail page: ${isOnDetailPage}`);
      console.log(`[Filter Bar] Has transition:persist: ${nav.hasAttribute('data-astro-transition-persist')}`);
      
      if (isOnDetailPage) {
        // We're ON a detail page, navigating AWAY (likely to work/category page)
        // Remove transition:persist so filter bar doesn't get carried over
        console.log('[Filter Bar] ✓ ON detail page - removing transition:persist to prevent immediate visibility');
        nav.removeAttribute('data-astro-transition-persist');
        nav.removeAttribute('data-astro-transition-persist-props');
        sessionStorage.setItem('filterBarPersistRemoved', 'true');
        sessionStorage.setItem('filterBarShowAfterTransition', 'true');
        console.log(`[Filter Bar] ✓ Persist removed, has attribute now: ${nav.hasAttribute('data-astro-transition-persist')}`);
      } else {
        // We're NOT on detail page - likely navigating to detail page
        // Keep persist enabled but hide during transition
        console.log('[Filter Bar] ✗ NOT on detail page - keeping transition:persist, will hide during transition');
        sessionStorage.setItem('filterBarShowAfterTransition', 'true');
      }
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
  
  // After page fully loaded: Ensure filter bar is visible with fade-in + cleanup injected styles
  document.addEventListener('astro:page-load', () => {
    const showAfter = sessionStorage.getItem('filterBarShowAfterTransition') === 'true';
    console.log(`[Filter Bar] astro:page-load - Show after: ${showAfter}`);
    sessionStorage.removeItem('filterBarShowAfterTransition');
    
    // Remove injected z-index styles after transition completes
    removeInjectedStyles();
    
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
