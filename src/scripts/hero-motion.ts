import type { AnimationPlaybackControls } from "motion";
import { animate } from "motion";

type KeyframeTargets = Record<string, string | number>;
type AnimationMap = Map<Element, AnimationPlaybackControls>;

const setupHeroMotion = () => {
	if (!window.matchMedia("(hover: hover)").matches) {
		return;
	}

	const hoverRegion = document.querySelector<HTMLElement>("[data-hero-hover]");
	const card = hoverRegion?.querySelector<HTMLElement>("[data-hero-card]");
	const image = hoverRegion?.querySelector<HTMLElement>("[data-hero-image]");
	const backdrop = hoverRegion?.querySelector<HTMLElement>(
		"[data-hero-backdrop]",
	);

	if (!hoverRegion || !card || !image) {
		return;
	}

	const activeAnimations: AnimationMap = new Map();

	const animateTo = (
		element: Element | null | undefined,
		keyframes: KeyframeTargets,
		duration = 0.35,
	) => {
		if (!element) return;

		activeAnimations.get(element)?.stop();

		const controls = animate(element, keyframes, {
			duration,
			ease: "easeOut",
		});

		activeAnimations.set(element, controls);
	};

	const reset = () => {
		animateTo(card, { rotate: "2deg", scale: 1 }, 0.4);
		animateTo(image, { rotate: "-1deg", scale: 1 }, 0.4);
		animateTo(backdrop, { rotate: "0deg", scale: 1 }, 0.4);
	};

	const onEnter = () => {
		animateTo(card, { rotate: "5deg", scale: 1.05 });
		animateTo(image, { rotate: "0deg", scale: 1.02 });
		animateTo(backdrop, { rotate: "-3deg", scale: 1.03 });
	};

	const onLeave = () => {
		reset();
	};

	const controller = new AbortController();
	const { signal } = controller;

	hoverRegion.addEventListener("pointerenter", onEnter, { signal });
	hoverRegion.addEventListener("pointerleave", onLeave, { signal });

	reset();

	document.addEventListener(
		"astro:before-swap",
		() => {
			controller.abort();
			activeAnimations.forEach((animation) => {
				animation.stop();
			});
			activeAnimations.clear();
		},
		{ once: true },
	);
};

if (document.readyState === "loading") {
	document.addEventListener("DOMContentLoaded", setupHeroMotion, {
		once: true,
	});
} else {
	setupHeroMotion();
}

document.addEventListener("astro:after-swap", () => {
	requestAnimationFrame(setupHeroMotion);
});
