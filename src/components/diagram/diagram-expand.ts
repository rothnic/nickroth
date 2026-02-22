class MermaidDiagramModal {
	modal: HTMLElement | null = null;
	container: HTMLElement | null = null;
	svgContainer: HTMLElement | null = null;
	zoomLevelEl: HTMLElement | null = null;

	scale = 1;
	translateX = 0;
	translateY = 0;
	isDragging = false;
	lastX = 0;
	lastY = 0;
	lastPinchDistance = 0;

	constructor() {
		this.createModal();
		this.bindEvents();
	}

	createModal() {
		if (document.getElementById("mermaid-diagram-modal")) {
			this.modal = document.getElementById("mermaid-diagram-modal");
			this.container = this.modal?.querySelector(
				".diagram-modal-svg-container",
			) as HTMLElement;
			this.svgContainer = this.container;
			this.zoomLevelEl = this.modal?.querySelector(
				".zoom-level",
			) as HTMLElement;
			return;
		}

		const modalHTML = `
      <div id="mermaid-diagram-modal" class="diagram-modal" aria-hidden="true">
        <div class="diagram-modal-backdrop"></div>
        <div class="diagram-modal-content">
          <div class="diagram-modal-header">
            <button class="diagram-modal-close" type="button" aria-label="Close">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
            <div class="diagram-modal-zoom-controls">
              <button class="diagram-modal-zoom-btn zoom-out" type="button" aria-label="Zoom out">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 12h14" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                </svg>
              </button>
              <span class="zoom-level">100%</span>
              <button class="diagram-modal-zoom-btn zoom-in" type="button" aria-label="Zoom in">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 12h14M12 5v14" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                </svg>
              </button>
              <button class="diagram-modal-zoom-btn zoom-reset" type="button" aria-label="Reset zoom">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </button>
            </div>
          </div>
          <div class="diagram-modal-body">
            <div class="diagram-modal-svg-container"></div>
          </div>
          <div class="diagram-modal-footer">
            <p class="diagram-modal-hint">Pinch to zoom - Drag to pan</p>
          </div>
        </div>
      </div>
    `;

		document.body.insertAdjacentHTML("beforeend", modalHTML);
		this.modal = document.getElementById("mermaid-diagram-modal");
		this.container = this.modal?.querySelector(
			".diagram-modal-svg-container",
		) as HTMLElement;
		this.svgContainer = this.container;
		this.zoomLevelEl = this.modal?.querySelector(".zoom-level") as HTMLElement;
	}

	bindEvents() {
		if (!this.modal || !this.container) return;

		const closeBtn = this.modal.querySelector(
			".diagram-modal-close",
		) as HTMLButtonElement;
		const zoomInBtn = this.modal.querySelector(".zoom-in") as HTMLButtonElement;
		const zoomOutBtn = this.modal.querySelector(
			".zoom-out",
		) as HTMLButtonElement;
		const zoomResetBtn = this.modal.querySelector(
			".zoom-reset",
		) as HTMLButtonElement;

		closeBtn?.addEventListener("click", () => this.close());
		this.modal
			.querySelector(".diagram-modal-backdrop")
			?.addEventListener("click", () => this.close());

		zoomInBtn?.addEventListener("click", () => this.zoom(0.25));
		zoomOutBtn?.addEventListener("click", () => this.zoom(-0.25));
		zoomResetBtn?.addEventListener("click", () => this.reset());

		this.container.addEventListener(
			"touchstart",
			this.handleTouchStart.bind(this),
			{ passive: false },
		);
		this.container.addEventListener(
			"touchmove",
			this.handleTouchMove.bind(this),
			{ passive: false },
		);
		this.container.addEventListener("touchend", this.handleTouchEnd.bind(this));

		this.container.addEventListener(
			"mousedown",
			this.handleMouseDown.bind(this),
		);
		document.addEventListener("mousemove", this.handleMouseMove.bind(this));
		document.addEventListener("mouseup", this.handleMouseUp.bind(this));

		this.container.addEventListener("wheel", this.handleWheel.bind(this), {
			passive: false,
		});

		document.addEventListener("keydown", (e) => {
			if (e.key === "Escape") this.close();
		});
	}

	open(svgContent: string) {
		if (!this.modal || !this.svgContainer) return;
		this.svgContainer.innerHTML = svgContent;
		this.modal.classList.add("active");
		this.modal.setAttribute("aria-hidden", "false");
		document.body.style.overflow = "hidden";
		this.reset();
	}

	close() {
		if (!this.modal) return;
		this.modal.classList.remove("active");
		this.modal.setAttribute("aria-hidden", "true");
		document.body.style.overflow = "";
	}

	zoom(delta: number) {
		this.scale = Math.max(0.25, Math.min(5, this.scale + delta));
		this.updateTransform();
	}

	reset() {
		this.scale = 1;
		this.translateX = 0;
		this.translateY = 0;
		this.updateTransform();
	}

	updateTransform() {
		const svg = this.svgContainer?.querySelector("svg");
		if (svg) {
			svg.style.transform = `translate(${this.translateX}px, ${this.translateY}px) scale(${this.scale})`;
			svg.style.transformOrigin = "center center";
		}
		if (this.zoomLevelEl) {
			this.zoomLevelEl.textContent = `${Math.round(this.scale * 100)}%`;
		}
	}

	handleTouchStart(e: TouchEvent) {
		if (e.touches.length === 1) {
			this.isDragging = true;
			this.lastX = e.touches[0].clientX;
			this.lastY = e.touches[0].clientY;
		} else if (e.touches.length === 2) {
			this.lastPinchDistance = Math.hypot(
				e.touches[0].clientX - e.touches[1].clientX,
				e.touches[0].clientY - e.touches[1].clientY,
			);
		}
	}

	handleTouchMove(e: TouchEvent) {
		e.preventDefault();

		if (e.touches.length === 1 && this.isDragging) {
			const dx = e.touches[0].clientX - this.lastX;
			const dy = e.touches[0].clientY - this.lastY;
			this.translateX += dx;
			this.translateY += dy;
			this.lastX = e.touches[0].clientX;
			this.lastY = e.touches[0].clientY;
			this.updateTransform();
		} else if (e.touches.length === 2) {
			const distance = Math.hypot(
				e.touches[0].clientX - e.touches[1].clientX,
				e.touches[0].clientY - e.touches[1].clientY,
			);
			const delta = (distance - this.lastPinchDistance) / 200;
			this.scale = Math.max(0.25, Math.min(5, this.scale + delta));
			this.lastPinchDistance = distance;
			this.updateTransform();
		}
	}

	handleTouchEnd() {
		this.isDragging = false;
	}

	handleMouseDown(e: MouseEvent) {
		this.isDragging = true;
		this.lastX = e.clientX;
		this.lastY = e.clientY;
		if (this.container) this.container.style.cursor = "grabbing";
	}

	handleMouseMove(e: MouseEvent) {
		if (!this.isDragging) return;
		const dx = e.clientX - this.lastX;
		const dy = e.clientY - this.lastY;
		this.translateX += dx;
		this.translateY += dy;
		this.lastX = e.clientX;
		this.lastY = e.clientY;
		this.updateTransform();
	}

	handleMouseUp() {
		this.isDragging = false;
		if (this.container) this.container.style.cursor = "grab";
	}

	handleWheel(e: WheelEvent) {
		e.preventDefault();
		const delta = e.deltaY > 0 ? -0.1 : 0.1;
		this.zoom(delta);
	}
}

function initMermaidExpand() {
	const mermaidDiagrams = document.querySelectorAll('svg[id^="mermaid-"]');

	if (mermaidDiagrams.length === 0) return;

	const modal = new MermaidDiagramModal();

	mermaidDiagrams.forEach((svg, index) => {
		if (svg.parentElement?.querySelector(".diagram-expand-btn")) return;

		let container = svg.parentElement;
		if (!container?.classList.contains("mermaid-wrapper")) {
			const wrapper = document.createElement("div");
			wrapper.className = "mermaid-wrapper";
			wrapper.style.position = "relative";
			wrapper.style.display = "inline-block";

			svg.parentNode?.insertBefore(wrapper, svg);
			wrapper.appendChild(svg);
			container = wrapper;
		}

		const expandBtn = document.createElement("button");
		expandBtn.className = "diagram-expand-btn";
		expandBtn.type = "button";
		expandBtn.setAttribute("aria-label", "Expand diagram to full screen");
		expandBtn.innerHTML = `
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      <span class="sr-only">Expand</span>
    `;

		expandBtn.addEventListener("click", () => {
			modal.open(svg.outerHTML);
		});

		container.appendChild(expandBtn);
	});
}

if (document.readyState === "loading") {
	document.addEventListener("DOMContentLoaded", initMermaidExpand);
} else {
	initMermaidExpand();
}

document.addEventListener("astro:page-load", initMermaidExpand);

setTimeout(initMermaidExpand, 1000);
