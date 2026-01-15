/**
 * View Transition Utilities
 * 
 * This module provides scroll management and JIT (Just-In-Time) transition naming
 * for work card navigation. It integrates with Astro's view transition lifecycle.
 *
 * ============================================================================
 * JIT NAMING PATTERN FOR WORK CARDS
 * ============================================================================
 * 
 * Instead of statically assigning view-transition-name to ALL cards (which would
 * create 20+ simultaneous transition groups), we use JIT naming:
 * 
 * ## How It Works:
 * 
 * 1. Card Mode (WorkCard.astro):
 *    - Elements have data-vt-* attributes instead of transition:name
 *    - Example: data-vt-img="work-img" (constant name, not slug-based)
 *    - NO actual transition names in the HTML
 * 
 * 2. Detail Page (WorkCard expanded mode):
 *    - Elements have static transition:name attributes
 *    - Example: transition:name="work-img"
 *    - Using CONSTANT names (work-img, not work-img-resume-chatbot)
 * 
 * 3. This JavaScript:
 *    - Forward nav (click): Applies transition names to the clicked card ONLY
 *    - Back nav (after-swap): Injects transition names to the target card
 *    - After transition: Cleans up all transition names
 * 
 * ## Why Constant Names?
 * 
 * Since only ONE card ever has names at a time, we can use constant names:
 * - work-card, work-img, work-title, work-body, work-impact
 * 
 * This allows CSS to target them exactly (no wildcards needed):
 * - ::view-transition-group(work-img) { z-index: 100; }
 * 
 * ## Lifecycle Flow:
 * 
 * FORWARD NAVIGATION (Grid → Detail):
 * 1. User clicks card link
 * 2. click handler calls applyTransitionNames(card)
 * 3. Card elements get view-transition-name via inline style
 * 4. View transition starts - browser morphs card → detail
 * 5. astro:page-load fires - cleanupTransitionNames() removes styles
 * 
 * BACK NAVIGATION (Detail → Grid):
 * 1. User navigates back (browser back, breadcrumb, etc.)
 * 2. astro:after-swap fires - we find the target card via sessionStorage
 * 3. applyTransitionNames(targetCard) adds names to that card
 * 4. View transition runs - browser morphs detail → card
 * 5. astro:page-load fires - cleanupTransitionNames() cleans up
 * 
 * ============================================================================
 * SCROLL MANAGEMENT
 * ============================================================================
 * 
 * Features:
 * - Scrolls to card top when navigating back from detail pages
 * - Works with any collection items (work, blog, etc.)
 * - Configurable via data attributes
 * 
 * Usage:
 * 1. On card wrapper: Add data-card-id="unique-id" and data-scroll-target
 * 2. On detail page: Add data-card-ref="unique-id" to identify source card
 * 3. Auto-initializes on page load
 * 
 * @see src/components/WorkCard.astro
 * @see src/styles/global.css (WORK CARD VIEW TRANSITIONS section)
 */


/**
 * Scroll to a specific element with optional offset
 * @param {HTMLElement} element - Element to scroll to
 * @param {number} offset - Offset in pixels from top (default: 80 for navbar)
 * @param {boolean} instant - If true, scroll instantly without animation (default: true for view transitions)
 */
function scrollToElement(element, offset = 80, instant = true) {
	if (!element) return;

	const elementTop = element.getBoundingClientRect().top + window.scrollY;
	const scrollPosition = elementTop - offset;

	// Use instant scroll by default to avoid conflicting with view transition animations
	// This ensures the card is positioned correctly before the view transition completes
	window.scrollTo({
		top: scrollPosition,
		behavior: instant ? "auto" : "smooth",
	});
}

/**
 * Check if navigation is backwards (user clicked back button or back link)
 * @param {NavigationEvent} navigation - Navigation event from view transition
 * @returns {boolean} True if navigating backwards
 */
function isBackNavigation(navigation) {
	// Check if navigationType exists and is 'traverse' (back/forward button)
	if (navigation?.navigationType === "traverse") {
		// Additional check: see if we're going to a page we've been to before
		return true;
	}

	// Fallback: check navigation.info for Astro-specific back navigation indicators
	if (navigation?.info?.direction === "back") {
		return true;
	}

	return false;
}

/**
 * Extract card reference from current or previous page
 * @returns {string|null} Card ID to scroll to
 */
function getCardReference() {
	// Check if current page has a card reference (e.g., detail page)
	// Look anywhere in the document, not just body
	const cardRefElement = document.querySelector('[data-card-ref]');
	if (cardRefElement) {
		// If we're on a detail page, don't return anything (no scrolling needed)
		return null;
	}

	// Check sessionStorage for last viewed card (set when navigating forward)
	const lastCard = sessionStorage.getItem("lastViewedCard");
	if (lastCard) {
		// Mark as used with a timestamp to prevent reuse
		const usedAt = sessionStorage.getItem("lastViewedCardUsedAt");
		const now = Date.now();
		
		// Only use if not recently used (within last 500ms)
		if (!usedAt || (now - parseInt(usedAt, 10)) > 500) {
			sessionStorage.setItem("lastViewedCardUsedAt", now.toString());
			return lastCard;
		}
	}

	return null;
}

/**
 * Store card reference when navigating forward
 * @param {string} cardId - ID of the card being navigated from
 */
function storeCardReference(cardId) {
	if (cardId) {
		sessionStorage.setItem("lastViewedCard", cardId);
	}
}

/**
 * Handle view transition lifecycle
 */
function setupViewTransitionHandlers() {
	// Store card reference when clicking on a card link
	// AND apply JIT view transition names to only the clicked card
	document.addEventListener("click", (e) => {
		const target = e.target;
		const link = target.closest("a");
		if (!link) return;

		// Find parent card element
		const card = link.closest("[data-card-id]");
		if (card) {
			const cardId = card.getAttribute("data-card-id");
			storeCardReference(cardId);
			console.debug(`Stored card reference: ${cardId}`);
			
			// JIT View Transition: Apply names only to THIS card
			applyTransitionNames(card);
		}
	});
	
	// Handle back navigation: inject transition names on target card
	document.addEventListener("astro:after-swap", () => {
		const cardId = sessionStorage.getItem("lastViewedCard");
		if (!cardId) return;
		
		// Check if we're on a work listing page (back navigation target)
		const isWorkListingPage = window.location.pathname === '/work' || 
			window.location.pathname.startsWith('/work/category/');
		
		if (isWorkListingPage) {
			// Find and name the target card for back-nav morphing
			const targetCard = document.querySelector(`[data-card-id="${cardId}"]`);
			if (targetCard) {
				console.debug(`Back nav: Injecting transition names for card ${cardId}`);
				applyTransitionNames(targetCard);
			}
		}
	});

	// Handle scroll after navigation completes
	document.addEventListener("astro:page-load", () => {
		// Minimal delay to ensure DOM is ready
		// Use instant scroll to avoid conflicting with view transition animation
		requestAnimationFrame(() => {
			handleScrollToCard();
			// Clean up transition names after transition completes
			cleanupTransitionNames();
		});
	});
}

/**
 * Apply view transition names to a card's elements
 * Uses constant names from data-vt-* attributes
 * @param {HTMLElement} card - The card element to name
 */
function applyTransitionNames(card) {
	if (!card) return;
	
	// Map of data attribute -> apply name from that attribute
	const vtMappings = [
		{ attr: 'data-vt-card', selector: null }, // card itself
		{ attr: 'data-vt-img', selector: '[data-vt-img]' },
		{ attr: 'data-vt-body', selector: '[data-vt-body]' },
		{ attr: 'data-vt-title', selector: '[data-vt-title]' },
		{ attr: 'data-vt-impact', selector: '[data-vt-impact]' },
	];
	
	vtMappings.forEach(({ attr, selector }) => {
		const element = selector ? card.querySelector(selector) : card;
		if (element) {
			const name = element.getAttribute(attr);
			if (name) {
				element.style.viewTransitionName = name;
				console.debug(`Applied view-transition-name: ${name}`);
			}
		}
	});
}

/**
 * Remove view transition names from all cards
 * Called after transition completes to reset state
 */
function cleanupTransitionNames() {
	const cards = document.querySelectorAll('[data-work-card]');
	cards.forEach(card => {
		// Clear names from card and all named children
		card.style.viewTransitionName = '';
		card.querySelectorAll('[data-vt-img], [data-vt-body], [data-vt-title], [data-vt-impact]').forEach(el => {
			el.style.viewTransitionName = '';
		});
	});
}

/**
 * Main handler for scroll-to-card logic
 */
function handleScrollToCard() {
	// Skip on work listing pages - they have their own scroll management
	// and we want browser's native back-button scroll restoration to work
	const isWorkListingPage = window.location.pathname === '/work' || 
		window.location.pathname.startsWith('/work/category/');
	if (isWorkListingPage) {
		console.debug("Skipping scroll-to-card on work listing page");
		return;
	}
	
	// Get card reference
	const cardId = getCardReference();
	console.debug(`handleScrollToCard: cardId=${cardId}`);
	
	if (!cardId) {
		console.debug("No card reference found");
		return;
	}

	// Find the card element
	const card = document.querySelector(`[data-card-id="${cardId}"]`);
	if (!card) {
		console.debug(`Card with ID ${cardId} not found on this page`);
		// Don't clear the reference here - we might need it on the next navigation
		return;
	}

	// Check if this card has scroll target flag
	const shouldScroll = card.hasAttribute("data-scroll-target");
	if (!shouldScroll) {
		console.debug(`Card ${cardId} does not have data-scroll-target attribute`);
		return;
	}

	// Get custom offset if specified, otherwise use default
	const customOffset = card.getAttribute("data-scroll-offset");
	const offset = customOffset ? parseInt(customOffset, 10) : 80;

	console.debug(`Scrolling to card ${cardId} with offset ${offset}`);
	
	// Scroll to the card
	scrollToElement(card, offset);
	
	// Clear the reference after successful scroll
	sessionStorage.removeItem("lastViewedCard");
	sessionStorage.removeItem("lastViewedCardUsedAt");
}

/**
 * Initialize automatic scroll-to-card on back navigation
 * Call this once on initial page load
 */
export function initViewTransitionScrolling() {
	// Only initialize once
	if (window.__viewTransitionScrollingInitialized) {
		return;
	}

	setupViewTransitionHandlers();
	window.__viewTransitionScrollingInitialized = true;
}

/**
 * Manual scroll to card helper
 * @param {string} cardId - ID of card to scroll to
 * @param {number} offset - Optional offset from top
 * @param {boolean} instant - If true, scroll instantly without animation (default: false for manual calls)
 */
export function scrollToCard(cardId, offset = 80, instant = false) {
	const card = document.querySelector(`[data-card-id="${cardId}"]`);
	if (card) {
		scrollToElement(card, offset, instant);
	}
}

/**
 * Utility to mark elements that should be scroll targets
 * @param {string} selector - CSS selector for cards
 * @param {string} idAttribute - Attribute to use as card ID (default: data-slug or href)
 */
export function markScrollTargets(selector, idAttribute = "data-slug") {
	const cards = document.querySelectorAll(selector);

	cards.forEach((card) => {
		// Get or create card ID
		let cardId = card.getAttribute("data-card-id");

		if (!cardId) {
			// Try to get from specified attribute
			if (idAttribute === "href") {
				const link = card.querySelector("a[href]");
				if (link) {
					const href = link.getAttribute("href");
					// Extract slug from href (e.g., /work/my-project -> my-project)
					cardId = href.split("/").filter(Boolean).pop();
				}
			} else {
				cardId = card.getAttribute(idAttribute);
			}

			// Set the card ID
			if (cardId) {
				card.setAttribute("data-card-id", cardId);
			}
		}

		// Mark as scroll target
		if (cardId && !card.hasAttribute("data-scroll-target")) {
			card.setAttribute("data-scroll-target", "");
		}
	});
}

// Auto-initialize on load
if (typeof window !== "undefined") {
	// Initial load
	if (document.readyState !== "loading") {
		initViewTransitionScrolling();
	} else {
		document.addEventListener("DOMContentLoaded", initViewTransitionScrolling);
	}
}
