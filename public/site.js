function hydrateIcons() {
  const lucide = window.lucide;

  if (!lucide?.createIcons || !lucide?.icons) {
    return;
  }

  document.querySelectorAll("[data-icon]").forEach((node) => {
    const requestedIcon = node.dataset.icon || "check-circle-2";
    const iconName = requestedIcon === "play-filled" ? "play" : requestedIcon;
    const iconSize = Number(node.dataset.size) || 16;
    const existingClass = node.getAttribute("class") || "";

    node.setAttribute("data-lucide", iconName);
    node.setAttribute("width", String(iconSize));
    node.setAttribute("height", String(iconSize));
    node.setAttribute("stroke-width", "1.65");
    node.setAttribute("class", `${existingClass} icon-svg${requestedIcon === "play-filled" ? " icon-filled" : ""}`.trim());
    node.style.setProperty("--icon-size", `${iconSize}px`);
    node.removeAttribute("data-icon");
    node.removeAttribute("data-size");
  });

  lucide.createIcons({
    icons: lucide.icons,
    attrs: {
      "aria-hidden": "true",
      class: "icon-svg",
      "stroke-width": "1.65",
    },
  });
}

function initMobileNavigation() {
  const toggle = document.querySelector(".mobile-menu-toggle");
  const panel = document.querySelector("#mobile-navigation");

  if (!toggle || !panel) {
    return;
  }

  const close = () => {
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Open navigation menu");
    panel.hidden = true;
  };

  toggle.addEventListener("click", () => {
    const isOpen = toggle.getAttribute("aria-expanded") === "true";

    toggle.setAttribute("aria-expanded", String(!isOpen));
    toggle.setAttribute("aria-label", isOpen ? "Open navigation menu" : "Close navigation menu");
    panel.hidden = isOpen;
  });

  panel.querySelectorAll("a, button").forEach((item) => {
    item.addEventListener("click", close);
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 760) {
      close();
    }
  });
}

function initProcessWorkspace() {
  const workspace = document.querySelector("[data-journey-workspace]");

  if (!workspace) {
    return;
  }

  const steps = Array.from(workspace.querySelectorAll("[data-journey-step]"));
  const assets = Array.from(workspace.querySelectorAll("[data-journey-asset]"));
  const status = workspace.querySelector("[data-journey-status]");
  const progress = workspace.querySelector("[data-journey-progress]");

  if (!steps.length || !assets.length) {
    return;
  }

  const activate = (step) => {
    const id = step.dataset.journeyStep;
    const index = steps.indexOf(step);

    steps.forEach((item) => {
      const isActive = item === step;
      item.classList.toggle("is-active", isActive);
      item.setAttribute("aria-selected", String(isActive));
    });

    assets.forEach((asset) => {
      asset.classList.toggle("is-active", asset.dataset.journeyAsset === id);
    });

    if (status) {
      status.textContent = step.dataset.journeyStatus || status.textContent;
    }

    if (progress && index >= 0) {
      progress.style.width = `${((index + 1) / steps.length) * 100}%`;
    }
  };

  steps.forEach((step) => {
    step.addEventListener("mouseenter", () => activate(step));
    step.addEventListener("focus", () => activate(step));
    step.addEventListener("click", () => activate(step));
    step.addEventListener("keydown", (event) => {
      if (!["ArrowRight", "ArrowDown", "ArrowLeft", "ArrowUp"].includes(event.key)) {
        return;
      }

      event.preventDefault();
      const direction = ["ArrowRight", "ArrowDown"].includes(event.key) ? 1 : -1;
      const nextIndex = (steps.indexOf(step) + direction + steps.length) % steps.length;
      steps[nextIndex].focus();
      activate(steps[nextIndex]);
    });
  });
}

function initSearchTimeline() {
  const timeline = document.querySelector("[data-search-timeline]");

  if (!timeline) {
    return;
  }

  const steps = Array.from(timeline.querySelectorAll("[data-timeline-step]"));
  const panels = Array.from(timeline.querySelectorAll("[data-timeline-preview]"));
  const status = timeline.querySelector("[data-timeline-status]");
  const progress = timeline.querySelector("[data-timeline-progress]");

  if (!steps.length || !panels.length) {
    return;
  }

  const activate = (step) => {
    const id = step.dataset.timelineStep;
    const index = steps.indexOf(step);

    steps.forEach((item) => {
      const isActive = item === step;
      item.classList.toggle("is-active", isActive);
      item.setAttribute("aria-selected", String(isActive));
    });

    panels.forEach((panel) => {
      panel.classList.toggle("is-active", panel.dataset.timelinePreview === id);
    });

    if (status) {
      status.textContent = step.dataset.timelineStatus || status.textContent;
    }

    if (progress && index >= 0) {
      progress.style.setProperty("--timeline-progress", `${((index + 1) / steps.length) * 100}%`);
    }
  };

  steps.forEach((step) => {
    step.addEventListener("mouseenter", () => activate(step));
    step.addEventListener("focus", () => activate(step));
    step.addEventListener("click", () => activate(step));
    step.addEventListener("keydown", (event) => {
      if (!["ArrowRight", "ArrowDown", "ArrowLeft", "ArrowUp"].includes(event.key)) {
        return;
      }

      event.preventDefault();
      const direction = ["ArrowRight", "ArrowDown"].includes(event.key) ? 1 : -1;
      const nextIndex = (steps.indexOf(step) + direction + steps.length) % steps.length;
      steps[nextIndex].focus();
      activate(steps[nextIndex]);
    });
  });
}

function setLabelStyles(container) {
  const positionById = {
    japan: { marginBottom: 8, translate: "-88% 0" },
    australia: { marginBottom: 8, translate: "-88% 0" },
    uk: { marginBottom: 22, translate: "-50% 0" },
  };

  container.querySelectorAll(".cobe-marker-label").forEach((label) => {
    const id = label.dataset.marker;
    const position = positionById[id] || { marginBottom: 8, translate: "-50% 0" };

    label.style.position = "absolute";
    label.style.positionAnchor = `--cobe-${id}`;
    label.style.bottom = "anchor(top)";
    label.style.left = "anchor(center)";
    label.style.marginBottom = `${position.marginBottom}px`;
    label.style.opacity = `var(--cobe-visible-${id}, 0)`;
    label.style.filter = `blur(calc((1 - var(--cobe-visible-${id}, 0)) * 8px))`;
    label.style.translate = position.translate;
  });
}

async function initGlobe() {
  const container = document.querySelector("[data-globe]");
  const canvas = container?.querySelector("canvas");

  if (!container || !canvas) {
    return;
  }

  setLabelStyles(container);

  try {
    const { default: createGlobe } = await import("./vendor/cobe.esm.js");

    const india = [21.1458, 79.0882];
    const markers = [
      { id: "india", location: india, size: 0.026 },
      { id: "germany", location: [51.1657, 10.4515], size: 0.026 },
      { id: "japan", location: [36.2048, 138.2529], size: 0.026 },
      { id: "uae", location: [23.4241, 53.8478], size: 0.026 },
      { id: "uk", location: [55.3781, -3.436], size: 0.026 },
      { id: "australia", location: [-25.2744, 133.7751], size: 0.026 },
    ];
    const arcs = [
      { id: "india-germany", from: india, to: [51.1657, 10.4515] },
      { id: "india-japan", from: india, to: [36.2048, 138.2529] },
      { id: "india-uae", from: india, to: [23.4241, 53.8478] },
      { id: "india-uk", from: india, to: [55.3781, -3.436] },
      { id: "india-australia", from: india, to: [-25.2744, 133.7751] },
    ];

    canvas.style.width = "100%";
    canvas.style.height = "100%";
    canvas.style.borderRadius = "50%";
    canvas.style.cursor = "grab";
    canvas.style.opacity = "0";
    canvas.style.touchAction = "none";
    canvas.style.transition = "opacity 1.2s ease";

    const state = {
      pointer: null,
      lastPointer: null,
      dragOffset: { phi: 0, theta: 0 },
      velocity: { phi: 0, theta: 0 },
      phiOffset: 0,
      thetaOffset: 0,
      paused: false,
      phi: Math.PI,
    };

    canvas.addEventListener("pointerdown", (event) => {
      state.pointer = { x: event.clientX, y: event.clientY };
      state.paused = true;
      canvas.style.cursor = "grabbing";
    });

    window.addEventListener(
      "pointermove",
      (event) => {
        if (!state.pointer) {
          return;
        }

        const deltaX = event.clientX - state.pointer.x;
        const deltaY = event.clientY - state.pointer.y;
        state.dragOffset = { phi: deltaX / 300, theta: deltaY / 1000 };

        const now = Date.now();
        if (state.lastPointer) {
          const dt = Math.max(now - state.lastPointer.t, 1);
          const maxVelocity = 0.15;
          state.velocity = {
            phi: Math.max(
              -maxVelocity,
              Math.min(maxVelocity, ((event.clientX - state.lastPointer.x) / dt) * 0.3),
            ),
            theta: Math.max(
              -maxVelocity,
              Math.min(maxVelocity, ((event.clientY - state.lastPointer.y) / dt) * 0.08),
            ),
          };
        }
        state.lastPointer = { x: event.clientX, y: event.clientY, t: now };
      },
      { passive: true },
    );

    window.addEventListener(
      "pointerup",
      () => {
        if (state.pointer) {
          state.phiOffset += state.dragOffset.phi;
          state.thetaOffset += state.dragOffset.theta;
          state.dragOffset = { phi: 0, theta: 0 };
          state.lastPointer = null;
        }

        state.pointer = null;
        state.paused = false;
        canvas.style.cursor = "grab";
      },
      { passive: true },
    );

    let globe = null;
    let animationId = 0;
    let resizeObserver = null;

    const config = {
      devicePixelRatio: Math.min(window.devicePixelRatio || 1, 2),
      width: canvas.offsetWidth,
      height: canvas.offsetWidth,
      phi: Math.PI,
      theta: 0.22,
      dark: 0,
      diffuse: 1.22,
      mapSamples: 16000,
      mapBrightness: 2.8,
      mapBaseBrightness: 0,
      baseColor: [1, 1, 1],
      markerColor: [237 / 255, 184 / 255, 67 / 255],
      glowColor: [1, 1, 1],
      markerElevation: 0.014,
      markers,
      arcs,
      arcColor: [5 / 255, 163 / 255, 229 / 255],
      arcWidth: 0.52,
      arcHeight: 0.2,
      opacity: 0.9,
    };

    const animate = () => {
      if (!globe) {
        return;
      }

      if (!state.paused) {
        state.phi += 0.0005;

        if (Math.abs(state.velocity.phi) > 0.0001 || Math.abs(state.velocity.theta) > 0.0001) {
          state.phiOffset += state.velocity.phi;
          state.thetaOffset += state.velocity.theta;
          state.velocity.phi *= 0.95;
          state.velocity.theta *= 0.95;
        }

        const thetaMin = -0.34;
        const thetaMax = 0.34;
        if (state.thetaOffset < thetaMin) {
          state.thetaOffset += (thetaMin - state.thetaOffset) * 0.1;
        } else if (state.thetaOffset > thetaMax) {
          state.thetaOffset += (thetaMax - state.thetaOffset) * 0.1;
        }
      }

      globe.update({
        width: canvas.offsetWidth,
        height: canvas.offsetWidth,
        phi: state.phi + state.phiOffset + state.dragOffset.phi,
        theta: 0.22 + state.thetaOffset + state.dragOffset.theta,
        dark: 0,
        diffuse: 1.22,
        mapBrightness: 2.8,
        mapBaseBrightness: 0,
        markerColor: [237 / 255, 184 / 255, 67 / 255],
        baseColor: [1, 1, 1],
        glowColor: [1, 1, 1],
        arcColor: [5 / 255, 163 / 255, 229 / 255],
        arcWidth: 0.52,
        arcHeight: 0.2,
        markerElevation: 0.014,
        opacity: 0.9,
        markers,
        arcs,
      });

      animationId = requestAnimationFrame(animate);
    };

    const mountGlobe = () => {
      const width = canvas.offsetWidth;

      if (!width || globe) {
        return;
      }

      globe = createGlobe(canvas, { ...config, width, height: width });
      animate();
      window.setTimeout(() => {
        canvas.style.opacity = "1";
      });
    };

    if (canvas.offsetWidth > 0) {
      mountGlobe();
    } else {
      resizeObserver = new ResizeObserver((entries) => {
        if (entries[0]?.contentRect.width > 0) {
          resizeObserver.disconnect();
          mountGlobe();
        }
      });
      resizeObserver.observe(canvas);
    }

    window.addEventListener("beforeunload", () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
      resizeObserver?.disconnect();
      globe?.destroy();
    });
  } catch (error) {
    container.classList.add("globe-fallback");
    console.warn("The interactive globe could not be loaded.", error);
  }
}

hydrateIcons();
initMobileNavigation();
initProcessWorkspace();
initSearchTimeline();
initGlobe();
