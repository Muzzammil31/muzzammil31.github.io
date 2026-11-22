import { useEffect, useState } from "react";

const milestones = [
  { id: "home", label: "Start" },
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "certificates", label: "Credentials" },
  { id: "cv", label: "CV Reader" },
  { id: "education", label: "Education" },
  { id: "achievements", label: "Research" },
  { id: "contact", label: "Connect" },
] as const;

const animatedTargets = [
  "section[id] h2",
  "section[id] > div h3",
  "#home .hero-stat-card",
  "#home .hero-visual-main",
  "#about .panel",
  "#experience .panel",
  "#projects .panel",
  "#projects article",
  "#skills .panel",
  "#skills .grid .rounded-xl",
  "#certificates .panel",
  "#education .panel",
  "#achievements .panel",
  "#achievements article",
  "#contact .panel",
  "#cv h2",
  "#cv .cv-document-scroll + div",
  "footer > div > div",
  "footer > div > p",
].join(", ");

const tiltTargets = [
  "#home .hero-stat-card",
  "#experience .panel",
  "#projects .panel",
  "#projects article",
  "#certificates button.panel",
  "#skills .panel",
  "#education .panel",
  "#achievements .panel",
  "#achievements article",
  "#contact .panel",
  "#about .panel",
].join(", ");

function allowedTarget(element: Element) {
  return (
    !element.closest('[role="dialog"], .fixed.inset-0, .lightbox') &&
    !element.closest("#cv .cv-document-scroll") &&
    !element.matches(".cv-page-surface")
  );
}

/**
 * Lightweight, progressive-enhancement motion director:
 * - one passive scroll listener + requestAnimationFrame
 * - one IntersectionObserver for all on-screen entrances
 * - one delegated pointer listener for softly reactive cards
 *
 * The site's content remains visible without JavaScript or when reduced motion
 * is requested; nothing is fetched or added to the build dependencies.
 */
export function MotionExperience() {
  const [active, setActive] = useState("home");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const root = document.documentElement;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    const sections = milestones
      .map((section) => document.getElementById(section.id))
      .filter((section): section is HTMLElement => section !== null);
    const seen = new WeakSet<Element>();

    let scrollFrame = 0;
    let previousHeroDepth = -1;
    const progressBar = document.querySelector<HTMLElement>(".motion-reading-progress > span");
    let pointerFrame = 0;
    let scanFrame = 0;
    let previousCard: HTMLElement | null = null;
    let pointerEvent: PointerEvent | null = null;
    let observer: IntersectionObserver | null = null;

    function updateScroll() {
      scrollFrame = 0;
      const available = Math.max(1, root.scrollHeight - window.innerHeight);
      const fraction = Math.min(1, Math.max(0, window.scrollY / available));
      const percent = Math.round(fraction * 100);
      setProgress((current) => (current === percent ? current : percent));
      // Keep the continuous progress animation on its own composited element.
      // Avoid invalidating styles for the whole document on each scroll frame.
      if (progressBar) progressBar.style.transform = `scaleX(${fraction})`;
      const heroDepth = Math.min(
        1,
        Math.round((window.scrollY / Math.max(500, window.innerHeight)) * 100) / 100,
      );
      if (heroDepth !== previousHeroDepth) {
        previousHeroDepth = heroDepth;
        root.style.setProperty("--motion-hero-scroll", String(heroDepth));
      }

      const reference = window.innerHeight * 0.42;
      let sectionId = sections[0]?.id ?? "home";
      for (const section of sections) {
        if (section.getBoundingClientRect().top <= reference) {
          sectionId = section.id;
        } else {
          break;
        }
      }
      setActive((current) => (current === sectionId ? current : sectionId));
    }

    function onScroll() {
      if (scrollFrame === 0) scrollFrame = window.requestAnimationFrame(updateScroll);
    }

    function revealOnIntersection(entries: IntersectionObserverEntry[]) {
      for (const entry of entries) {
        const element = entry.target as HTMLElement;
        if (entry.isIntersecting || entry.boundingClientRect.top < -100) {
          element.classList.add("motion-in-view");
        } else if (entry.boundingClientRect.top > window.innerHeight - 35) {
          // Replay entrances when visitors scroll up and return down.
          element.classList.remove("motion-in-view");
        }
      }
    }

    function scanElements() {
      scanFrame = 0;
      if (reduced.matches) return;

      let index = 0;
      for (const element of document.querySelectorAll<HTMLElement>(animatedTargets)) {
        if (!allowedTarget(element) || seen.has(element)) continue;
        seen.add(element);
        element.classList.add("motion-stage");
        element.style.setProperty("--motion-stagger", `${(index % 5) * 42}ms`);
        element.dataset["motionDirection"] =
          index % 3 === 1 ? "right" : index % 3 === 2 ? "left" : "up";
        const top = element.getBoundingClientRect().top;
        if (top < window.innerHeight * 0.88 || top < 0) {
          element.classList.add("motion-in-view");
        }
        observer?.observe(element);
        index++;
      }

      // Cards get reactive light, depth and a gentle lift, without replacing
      // the user's original card layouts or interactions.
      for (const card of document.querySelectorAll<HTMLElement>(tiltTargets)) {
        if (allowedTarget(card)) card.classList.add("motion-reactive-card");
      }
    }

    function requestScan() {
      if (!scanFrame) scanFrame = window.requestAnimationFrame(scanElements);
    }

    function clearTilt() {
      if (!previousCard) return;
      previousCard.style.removeProperty("--motion-tilt-x");
      previousCard.style.removeProperty("--motion-tilt-y");
      previousCard.style.removeProperty("--motion-light-x");
      previousCard.style.removeProperty("--motion-light-y");
      previousCard = null;
    }

    function performPointer() {
      pointerFrame = 0;
      if (reduced.matches || !finePointer.matches || !pointerEvent) {
        clearTilt();
        return;
      }
      const target = pointerEvent.target;
      const card =
        target instanceof Element ? target.closest<HTMLElement>(".motion-reactive-card") : null;
      if (card !== previousCard) clearTilt();
      if (!card) return;
      const rect = card.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      const x = Math.max(0, Math.min(1, (pointerEvent.clientX - rect.left) / rect.width));
      const y = Math.max(0, Math.min(1, (pointerEvent.clientY - rect.top) / rect.height));
      // 2.6deg maximum: noticeable enough to feel interactive, gentle enough
      // to preserve legibility and precise card controls.
      card.style.setProperty("--motion-tilt-x", `${((0.5 - y) * 5.2).toFixed(2)}deg`);
      card.style.setProperty("--motion-tilt-y", `${((x - 0.5) * 5.2).toFixed(2)}deg`);
      card.style.setProperty("--motion-light-x", `${(x * 100).toFixed(1)}%`);
      card.style.setProperty("--motion-light-y", `${(y * 100).toFixed(1)}%`);
      previousCard = card;
    }

    function onPointer(event: PointerEvent) {
      pointerEvent = event;
      if (!pointerFrame) pointerFrame = window.requestAnimationFrame(performPointer);
    }

    function onReducedMotionChanged() {
      if (reduced.matches) {
        for (const element of document.querySelectorAll(".motion-stage")) {
          element.classList.add("motion-in-view");
        }
        clearTilt();
      } else {
        requestScan();
      }
    }

    if ("IntersectionObserver" in window) {
      observer = new IntersectionObserver(revealOnIntersection, {
        threshold: 0.09,
        rootMargin: "0px 0px -30px 0px",
      });
    }

    root.classList.add("motion-enhanced");
    updateScroll();
    requestScan();

    const mutations = new MutationObserver(requestScan);
    mutations.observe(document.getElementById("root") ?? document.body, {
      childList: true,
      subtree: true,
    });

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    document.addEventListener("pointermove", onPointer, { passive: true });
    document.addEventListener("pointerleave", clearTilt);
    window.addEventListener("blur", clearTilt);
    reduced.addEventListener("change", onReducedMotionChanged);

    return () => {
      mutations.disconnect();
      observer?.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      document.removeEventListener("pointermove", onPointer);
      document.removeEventListener("pointerleave", clearTilt);
      window.removeEventListener("blur", clearTilt);
      reduced.removeEventListener("change", onReducedMotionChanged);
      window.cancelAnimationFrame(scrollFrame);
      window.cancelAnimationFrame(pointerFrame);
      window.cancelAnimationFrame(scanFrame);
      clearTilt();
      root.classList.remove("motion-enhanced");
      root.style.removeProperty("--motion-hero-scroll");
    };
  }, []);

  const currentIndex = milestones.findIndex((item) => item.id === active);
  const sectionName = milestones[currentIndex]?.label ?? "Explore";

  return (
    <>
      <div className="motion-reading-progress" aria-hidden="true">
        <span />
      </div>
      <nav className="motion-journey-rail" aria-label="Portfolio sections and reading progress">
        <div className="motion-journey-track" aria-hidden="true">
          <span style={{ height: `${progress}%` }} />
        </div>
        {milestones.map((item, index) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            title={item.label}
            aria-label={`Jump to ${item.label}`}
            aria-current={active === item.id ? "location" : undefined}
            className={`motion-journey-stop ${active === item.id ? "is-current" : ""}`}
          >
            <span className="motion-journey-dot" aria-hidden="true" />
            <span className="motion-journey-tooltip" aria-hidden="true">
              {String(index + 1).padStart(2, "0")} / {item.label}
            </span>
          </a>
        ))}
      </nav>
      <div className="motion-journey-caption" aria-hidden="true">
        <span className="motion-journey-status-dot" />
        <span className="motion-journey-caption-label">{sectionName}</span>
        <span className="motion-journey-divider" />
        <span className="motion-journey-percent">{String(progress).padStart(2, "0")}%</span>
      </div>
    </>
  );
}
