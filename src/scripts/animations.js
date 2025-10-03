/**
 * Scroll Animations - Vanilla JS with Intersection Observer
 *
 * Usage:
 * 1. Add animation class to element: class="fade-in-up"
 * 2. Element animates when it enters viewport
 * 3. Animation triggers once by default
 *
 * Available animation classes (defined in global.css):
 * - fade-in-up: Fades in and slides up
 * - slide-in-left: Slides in from left
 * - slide-in-right: Slides in from right
 * - scale-in: Scales up from smaller size
 *
 * To repeat animation on every scroll (optional):
 * Add data-animate-repeat="true" to element
 *
 * Framework-agnostic: Works with Astro, React, Vue, vanilla HTML
 */

// Store the current observer instance for cleanup
let currentObserver = null;

/**
 * Clean up existing observer and reset animation states
 */
function cleanup() {
	// Disconnect existing observer
	if (currentObserver) {
		currentObserver.disconnect();
		currentObserver = null;
	}

	// Reset all animated elements to initial state
	const animationSelectors = [
		".fade-in-up",
		".slide-in-left",
		".slide-in-right",
		".scale-in",
	];

	const animatedElements = document.querySelectorAll(
		animationSelectors.join(", "),
	);

	animatedElements.forEach((element) => {
		element.classList.remove("visible");
	});
}

/**
 * Initialize scroll animations using Intersection Observer
 * @param {Object} options - Configuration options
 * @param {number} options.threshold - How much of element must be visible (0-1)
 * @param {string} options.rootMargin - Margin around viewport for triggering
 */
export function initScrollAnimations(options = {}) {
	// Check if user prefers reduced motion - skip animations if so
	const prefersReducedMotion = window.matchMedia(
		"(prefers-reduced-motion: reduce)",
	).matches;

	if (prefersReducedMotion) {
		// User prefers reduced motion - make all elements visible immediately
		const animationSelectors = [
			".fade-in-up",
			".slide-in-left",
			".slide-in-right",
			".scale-in",
		];

		const animatedElements = document.querySelectorAll(
			animationSelectors.join(", "),
		);

		animatedElements.forEach((element) => {
			element.classList.add("visible");
		});

		return null;
	}

	// Check for slow connection and skip animations if needed
	// This helps on mobile devices with poor connectivity
	if (
		navigator.connection &&
		(navigator.connection.saveData ||
			navigator.connection.effectiveType === "slow-2g" ||
			navigator.connection.effectiveType === "2g")
	) {
		const animationSelectors = [
			".fade-in-up",
			".slide-in-left",
			".slide-in-right",
			".scale-in",
		];

		const animatedElements = document.querySelectorAll(
			animationSelectors.join(", "),
		);

		animatedElements.forEach((element) => {
			element.classList.add("visible");
		});

		return null;
	}

	const {
		threshold = 0.15, // Element must be 15% visible before triggering
		rootMargin = "0px 0px -150px 0px", // Trigger 150px before element enters viewport (closer to center)
	} = options;

	// Clean up any existing observers first
	cleanup();

	// Animation class selectors
	const animationSelectors = [
		".fade-in-up",
		".slide-in-left",
		".slide-in-right",
		".scale-in",
	];

	// Get all elements with animation classes
	const animatedElements = document.querySelectorAll(
		animationSelectors.join(", "),
	);

	// Exit if no animated elements found
	if (animatedElements.length === 0) {
		return null;
	}

	// Create Intersection Observer
	const observer = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					// Add 'visible' class to trigger animation
					entry.target.classList.add("visible");

					// Check if animation should repeat
					const shouldRepeat = entry.target.dataset.animateRepeat === "true";

					// If no repeat, stop observing this element
					if (!shouldRepeat) {
						observer.unobserve(entry.target);
					}
				} else {
					// If repeating, remove visible class when out of viewport
					const shouldRepeat = entry.target.dataset.animateRepeat === "true";
					if (shouldRepeat) {
						entry.target.classList.remove("visible");
					}
				}
			});
		},
		{
			threshold,
			rootMargin,
		},
	);

	// Observe all animated elements
	animatedElements.forEach((element) => {
		observer.observe(element);
	});

	// Store observer for cleanup
	currentObserver = observer;

	// Return observer for manual cleanup if needed
	return observer;
}

/**
 * Auto-initialize on DOM ready (fallback for non-Astro usage)
 * In Astro, this is handled by the BaseLayout script tag
 */
if (typeof window !== "undefined") {
	// Only auto-initialize if not using Astro's lifecycle (fallback)
	// Astro layouts will call initScrollAnimations() directly
	const isAstro =
		document.querySelector("[data-astro-transition-scope]") !== null;

	if (!isAstro) {
		if (document.readyState !== "loading") {
			initScrollAnimations();
		} else {
			document.addEventListener("DOMContentLoaded", () => {
				initScrollAnimations();
			});
		}
	}
}

/**
 * Stagger animations for lists/grids
 * Adds incremental delays to child elements for cascading effect
 *
 * Usage:
 * <div data-stagger-container>
 *   <div class="fade-in-up">Item 1</div>
 *   <div class="fade-in-up">Item 2</div>
 *   <div class="fade-in-up">Item 3</div>
 * </div>
 *
 * @param {number} delayIncrement - Delay between each item in ms (default 100)
 */
export function initStaggeredAnimations(delayIncrement = 100) {
	const containers = document.querySelectorAll("[data-stagger-container]");

	containers.forEach((container) => {
		const children = container.children;

		Array.from(children).forEach((child, index) => {
			// Add inline style for staggered delay
			child.style.transitionDelay = `${index * delayIncrement}ms`;
		});
	});
}

// Auto-initialize staggered animations
if (typeof window !== "undefined") {
	const initStagger = () => {
		if (document.querySelector("[data-stagger-container]")) {
			initStaggeredAnimations();
		}
	};

	// Initial load
	if (document.readyState !== "loading") {
		initStagger();
	} else {
		document.addEventListener("DOMContentLoaded", initStagger);
	}

	// Reinitialize on Astro page transitions
	document.addEventListener("astro:page-load", initStagger);
}
