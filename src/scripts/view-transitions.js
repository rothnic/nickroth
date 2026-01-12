/**
 * View Transition Utilities - Scroll Management for Card Navigation
 *
 * Automatically scrolls to the top of cards when navigating back from detail pages.
 * Uses Astro's view transition lifecycle hooks for seamless integration.
 *
 * Features:
 * - Scrolls to card top when navigating back (only back, not forward)
 * - Works with any collection items (work, blog, etc.)
 * - Configurable via data attributes
 * - Respects user motion preferences
 *
 * Usage:
 * 1. On card wrapper: Add data-card-id="unique-id" and data-scroll-target
 * 2. On detail page: Add data-card-ref="unique-id" to identify source card
 * 3. Auto-initializes on page load
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
		}
	});

	// Handle scroll after navigation completes
	document.addEventListener("astro:page-load", () => {
		// Minimal delay to ensure DOM is ready
		// Use instant scroll to avoid conflicting with view transition animation
		requestAnimationFrame(() => {
			handleScrollToCard();
		});
	});
}

/**
 * Main handler for scroll-to-card logic
 * Only scrolls if the target card won't be visible in the current viewport
 */
function handleScrollToCard() {
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

	// Check if the ENTIRE card is already fully visible in viewport
	// Only scroll if the card is partially or fully outside the visible area
	const rect = card.getBoundingClientRect();
	const viewportHeight = window.innerHeight;
	const isFullyVisible = rect.top >= 0 && rect.bottom <= viewportHeight;
	
	if (isFullyVisible) {
		console.debug(`Card ${cardId} is fully visible in viewport, skipping scroll`);
		sessionStorage.removeItem("lastViewedCard");
		sessionStorage.removeItem("lastViewedCardUsedAt");
		return;
	}

	// Card is not fully visible - scroll to make it visible
	// Get custom offset if specified, otherwise use default (navbar height)
	const customOffset = card.getAttribute("data-scroll-offset");
	const offset = customOffset ? parseInt(customOffset, 10) : 80;
	
	console.debug(`Card ${cardId} not fully visible in viewport, scrolling with offset ${offset}`);
	
	// Scroll to the card with appropriate offset
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
