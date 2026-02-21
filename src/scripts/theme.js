// Theme system using DaisyUI's built-in functionality
(function () {
	const THEMES = {
		light: "neobrutalism-light",
		dark: "neobrutalism-dark",
	};

	function normalizeStoredTheme(stored) {
		if (stored === THEMES.light || stored === THEMES.dark) {
			return stored;
		}
		if (stored === "dark") {
			return THEMES.dark;
		}
		if (stored === "light") {
			return THEMES.light;
		}
		return THEMES.light;
	}

	function applyTheme(theme) {
		const normalized = normalizeStoredTheme(theme);
		document.documentElement.setAttribute("data-theme", normalized);
		localStorage.setItem("theme", normalized);
		return normalized;
	}

	function syncToggle(theme, scope = document) {
		const checkbox = scope.querySelector('.theme-controller[type="checkbox"]');
		if (checkbox) {
			checkbox.checked = theme === THEMES.dark;
		}
	}

	// Initialize theme on page load
	function initTheme() {
		const stored = localStorage.getItem("theme");
		const themeToApply = stored ? normalizeStoredTheme(stored) : THEMES.light;
		applyTheme(themeToApply);
		syncToggle(themeToApply);
	}

	// Handle theme changes
	function handleThemeChange(event) {
		if (event.target.matches('.theme-controller[type="checkbox"]')) {
			const newTheme = event.target.checked ? THEMES.dark : THEMES.light;
			applyTheme(newTheme);
		}
	}

	// Theme persistence across page navigations
	function handlePageSwap(event) {
		const currentTheme =
			document.documentElement.getAttribute("data-theme") || THEMES.light;
		event.newDocument.documentElement.setAttribute("data-theme", currentTheme);
		syncToggle(currentTheme, event.newDocument);
	}

	// Astro bundles this as a module so DOMContentLoaded has already fired -
	// call initTheme directly. Also hook astro:page-load for view transitions.
	initTheme();
	document.addEventListener("astro:page-load", initTheme);
	document.addEventListener("change", handleThemeChange);
	document.addEventListener("astro:before-swap", handlePageSwap);
})();
