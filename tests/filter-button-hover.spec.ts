import { test, expect, type Page } from '@playwright/test';

/**
 * Debug test to capture filter button behavior and scroll position during view transitions.
 * This helps diagnose hover state issues and scroll position restoration.
 */

interface StyleSnapshot {
  label: string;
  timestamp: number;
  classes: string;
  inlineStyle: string | null;
  computedTransform: string;
  computedBoxShadow: string;
  computedTransition: string;
}

interface ScrollSnapshot {
  label: string;
  filterBarScrollLeft: number;
  pageScrollY: number;
}

async function captureButtonStyle(page: Page, buttonLocator: ReturnType<Page['locator']>, label: string): Promise<StyleSnapshot> {
  const styles = await buttonLocator.evaluate((el, lbl) => {
    const computed = window.getComputedStyle(el);
    return {
      label: lbl,
      timestamp: performance.now(),
      classes: el.className,
      inlineStyle: el.getAttribute('style'),
      computedTransform: computed.transform,
      computedBoxShadow: computed.boxShadow,
      computedTransition: computed.transition,
    };
  }, label);
  console.log(`STYLE [${label}]:`, JSON.stringify(styles, null, 2));
  return styles;
}

async function captureScrollPosition(page: Page, label: string): Promise<ScrollSnapshot> {
  const scroll = await page.evaluate((lbl) => {
    const nav = document.getElementById('work-category-nav');
    return {
      label: lbl,
      filterBarScrollLeft: nav?.scrollLeft ?? -1,
      pageScrollY: window.scrollY,
    };
  }, label);
  console.log(`SCROLL [${label}]:`, JSON.stringify(scroll));
  return scroll;
}

test.describe('Filter Button & Scroll Position', () => {
  test('captures style and scroll changes during filter navigation', async ({ page }) => {
    const styleHistory: StyleSnapshot[] = [];
    const scrollHistory: ScrollSnapshot[] = [];

    // Capture browser console logs
    page.on('console', msg => {
      if (msg.text().includes('[after-swap]') || msg.text().includes('[scroll]')) {
        console.log('BROWSER:', msg.text());
      }
    });

    // Go to work page
    await page.goto('/work');
    await page.waitForLoadState('networkidle');

    console.log('\n=== PHASE 1: INITIAL STATE ===');
    scrollHistory.push(await captureScrollPosition(page, '1. Initial'));
    
    // Find filter buttons
    const categoryButton = page.locator('.filter-btn').filter({ hasText: 'AUTOMATION' }).first();
    await expect(categoryButton).toBeVisible();
    styleHistory.push(await captureButtonStyle(page, categoryButton, '1. Initial (before hover)'));

    console.log('\n=== PHASE 2: HOVER ===');
    await categoryButton.hover();
    await page.waitForTimeout(200);
    styleHistory.push(await captureButtonStyle(page, categoryButton, '2. After hover'));

    console.log('\n=== PHASE 3: CLICK (starts navigation) ===');
    await categoryButton.click();

    // Capture every 100ms during transition
    for (let i = 0; i < 5; i++) {
      await page.waitForTimeout(100);
      try {
        const btn = page.locator('.filter-btn').filter({ hasText: 'AUTOMATION' }).first();
        styleHistory.push(await captureButtonStyle(page, btn, `3.${i}. During transition (${(i+1)*100}ms)`));
        scrollHistory.push(await captureScrollPosition(page, `3.${i}. During transition (${(i+1)*100}ms)`));
      } catch (e) {
        console.log(`3.${i}. Button not available during transition`);
      }
    }

    // Wait for navigation to complete
    await page.waitForLoadState('networkidle');
    
    console.log('\n=== PHASE 4: AFTER NAVIGATION ===');
    const newButton = page.locator('.filter-btn').filter({ hasText: 'AUTOMATION' }).first();
    await expect(newButton).toBeVisible();
    styleHistory.push(await captureButtonStyle(page, newButton, '4. After navigation complete'));
    scrollHistory.push(await captureScrollPosition(page, '4. After navigation complete'));

    await page.waitForTimeout(500);
    styleHistory.push(await captureButtonStyle(page, newButton, '5. 500ms after navigation'));
    scrollHistory.push(await captureScrollPosition(page, '5. 500ms after navigation'));

    // Now click another filter to test navigation back
    console.log('\n=== PHASE 5: SECOND NAVIGATION ===');
    const allProjectsBtn = page.locator('.filter-btn').filter({ hasText: 'ALL PROJECTS' });
    await allProjectsBtn.hover();
    await page.waitForTimeout(100);
    styleHistory.push(await captureButtonStyle(page, allProjectsBtn, '6. Hover on ALL PROJECTS'));
    scrollHistory.push(await captureScrollPosition(page, '6. Before second click'));

    await allProjectsBtn.click();
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(300);

    const afterSecondNav = page.locator('.filter-btn').filter({ hasText: 'ALL PROJECTS' }).first();
    styleHistory.push(await captureButtonStyle(page, afterSecondNav, '7. After second navigation'));
    scrollHistory.push(await captureScrollPosition(page, '7. After second navigation'));

    console.log('\n=== FULL SCROLL HISTORY ===');
    console.log(JSON.stringify(scrollHistory, null, 2));

    // Verify scroll position is preserved
    const initialScroll = scrollHistory[0].filterBarScrollLeft;
    const finalScroll = scrollHistory[scrollHistory.length - 1].filterBarScrollLeft;
    console.log(`\nScroll position: initial=${initialScroll}, final=${finalScroll}`);
    
    // The filter bar should NOT reset to 0 during transitions
    const resetToZero = scrollHistory.some((s, i) => 
      i > 0 && s.filterBarScrollLeft === 0 && scrollHistory[i-1].filterBarScrollLeft > 10
    );
    
    if (resetToZero) {
      console.log('WARNING: Filter bar scroll position reset to 0 during transition!');
    }
  });

  test('scroll position preserved when clicking rightmost filter', async ({ page }) => {
    // Use narrow viewport to force filter bar scrolling
    await page.setViewportSize({ width: 500, height: 800 });
    
    // Go to work page
    await page.goto('/work');
    await page.waitForLoadState('networkidle');

    // Scroll the filter bar to the right
    const nav = page.locator('#work-category-nav');
    await nav.evaluate((el) => el.scrollLeft = el.scrollWidth);
    await page.waitForTimeout(100);
    
    const initialScroll = await captureScrollPosition(page, 'After scroll right');
    console.log('Scrolled filter bar to:', initialScroll.filterBarScrollLeft);

    // Skip if viewport is too wide for scrolling
    if (initialScroll.filterBarScrollLeft === 0) {
      console.log('Filter bar does not need scrolling at this viewport width, skipping test');
      return;
    }

    // Click the last filter button
    const lastFilter = page.locator('.filter-btn').last();
    await lastFilter.click();
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(500);

    const afterNavScroll = await captureScrollPosition(page, 'After navigation');
    console.log('Scroll position after nav:', afterNavScroll.filterBarScrollLeft);

    // Scroll should be preserved (not reset to 0)
    expect(afterNavScroll.filterBarScrollLeft).toBeGreaterThan(0);
  });

  test('mobile: verify touch interaction styling', async ({ page }) => {
    // Simulate mobile viewport with touch support
    await page.setViewportSize({ width: 375, height: 667 });

    await page.goto('/work');
    await page.waitForLoadState('networkidle');

    const categoryButton = page.locator('.filter-btn').filter({ hasText: 'AUTOMATION' }).first();
    await expect(categoryButton).toBeVisible();

    console.log('\n=== MOBILE TEST ===');
    const initialStyle = await captureButtonStyle(page, categoryButton, 'Mobile: Initial');
    const initialScroll = await captureScrollPosition(page, 'Mobile: Initial scroll');

    // Click the button (mobile)
    await categoryButton.click();
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(500);

    const newButton = page.locator('.filter-btn').filter({ hasText: 'AUTOMATION' }).first();
    const afterClickStyle = await captureButtonStyle(page, newButton, 'Mobile: After click');
    const afterClickScroll = await captureScrollPosition(page, 'Mobile: After click scroll');

    // Button should not have stuck transform
    expect(afterClickStyle.computedTransform).toBe('matrix(1, 0, 0, 1, 0, 0)');
    
    console.log('Mobile scroll preserved:', initialScroll.filterBarScrollLeft, '->', afterClickScroll.filterBarScrollLeft);
  });

  test('height stability: filter bar height should not change during button press', async ({ page }) => {
    await page.goto('/work');
    await page.waitForLoadState('networkidle');

    const container = page.locator('[transition\\:name="work-category-filter-container"]');
    const nav = page.locator('#work-category-nav');
    const button = page.locator('.filter-btn').first();

    await expect(button).toBeVisible();

    // Capture heights before press
    const beforePress = await page.evaluate(() => {
      const container = document.querySelector('[transition\\:name="work-category-filter-container"]');
      const nav = document.getElementById('work-category-nav');
      const button = document.querySelector('.filter-btn');
      const workGrid = document.querySelector('.work-card') || document.querySelector('[class*="grid"]');
      
      return {
        containerRect: container?.getBoundingClientRect(),
        navRect: nav?.getBoundingClientRect(),
        buttonRect: button?.getBoundingClientRect(),
        workGridTop: workGrid?.getBoundingClientRect().top,
      };
    });

    console.log('\n=== HEIGHT STABILITY TEST ===');
    console.log('Before press:', JSON.stringify({
      containerHeight: beforePress.containerRect?.height,
      navHeight: beforePress.navRect?.height,
      buttonHeight: beforePress.buttonRect?.height,
      workGridTop: beforePress.workGridTop,
    }));

    // Hold the button down (mousedown without mouseup)
    const buttonBox = await button.boundingBox();
    if (!buttonBox) throw new Error('Button not found');
    
    await page.mouse.move(buttonBox.x + buttonBox.width / 2, buttonBox.y + buttonBox.height / 2);
    await page.mouse.down();
    
    // Give a moment for the :active styles to apply
    await page.waitForTimeout(50);

    // Capture heights during press
    const duringPress = await page.evaluate(() => {
      const container = document.querySelector('[transition\\:name="work-category-filter-container"]');
      const nav = document.getElementById('work-category-nav');
      const button = document.querySelector('.filter-btn');
      const workGrid = document.querySelector('.work-card') || document.querySelector('[class*="grid"]');
      
      return {
        containerRect: container?.getBoundingClientRect(),
        navRect: nav?.getBoundingClientRect(),
        buttonRect: button?.getBoundingClientRect(),
        workGridTop: workGrid?.getBoundingClientRect().top,
      };
    });

    console.log('During press:', JSON.stringify({
      containerHeight: duringPress.containerRect?.height,
      navHeight: duringPress.navRect?.height,
      buttonHeight: duringPress.buttonRect?.height,
      workGridTop: duringPress.workGridTop,
    }));

    // Release the button
    await page.mouse.up();

    // Check height differences
    const containerHeightDiff = Math.abs(
      (duringPress.containerRect?.height ?? 0) - (beforePress.containerRect?.height ?? 0)
    );
    const navHeightDiff = Math.abs(
      (duringPress.navRect?.height ?? 0) - (beforePress.navRect?.height ?? 0)
    );
    const buttonHeightDiff = Math.abs(
      (duringPress.buttonRect?.height ?? 0) - (beforePress.buttonRect?.height ?? 0)
    );
    const workGridTopDiff = Math.abs(
      (duringPress.workGridTop ?? 0) - (beforePress.workGridTop ?? 0)
    );

    console.log('Height differences:', {
      containerHeightDiff,
      navHeightDiff,
      buttonHeightDiff,
      workGridTopDiff,
    });

    // Assert no significant height changes (allow max 0.5px for rounding)
    expect(containerHeightDiff).toBeLessThanOrEqual(0.5);
    expect(navHeightDiff).toBeLessThanOrEqual(0.5);
    expect(buttonHeightDiff).toBeLessThanOrEqual(0.5);
    expect(workGridTopDiff).toBeLessThanOrEqual(0.5);
    
    console.log('✓ No height shift detected during button press');
  });

  test('height stability: work cards should not shift during click and navigation', async ({ page }) => {
    await page.goto('/work');
    await page.waitForLoadState('networkidle');

    // Helper to capture ALL vertical positions
    async function captureAllPositions(label: string) {
      const positions = await page.evaluate((lbl) => {
        const navbar = document.querySelector('.navbar');
        const filterContainer = document.querySelector('[transition\\:name="work-category-filter-container"]');
        const nav = document.getElementById('work-category-nav');
        const filterBtns = document.querySelectorAll('.filter-btn');
        const firstWorkCard = document.querySelector('.work-card');
        
        const btnPositions = Array.from(filterBtns).slice(0, 3).map((btn, i) => ({
          [`btn${i}Top`]: btn.getBoundingClientRect().top,
          [`btn${i}Bottom`]: btn.getBoundingClientRect().bottom,
        }));
        
        return {
          label: lbl,
          navbarTop: navbar?.getBoundingClientRect().top,
          navbarBottom: navbar?.getBoundingClientRect().bottom,
          filterContainerTop: filterContainer?.getBoundingClientRect().top,
          filterContainerBottom: filterContainer?.getBoundingClientRect().bottom,
          navTop: nav?.getBoundingClientRect().top,
          navBottom: nav?.getBoundingClientRect().bottom,
          workCardTop: firstWorkCard?.getBoundingClientRect().top,
          ...Object.assign({}, ...btnPositions),
        };
      }, label);
      console.log(`POS [${label}]:`, JSON.stringify(positions));
      return positions;
    }

    console.log('\n=== COMPREHENSIVE VERTICAL POSITION TRACKING ===');
    
    const before = await captureAllPositions('Before click');

    const categoryButton = page.locator('.filter-btn').filter({ hasNotText: 'ALL PROJECTS' }).first();
    await expect(categoryButton).toBeVisible();

    await categoryButton.click();

    // Capture positions every 20ms for 400ms
    for (let i = 0; i < 20; i++) {
      await page.waitForTimeout(20);
      try {
        await captureAllPositions(`T+${(i+1)*20}ms`);
      } catch (e) {
        console.log(`T+${(i+1)*20}ms: elements unavailable`);
      }
    }

    await page.waitForLoadState('networkidle');
    const after = await captureAllPositions('After navigation');
    
    // Report any differences
    const diffs: Record<string, number> = {};
    for (const key of Object.keys(before) as (keyof typeof before)[]) {
      if (key === 'label') continue;
      const diff = Math.abs((after[key] as number ?? 0) - (before[key] as number ?? 0));
      if (diff > 0) diffs[key] = diff;
    }
    console.log('Before/After differences:', Object.keys(diffs).length === 0 ? 'NONE' : diffs);
  });

  test('MOBILE: vertical position stability during filter click', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/work');
    await page.waitForLoadState('networkidle');

    async function capturePositions(label: string) {
      const positions = await page.evaluate((lbl) => {
        const navbar = document.querySelector('.navbar');
        const filterContainer = document.querySelector('[transition\\:name="work-category-filter-container"]');
        const nav = document.getElementById('work-category-nav');
        const firstBtn = document.querySelector('.filter-btn');
        const firstWorkCard = document.querySelector('.work-card');
        
        return {
          label: lbl,
          navbarBottom: navbar?.getBoundingClientRect().bottom,
          filterContainerTop: filterContainer?.getBoundingClientRect().top,
          filterContainerBottom: filterContainer?.getBoundingClientRect().bottom,
          navTop: nav?.getBoundingClientRect().top,
          navBottom: nav?.getBoundingClientRect().bottom,
          btnTop: firstBtn?.getBoundingClientRect().top,
          btnBottom: firstBtn?.getBoundingClientRect().bottom,
          workCardTop: firstWorkCard?.getBoundingClientRect().top,
        };
      }, label);
      console.log(`MOBILE POS [${label}]:`, JSON.stringify(positions));
      return positions;
    }

    console.log('\n=== MOBILE VERTICAL POSITION TRACKING ===');
    
    const before = await capturePositions('Before');

    const categoryButton = page.locator('.filter-btn').filter({ hasNotText: 'ALL PROJECTS' }).first();
    await categoryButton.click();

    // Track positions through transition
    for (let i = 0; i < 15; i++) {
      await page.waitForTimeout(20);
      try {
        await capturePositions(`T+${(i+1)*20}ms`);
      } catch (e) {
        // Skip if elements unavailable
      }
    }

    await page.waitForLoadState('networkidle');
    await capturePositions('After');
  });
});
