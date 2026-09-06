function hydrateIcons() {
  const iconMap = {
    "badge-check": "seal-check",
    "briefcase-business": "briefcase",
    "briefcase-medical": "first-aid",
    "building-2": "buildings",
    "check-circle-2": "check",
    "chevron-down": "caret-down",
    "clipboard-check": "clipboard-text",
    "book-open-text": "book-open-text",
    bridge: "bridge",
    "chart-line-up": "chart-line-up",
    clock: "clock",
    database: "database",
    "file-check-2": "file-text",
    "heart-handshake": "handshake",
    handshake: "handshake",
    "lock-key": "lock-key",
    languages: "translate",
    mail: "envelope",
    "messages-square": "chats",
    "mic-2": "microphone-stage",
    plane: "airplane",
    "plane-takeoff": "airplane-takeoff",
    "play-filled": "play",
    "shield-check": "shield-check",
    stethoscope: "stethoscope",
    sparkles: "magic-wand",
    "ticket-check": "ticket",
    "user-round-check": "user-circle-check",
    "users-round": "users-three",
    video: "video-camera",
  };

  const filledIcons = new Set(["play-filled", "star"]);

  document.querySelectorAll("[data-icon]").forEach((node) => {
    const requestedIcon = node.dataset.icon || "check-circle-2";
    const iconName = iconMap[requestedIcon] || requestedIcon;
    const iconSize = Number(node.dataset.size) || 16;
    const adjustedIconSize = iconSize < 18 ? iconSize + 1 : iconSize;
    const existingClass = node.getAttribute("class") || "";
    const isFilled = filledIcons.has(requestedIcon);
    const weightClass = isFilled ? "ph-fill" : "ph-bold";

    node.setAttribute(
      "class",
      `${existingClass} icon-svg icon-ph ${weightClass} ph-${iconName}${isFilled ? " icon-filled" : ""}`.trim(),
    );
    node.setAttribute("aria-hidden", "true");
    node.style.setProperty("--icon-size", `${adjustedIconSize}px`);
    node.textContent = "";
    node.removeAttribute("data-icon");
    node.removeAttribute("data-size");
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

function initArticleToc() {
  const toc = document.querySelector(".article-toc");

  if (!toc) {
    return;
  }

  const links = Array.from(toc.querySelectorAll("[data-toc-link]"));
  const sections = Array.from(document.querySelectorAll("[data-toc-section]"));

  if (!links.length || !sections.length) {
    return;
  }

  const setActive = (id) => {
    links.forEach((link) => {
      link.classList.toggle("is-active", link.dataset.tocLink === id);
    });
  };

  if (!("IntersectionObserver" in window)) {
    setActive(sections[0].id);
    return;
  }

  const visibleSections = new Map();
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          visibleSections.set(entry.target.id, entry.boundingClientRect.top);
        } else {
          visibleSections.delete(entry.target.id);
        }
      });

      if (!visibleSections.size) {
        return;
      }

      const [activeId] = Array.from(visibleSections.entries()).sort((a, b) => a[1] - b[1])[0];
      setActive(activeId);
    },
    {
      rootMargin: "-24% 0px -58% 0px",
      threshold: [0, 0.25, 0.5, 1],
    },
  );

  sections.forEach((section) => observer.observe(section));
  setActive(sections[0].id);
}

function initSubscribeForms() {
  document.querySelectorAll("[data-subscribe-form]").forEach((form) => {
    const status = form.querySelector("[data-subscribe-status]");
    const input = form.querySelector("input[type='email']");

    form.addEventListener("submit", (event) => {
      event.preventDefault();

      if (!input || !input.checkValidity()) {
        input?.reportValidity();
        return;
      }

      if (status) {
        status.textContent = "Thanks. You are on the Skillcase guidance list.";
      }

      form.classList.add("is-subscribed");
      input.value = "";
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
  const autoAdvanceDelay = 4500;
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let autoAdvanceTimer;

  if (!steps.length) {
    return;
  }

  const scheduleAutoAdvance = () => {
    if (reducedMotion || steps.length < 2) {
      return;
    }

    window.clearTimeout(autoAdvanceTimer);
    autoAdvanceTimer = window.setTimeout(() => {
      const activeIndex = steps.findIndex((item) => item.classList.contains("is-active"));
      const nextIndex = (activeIndex + 1) % steps.length;
      activate(steps[nextIndex]);
    }, autoAdvanceDelay);
  };

  const activate = (step) => {
    const id = step.dataset.timelineStep;
    const index = steps.indexOf(step);

    steps.forEach((item) => {
      const isActive = item === step;
      item.classList.toggle("is-active", isActive);
      if (item.hasAttribute("aria-selected")) {
        item.setAttribute("aria-selected", String(isActive));
      }
      if (isActive) {
        item.setAttribute("aria-current", "step");
      } else {
        item.removeAttribute("aria-current");
      }
    });

    if (panels.length) {
      panels.forEach((panel) => {
        panel.classList.toggle("is-active", panel.dataset.timelinePreview === id);
      });
    }

    if (status) {
      status.textContent = step.dataset.timelineStatus || status.textContent;
    }

    if (progress && index >= 0) {
      progress.style.setProperty("--timeline-progress", `${((index + 1) / steps.length) * 100}%`);
    }

    scheduleAutoAdvance();
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

  scheduleAutoAdvance();
}

function prepareGlobeLabels(container) {
  const positionById = {
    india: { marginBottom: 9, translateX: "-8%" },
    germany: { marginBottom: 5, translateX: "-55%" },
    japan: { marginBottom: 8, translateX: "-88%" },
    uae: { marginBottom: 7, translateX: "-100%" },
    australia: { marginBottom: 8, translateX: "-88%" },
    uk: { marginBottom: 22, translateX: "-92%" },
  };
  const labels = new Map();

  container.querySelectorAll(".cobe-marker-label").forEach((label) => {
    const id = label.dataset.marker;
    const position = positionById[id] || { marginBottom: 8, translateX: "-50%" };

    label.style.position = "absolute";
    label.style.right = "auto";
    label.style.bottom = "auto";
    label.style.margin = "0";
    label.style.transform = `translate3d(${position.translateX}, calc(-100% - ${position.marginBottom}px), 0)`;
    label.style.opacity = "0";
    label.style.filter = "blur(8px)";
    labels.set(id, label);
  });

  return labels;
}

function projectGlobeLabel(location, phi, theta) {
  const latitude = (location[0] * Math.PI) / 180;
  const longitude = (location[1] * Math.PI) / 180 - Math.PI;
  const latitudeCos = Math.cos(latitude);
  const radius = 0.814;
  const x = -latitudeCos * Math.cos(longitude) * radius;
  const y = Math.sin(latitude) * radius;
  const z = latitudeCos * Math.sin(longitude) * radius;
  const thetaCos = Math.cos(theta);
  const thetaSin = Math.sin(theta);
  const phiCos = Math.cos(phi);
  const phiSin = Math.sin(phi);
  const projectedX = phiCos * x + phiSin * z;
  const projectedY = phiSin * thetaSin * x + thetaCos * y - phiCos * thetaSin * z;
  const depth = -phiSin * thetaCos * x + thetaSin * y + phiCos * thetaCos * z;

  return {
    left: ((projectedX + 1) / 2) * 100,
    top: ((1 - projectedY) / 2) * 100,
    visibility: Math.max(0, Math.min(1, (depth + 0.025) / 0.09)),
  };
}

function initFaqAccordion() {
  document.querySelectorAll(".faq-list").forEach((list) => {
    const items = Array.from(list.querySelectorAll("details"));
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const cleanupByItem = new WeakMap();

    const cleanupAnimation = (item) => {
      const cleanup = cleanupByItem.get(item);

      if (cleanup) {
        cleanup();
        cleanupByItem.delete(item);
      }
    };

    const waitForHeightTransition = (item, callback) => {
      const done = () => {
        item.removeEventListener("transitionend", onEnd);
        window.clearTimeout(fallbackTimer);
        cleanupByItem.delete(item);
        callback();
      };

      const onEnd = (event) => {
        if (event.target === item && event.propertyName === "height") {
          done();
        }
      };

      const fallbackTimer = window.setTimeout(done, 360);

      cleanupByItem.set(item, () => {
        item.removeEventListener("transitionend", onEnd);
        window.clearTimeout(fallbackTimer);
      });

      item.addEventListener("transitionend", onEnd);
    };

    const closeItem = (item) => {
      const summary = item.querySelector("summary");

      if (!item.open || !summary) {
        return;
      }

      cleanupAnimation(item);

      if (prefersReducedMotion) {
        item.open = false;
        item.style.height = "";
        item.classList.remove("is-animating", "is-opening", "is-closing");
        return;
      }

      item.classList.remove("is-opening");
      item.classList.add("is-animating", "is-closing");
      item.style.height = `${item.offsetHeight}px`;
      item.offsetHeight;
      item.style.height = `${summary.offsetHeight}px`;

      waitForHeightTransition(item, () => {
        item.open = false;
        item.style.height = "";
        item.classList.remove("is-animating", "is-closing");
      });
    };

    const openItem = (item) => {
      const summary = item.querySelector("summary");

      if (!summary) {
        return;
      }

      cleanupAnimation(item);

      if (prefersReducedMotion) {
        items.forEach((otherItem) => {
          otherItem.open = otherItem === item;
        });
        return;
      }

      items.forEach((otherItem) => {
        if (otherItem !== item) {
          closeItem(otherItem);
        }
      });

      item.classList.remove("is-closing");
      item.classList.add("is-animating", "is-opening");
      item.style.height = `${summary.offsetHeight}px`;
      item.open = true;

      requestAnimationFrame(() => {
        item.style.height = `${item.scrollHeight}px`;
        waitForHeightTransition(item, () => {
          item.style.height = "";
          item.classList.remove("is-animating", "is-opening");
        });
      });
    };

    let activeItem = null;

    items.forEach((item) => {
      if (item.open && !activeItem) {
        activeItem = item;
      } else {
        item.open = false;
      }

      item.querySelector("summary")?.addEventListener("click", (event) => {
        event.preventDefault();

        if (item.open && !item.classList.contains("is-closing")) {
          closeItem(item);
          return;
        }

        openItem(item);
      });
    });
  });
}

async function initGlobe() {
  const container = document.querySelector("[data-globe]");
  const canvas = container?.querySelector("canvas");

  if (!container || !canvas) {
    return;
  }

  const labels = prepareGlobeLabels(container);

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
    canvas.style.touchAction = "pan-y";
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
    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const compactViewportQuery = window.matchMedia("(max-width: 760px)");
    const isIOS =
      /iPad|iPhone|iPod/.test(navigator.userAgent) ||
      (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
    const getRotationSpeed = () => {
      if (reducedMotionQuery.matches) {
        return compactViewportQuery.matches ? 0.0007 : 0.00028;
      }

      return compactViewportQuery.matches ? 0.00135 : 0.0005;
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

    const releasePointer = () => {
      if (state.pointer) {
        state.phiOffset += state.dragOffset.phi;
        state.thetaOffset += state.dragOffset.theta;
        state.dragOffset = { phi: 0, theta: 0 };
        state.lastPointer = null;
      }

      state.pointer = null;
      state.paused = false;
      canvas.style.cursor = "grab";
    };
    window.addEventListener("pointerup", releasePointer, { passive: true });
    window.addEventListener("pointercancel", releasePointer, { passive: true });

    let globe = null;
    let animationId = 0;
    let animationTimer = 0;
    let resizeObserver = null;
    let viewportObserver = null;
    let isGlobeVisible = true;

    const config = {
      devicePixelRatio: Math.min(window.devicePixelRatio || 1, 2),
      width: canvas.offsetWidth,
      height: canvas.offsetWidth,
      phi: Math.PI,
      theta: 0.22,
      dark: 0,
      diffuse: 1.22,
      mapSamples: compactViewportQuery.matches ? 8000 : 16000,
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

    const renderFrame = () => {
      if (!globe) {
        return;
      }

      const phi = state.phi + state.phiOffset + state.dragOffset.phi;
      const theta = 0.22 + state.thetaOffset + state.dragOffset.theta;

      globe.update({
        width: canvas.offsetWidth,
        height: canvas.offsetWidth,
        phi,
        theta,
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

      markers.forEach((marker) => {
        const label = labels.get(marker.id);
        if (!label) {
          return;
        }

        const point = projectGlobeLabel(marker.location, phi, theta);
        label.style.left = `${point.left.toFixed(3)}%`;
        label.style.top = `${point.top.toFixed(3)}%`;
        label.style.opacity = point.visibility.toFixed(3);
        label.style.filter = `blur(${((1 - point.visibility) * 8).toFixed(2)}px)`;
      });
    };

    const runAnimationStep = () => {
      if (!globe) {
        return;
      }

      if (!state.paused) {
        state.phi += getRotationSpeed();

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

      renderFrame();
    };

    const animate = () => {
      runAnimationStep();
      animationId = requestAnimationFrame(animate);
    };

    const startAnimation = () => {
      if (!globe) {
        return;
      }

      // On iPhone and iPad, WebKit can retain a stale requestAnimationFrame
      // handle after scrolling. A small timer keeps the WebGL canvas moving.
      if (isIOS) {
        if (animationTimer) {
          return;
        }
        runAnimationStep();
        animationTimer = window.setInterval(runAnimationStep, 1000 / 30);
        return;
      }

      if (animationId) {
        return;
      }
      animationId = requestAnimationFrame(animate);
    };

    const stopAnimation = () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
        animationId = 0;
      }

      if (animationTimer) {
        window.clearInterval(animationTimer);
        animationTimer = 0;
      }
    };

    const observeGlobeVisibility = () => {
      if (isIOS) {
        startAnimation();
        return;
      }

      if (!("IntersectionObserver" in window)) {
        startAnimation();
        return;
      }

      viewportObserver = new IntersectionObserver(
        ([entry]) => {
          isGlobeVisible = entry.isIntersecting;
          if (isGlobeVisible) {
            startAnimation();
          } else {
            stopAnimation();
          }
        },
        { rootMargin: "0px 0px -18% 0px", threshold: 0.18 },
      );

      viewportObserver.observe(container.closest(".globe-feature") || container);
    };

    const mountGlobe = () => {
      const width = canvas.offsetWidth;

      if (!width || globe) {
        return;
      }

      globe = createGlobe(canvas, { ...config, width, height: width });
      renderFrame();
      // Start immediately. Some iOS WebKit versions can delay the first
      // IntersectionObserver callback after a page restore.
      startAnimation();
      observeGlobeVisibility();
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

    const restartVisibleAnimation = () => {
      if (document.hidden || (!isIOS && !isGlobeVisible)) {
        stopAnimation();
        return;
      }

      // iOS may discard a pending animation frame while the tab is suspended.
      // Clear the stale id before starting a fresh loop.
      stopAnimation();
      startAnimation();
    };

    document.addEventListener("visibilitychange", restartVisibleAnimation);
    window.addEventListener("pageshow", restartVisibleAnimation);

    window.addEventListener("beforeunload", () => {
      stopAnimation();
      viewportObserver?.disconnect();
      resizeObserver?.disconnect();
      document.removeEventListener("visibilitychange", restartVisibleAnimation);
      window.removeEventListener("pageshow", restartVisibleAnimation);
      globe?.destroy();
    });
  } catch (error) {
    container.classList.add("globe-fallback");
    console.warn("The interactive globe could not be loaded.", error);
  }
}

hydrateIcons();
initArticleToc();
initSubscribeForms();
initSearchTimeline();
initFaqAccordion();
// Mount immediately so production browsers cannot miss the one-time lazy-load
// observer callback. The globe's own observer still pauses rendering offscreen.
initGlobe();
