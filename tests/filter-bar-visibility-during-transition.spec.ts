import { test, expect } from '@playwright/test';

/**
 * E2E Test: Filter Bar Visibility During View Transitions
 * 
 * This test verifies that the filter bar does NOT appear during the work card
 * scaling animation when navigating from detail page back to work/category pages.
 * 
 * EXPECTED BEHAVIOR:
 * 1. Navigate to work page (filter bar visible)
 * 2. Click on a work card (navigates to detail page)
 * 3. Click back button
 * 4. DURING the work card scale-down animation, filter bar should be HIDDEN
 * 5. AFTER animation completes, filter bar should fade in
 * 
 * WHY THIS IS IMPORTANT:
 * - Filter bar uses transition:persist to maintain state
 * - Persisted elements stay visible during view transitions
 * - This causes filter bar to overlay the scaling work card
 * - We need to explicitly hide it during the animation
 */

test.describe('Filter Bar View Transition Visibility', () => {
  test('filter bar should be hidden during work card scale animation', async ({ page }) => {
    // Enable console logging to track lifecycle events
    const consoleLogs: string[] = [];
    page.on('console', msg => {
      const text = msg.text();
      if (text.includes('astro:') || text.includes('filter') || text.includes('transition')) {
        consoleLogs.push(`[${new Date().toISOString()}] ${text}`);
      }
    });

    // Navigate to work page
    await page.goto('http://localhost:4321/work', { waitUntil: 'networkidle' });
    
    // Verify filter bar is visible initially
    const filterBar = page.locator('#work-category-filter-container');
    await expect(filterBar).toBeVisible();
    const initialOpacity = await filterBar.evaluate(el => window.getComputedStyle(el).opacity);
    expect(parseFloat(initialOpacity)).toBeGreaterThan(0.9);
    
    console.log('✓ Filter bar visible on work page');

    // Find and click first work card
    const firstCard = page.locator('[data-work-card]').first();
    await expect(firstCard).toBeVisible();
    
    // Get the card's href for navigation tracking
    const cardLink = firstCard.locator('a').first();
    const detailUrl = await cardLink.getAttribute('href');
    console.log(`Clicking card to navigate to: ${detailUrl}`);
    
    await cardLink.click();
    
    // Wait for detail page to load
    await page.waitForURL(url => url.pathname.includes('/work/'));
    await page.waitForLoadState('networkidle');
    
    console.log('✓ Detail page loaded');

    // Verify filter bar is not present on detail page
    const filterBarOnDetail = page.locator('#work-category-filter-container');
    await expect(filterBarOnDetail).not.toBeVisible();
    
    console.log('✓ Filter bar not visible on detail page');

    // Now navigate BACK - this is where the problem occurs
    // We need to check filter bar visibility DURING the transition animation
    
    // Set up a promise that resolves when we detect the filter bar becoming visible
    // We'll check every 50ms for 2 seconds (duration of typical view transition)
    const checkInterval = 50; // ms
    const maxChecks = 40; // 2000ms total (50ms * 40)
    const opacityReadings: Array<{time: number, opacity: number}> = [];
    
    let checkCount = 0;
    const startTime = Date.now();
    
    // Start monitoring BEFORE navigation
    const monitoringPromise = (async () => {
      while (checkCount < maxChecks) {
        const elapsed = Date.now() - startTime;
        const filterBarNow = page.locator('#work-category-filter-container');
        const isInDom = await filterBarNow.count() > 0;
        
        if (isInDom) {
          const opacity = await filterBarNow.evaluate(el => {
            const computed = window.getComputedStyle(el);
            return parseFloat(computed.opacity);
          });
          
          opacityReadings.push({ time: elapsed, opacity });
          
          // If opacity > 0.5 within first 800ms, it's visible during animation
          if (elapsed < 800 && opacity > 0.5) {
            console.error(`❌ Filter bar visible too early! Opacity=${opacity} at ${elapsed}ms`);
          }
        }
        
        checkCount++;
        await page.waitForTimeout(checkInterval);
      }
    })();

    // Trigger back navigation
    console.log('Navigating back to work page...');
    await page.goBack();
    
    // Wait for navigation to complete
    await page.waitForURL('/work', { timeout: 3000 });
    
    // Wait for monitoring to complete
    await monitoringPromise;
    
    console.log('\n=== Opacity Readings During Transition ===');
    opacityReadings.forEach(reading => {
      console.log(`t=${reading.time.toString().padStart(4)}ms: opacity=${reading.opacity.toFixed(2)}`);
    });
    
    // Analysis: Filter bar should be hidden (opacity near 0) for at least first 500ms
    // Then fade in over ~100ms
    const earlyReadings = opacityReadings.filter(r => r.time < 500);
    const lateReadings = opacityReadings.filter(r => r.time >= 500);
    
    if (earlyReadings.length > 0) {
      const maxEarlyOpacity = Math.max(...earlyReadings.map(r => r.opacity));
      console.log(`\nMax opacity in first 500ms: ${maxEarlyOpacity.toFixed(2)}`);
      
      // CRITICAL CHECK: Filter bar must be hidden during animation
      expect(maxEarlyOpacity).toBeLessThan(0.2); // Should be near 0
    }
    
    if (lateReadings.length > 0) {
      const finalOpacity = lateReadings[lateReadings.length - 1].opacity;
      console.log(`Final opacity: ${finalOpacity.toFixed(2)}`);
      
      // Eventually should fade in to full visibility
      expect(finalOpacity).toBeGreaterThan(0.9);
    }
    
    // Print console logs for debugging
    console.log('\n=== Console Logs ===');
    consoleLogs.forEach(log => console.log(log));
    
    console.log('\n✓ Test completed');
  });
  
  test('filter bar should stay visible during filter-to-filter navigation', async ({ page }) => {
    // Navigate to work page
    await page.goto('http://localhost:4321/work', { waitUntil: 'networkidle' });
    
    // Verify filter bar is visible
    const filterBar = page.locator('#work-category-filter-container');
    await expect(filterBar).toBeVisible();
    
    // Click on a category filter
    const aiFilter = page.locator('#work-category-nav a').filter({ hasText: /AI APPLICATION/i }).first();
    await expect(aiFilter).toBeVisible();
    
    // Track opacity during navigation
    const opacityReadings: Array<{time: number, opacity: number}> = [];
    const startTime = Date.now();
    
    const monitoringPromise = (async () => {
      for (let i = 0; i < 20; i++) { // Check for 1 second (50ms * 20)
        const elapsed = Date.now() - startTime;
        const opacity = await filterBar.evaluate(el => {
          return parseFloat(window.getComputedStyle(el).opacity);
        });
        
        opacityReadings.push({ time: elapsed, opacity });
        await page.waitForTimeout(50);
      }
    })();
    
    await aiFilter.click();
    await page.waitForURL(url => url.pathname.includes('/work/category/'));
    await monitoringPromise;
    
    console.log('\n=== Filter-to-Filter Opacity Readings ===');
    opacityReadings.forEach(reading => {
      console.log(`t=${reading.time.toString().padStart(4)}ms: opacity=${reading.opacity.toFixed(2)}`);
    });
    
    // Filter bar should STAY VISIBLE throughout (opacity should never drop below 0.8)
    const minOpacity = Math.min(...opacityReadings.map(r => r.opacity));
    console.log(`\nMin opacity during filter navigation: ${minOpacity.toFixed(2)}`);
    
    expect(minOpacity).toBeGreaterThan(0.8); // Should stay visible
    
    console.log('✓ Filter bar stayed visible during filter navigation');
  });
});
