/**
 * Portfolio Control Center bridge — portable to GitHub Pages and other static sites.
 *
 * Use: <script src="./portfolio-sync.js"
 *              data-feed="https://.../live/portfolio.json" defer></script>
 * Add data-dashboard-cv to the site's existing CV anchors.
 *
 * The script reads public JSON only. It never injects HTML or runs remote code.
 */
(() => {
  "use strict";

  const script = document.currentScript;
  const approvedFeed =
    "https://muzzammil-hussain-portfolio.excellentbrush8.chatgpt.site/live/portfolio.json";
  const configuredFeed = script?.getAttribute("data-feed");

  // Only trust the explicitly configured, read-only portfolio endpoint.
  if (configuredFeed !== approvedFeed) {
    console.warn("Portfolio sync: unrecognized control-system feed.");
    return;
  }

  const expectedCv = new URL("/live/cv", approvedFeed).href;
  const eventName = "portfolio-sync:update";
  const originalAnchors = new WeakMap();
  let snapshot = { status: "unavailable", data: null, checkedAt: 0 };
  let lastRequestAt = 0;
  let inFlight = null;

  function publishedCv(data) {
    return data && typeof data === "object" && !Array.isArray(data) && data.cvUrl === expectedCv;
  }

  function syncCvAnchors() {
    const newUrl = snapshot.status === "ready" && publishedCv(snapshot.data) ? expectedCv : null;

    document.querySelectorAll("a[data-dashboard-cv]").forEach((anchor) => {
      if (!originalAnchors.has(anchor)) {
        originalAnchors.set(anchor, {
          href: anchor.getAttribute("href"),
          download: anchor.getAttribute("download"),
        });
      }
      const original = originalAnchors.get(anchor);
      if (newUrl) {
        anchor.setAttribute("href", newUrl);
        anchor.removeAttribute("download");
      } else if (original) {
        if (original.href === null) anchor.removeAttribute("href");
        else anchor.setAttribute("href", original.href);
        if (original.download === null) anchor.removeAttribute("download");
        else anchor.setAttribute("download", original.download);
      }
    });
  }

  function announce(status, data) {
    snapshot = { status, data, checkedAt: Date.now() };
    syncCvAnchors();
    window.dispatchEvent(new CustomEvent(eventName, { detail: snapshot }));
  }

  async function refresh(force = false) {
    if (document.hidden || !navigator.onLine) return snapshot;
    if (inFlight) return inFlight;
    if (!force && Date.now() - lastRequestAt < 10000) return snapshot;

    lastRequestAt = Date.now();
    inFlight = (async () => {
      const controller = new AbortController();
      const timeout = window.setTimeout(() => controller.abort(), 7000);
      try {
        const response = await fetch(approvedFeed, {
          mode: "cors",
          credentials: "omit",
          cache: "no-store",
          redirect: "error",
          headers: { Accept: "application/json" },
          signal: controller.signal,
        });
        if (!response.ok) throw new Error("Control feed unavailable");
        const data = await response.json();
        if (!data || typeof data !== "object" || Array.isArray(data) || data.error) {
          throw new Error("Invalid control feed");
        }
        announce("ready", data);
      } catch {
        // Always preserve the local portfolio and downloadable CV during outages.
        announce("unavailable", null);
      } finally {
        window.clearTimeout(timeout);
      }
      return snapshot;
    })();

    try {
      return await inFlight;
    } finally {
      inFlight = null;
    }
  }

  window.PortfolioControlSync = Object.freeze({
    getLatest: () => snapshot,
    refresh,
  });

  document.addEventListener("visibilitychange", () => {
    if (!document.hidden) void refresh();
  });
  window.addEventListener("online", () => void refresh(true));
  window.addEventListener("offline", () => announce("unavailable", null));
  window.addEventListener("focus", () => void refresh());
  window.setInterval(() => void refresh(), 60000);

  if (document.readyState === "loading") {
    document.addEventListener(
      "DOMContentLoaded",
      () => {
        syncCvAnchors();
        void refresh();
      },
      { once: true },
    );
  } else {
    syncCvAnchors();
    void refresh();
  }
})();
