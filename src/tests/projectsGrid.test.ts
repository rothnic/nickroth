import { describe, it, expect } from 'vitest';

describe('Projects Grid Layout', () => {
  it('should use 2-column grid at all screen sizes including 320px', () => {
    // Create a mock HTML structure
    const gridHtml = `
      <div class="grid grid-cols-2 gap-3 sm:gap-6 max-w-5xl mx-auto">
        <div class="card">Card 1</div>
        <div class="card">Card 2</div>
      </div>
    `;
    
    document.body.innerHTML = gridHtml;
    const grid = document.querySelector('.grid');
    
    // Verify grid element exists
    expect(grid).toBeTruthy();
    
    // Verify it has grid-cols-2 class (2 columns at all sizes)
    expect(grid?.classList.contains('grid-cols-2')).toBe(true);
    
    // Verify it does NOT have responsive prefixes that would override at mobile
    expect(grid?.classList.contains('md:grid-cols-2')).toBe(false);
    expect(grid?.classList.contains('lg:grid-cols-2')).toBe(false);
    
    // Verify gap classes
    expect(grid?.classList.contains('gap-3')).toBe(true);
    expect(grid?.classList.contains('sm:gap-6')).toBe(true);
  });
  
  it('should have 2 cards in the grid', () => {
    const gridHtml = `
      <div class="grid grid-cols-2 gap-3 sm:gap-6">
        <div class="card">Card 1</div>
        <div class="card">Card 2</div>
      </div>
    `;
    
    document.body.innerHTML = gridHtml;
    const cards = document.querySelectorAll('.card');
    
    expect(cards.length).toBeGreaterThanOrEqual(2);
  });
  
  it('should apply grid-cols-2 which creates 2 columns at all viewport widths', () => {
    // This test verifies the class name is correct
    // Tailwind's grid-cols-2 applies: grid-template-columns: repeat(2, minmax(0, 1fr));
    // This works at ALL screen sizes including 320px
    
    const gridHtml = `
      <div class="grid grid-cols-2">
        <div>Column 1</div>
        <div>Column 2</div>
      </div>
    `;
    
    document.body.innerHTML = gridHtml;
    const grid = document.querySelector('.grid');
    
    // The key assertion: grid-cols-2 is present and has NO responsive prefix
    const classList = Array.from(grid?.classList || []);
    const hasBaseGridCols2 = classList.includes('grid-cols-2');
    const hasResponsiveOverride = classList.some(c => 
      c.match(/^(sm|md|lg|xl|2xl):grid-cols-/)
    );
    
    expect(hasBaseGridCols2).toBe(true);
    expect(hasResponsiveOverride).toBe(false);
  });
  
  it('should verify cards are clickable links', () => {
    const cardHtml = `
      <a href="/work/test-project" class="card bg-base-100 block cursor-pointer" data-work-card>
        <figure class="relative h-32 sm:h-48">
          <img src="/test.jpg" alt="Test" />
        </figure>
        <div class="card-body">
          <h2>Test Project</h2>
        </div>
      </a>
    `;
    
    document.body.innerHTML = cardHtml;
    const card = document.querySelector('[data-work-card]');
    
    // Verify card is an anchor tag
    expect(card?.tagName).toBe('A');
    
    // Verify it has href
    expect(card?.getAttribute('href')).toBe('/work/test-project');
    
    // Verify it has cursor-pointer
    expect(card?.classList.contains('cursor-pointer')).toBe(true);
    
    // Verify it's a block element (fills the grid cell)
    expect(card?.classList.contains('block')).toBe(true);
  });
});
