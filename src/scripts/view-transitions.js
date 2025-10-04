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
 */
function scrollToElement(element, offset = 80) {
	if (!element) return;

	const prefersReducedMotion = window.matchMedia(
		"(prefers-reduced-motion: reduce)",
	).matches;

	const elementTop = element.getBoundingClientRect().top + window.scrollY;
	const scrollPosition = elementTop - offset;

	// Use smooth scroll unless user prefers reduced motion
	window.scrollTo({
		top: scrollPosition,
		behavior: prefersReducedMotion ? "auto" : "smooth",
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
	// Check if current page has a card reference
	const cardRef = document.body.getAttribute("data-card-ref");
	if (cardRef) {
		return cardRef;
	}

	// Check sessionStorage for last viewed card (set when navigating forward)
	const lastCard = sessionStorage.getItem("lastViewedCard");
	if (lastCard) {
		// Clear it after reading
		sessionStorage.removeItem("lastViewedCard");
		return lastCard;
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
		// Small delay to ensure DOM is ready and view transition has settled
		requestAnimationFrame(() => {
			setTimeout(() => {
				handleScrollToCard();
			}, 100);
		});
	});
}

/**
 * Main handler for scroll-to-card logic
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
 */
export function scrollToCard(cardId, offset = 80) {
	const card = document.querySelector(`[data-card-id="${cardId}"]`);
	if (card) {
		scrollToElement(card, offset);
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
