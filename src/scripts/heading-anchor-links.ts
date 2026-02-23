/**
 * Heading Anchor Links
 *
 * Adds clickable anchor link icons to headings in prose content.
 * Clicking copies the section URL to clipboard.
 */

(function () {
	const LINK_ICON_SVG = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" style="width: 1em; height: 1em;"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>`;

	function slugify(text: string): string {
		return text
			.toLowerCase()
			.replace(/[^a-z0-9]+/g, "-")
			.replace(/(^-|-$)/g, "");
	}

	function showToast(message: string) {
		const existingToast = document.querySelector(".anchor-link-toast");
		if (existingToast) {
			existingToast.remove();
		}

		const toast = document.createElement("div");
		toast.className = "anchor-link-toast";
		toast.textContent = message;
		document.body.appendChild(toast);

		requestAnimationFrame(() => {
			toast.classList.add("visible");
		});

		setTimeout(() => {
			toast.classList.remove("visible");
			setTimeout(() => toast.remove(), 300);
		}, 2000);
	}

	async function copySectionLink(headingId: string) {
		const url = new URL(window.location.href);
		url.hash = headingId;
		const urlString = url.toString();

		try {
			await navigator.clipboard.writeText(urlString);
			showToast("Link copied to clipboard");
		} catch {
			showToast("Link updated");
		}

		history.pushState(null, "", url.hash);
	}

	function initHeadingAnchorLinks() {
		const proseContent = document.querySelector(".prose-content");
		if (!proseContent) return;

		const headings = proseContent.querySelectorAll("h2, h3, h4");

		headings.forEach((heading, index) => {
			if (heading.hasAttribute("data-anchor-initialized")) return;
			heading.setAttribute("data-anchor-initialized", "true");

			let id = heading.id;
			if (!id) {
				const text = heading.textContent?.trim() || `heading-${index}`;
				id = slugify(text);
				let uniqueId = id;
				let counter = 1;
				while (document.getElementById(uniqueId)) {
					uniqueId = `${id}-${counter}`;
					counter++;
				}
				heading.id = uniqueId;
				id = uniqueId;
			}

			const anchorLink = document.createElement("a");
			anchorLink.className = "heading-anchor-link";
			anchorLink.href = `#${id}`;
			anchorLink.setAttribute(
				"aria-label",
				`Copy link to ${heading.textContent?.trim() || "section"}`,
			);
			anchorLink.innerHTML = LINK_ICON_SVG;

			anchorLink.addEventListener("click", (e) => {
				e.preventDefault();
				copySectionLink(id);
			});

			const h2Prefix = heading.querySelector(".h2-prefix");
			if (h2Prefix && heading.tagName.toLowerCase() === "h2") {
				const prefixAnchor = document.createElement("a");
				prefixAnchor.className = "h2-prefix-anchor";
				prefixAnchor.href = `#${id}`;
				prefixAnchor.setAttribute(
					"aria-label",
					`Copy link to ${heading.textContent?.trim() || "section"}`,
				);

				while (h2Prefix.firstChild) {
					prefixAnchor.appendChild(h2Prefix.firstChild);
				}

				prefixAnchor.addEventListener("click", (e) => {
					e.preventDefault();
					copySectionLink(id);
				});

				h2Prefix.appendChild(prefixAnchor);
				heading.appendChild(anchorLink);
			} else {
				heading.appendChild(anchorLink);
			}
		});
	}

	if (document.readyState === "loading") {
		document.addEventListener("DOMContentLoaded", initHeadingAnchorLinks);
	} else {
		initHeadingAnchorLinks();
	}

	document.addEventListener("astro:page-load", initHeadingAnchorLinks);
})();
