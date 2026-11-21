import { useSyncExternalStore } from "react";

const feed = new URL(
  "https://muzzammil-hussain-portfolio.excellentbrush8.chatgpt.site/live/portfolio.json",
);
export const bundledCvHref = `${import.meta.env.BASE_URL}resume.pdf`;

export type PublicAnswer = { question: string; answer: string };

// The portable public/portfolio-sync.js bridge is the primary feed connection.
// Retain a direct-fetch fallback if that script is omitted on another static host.
type BridgeState = { status: "ready" | "unavailable"; data: unknown; checkedAt: number };

declare global {
  interface Window {
    PortfolioControlSync?: {
      getLatest: () => BridgeState;
      refresh: (force?: boolean) => Promise<BridgeState>;
    };
  }
}

type PortfolioSync = {
  cvHref: string;
  cvLabel: string;
  cvDownload: string | undefined;
  introduction: string;
  faq: PublicAnswer[];
  portfolioUrl: string | undefined;
  projects: { name: string; category: string }[];
  links: { label: string; url: string }[];
};
const fallback: PortfolioSync = {
  cvHref: bundledCvHref,
  cvLabel: "Download CV",
  cvDownload: "Muzammil_Hussain_CV.pdf",
  introduction: "",
  portfolioUrl: undefined,
  faq: [],
  projects: [],
  links: [],
};
let snapshot = fallback;
let pending = false;
let previousRefresh = 0;
let timer: number;
const listeners = new Set<() => void>();

function update(value: PortfolioSync) {
  if (JSON.stringify(value) === JSON.stringify(snapshot)) return;
  snapshot = value;
  listeners.forEach((listener) => listener());
}

function webLink(value: unknown): URL | undefined {
  if (typeof value !== "string" || value.length > 2048) return undefined;
  try {
    const url = new URL(value);
    return ["https:", "http:"].includes(url.protocol) && !url.username && !url.password
      ? url
      : undefined;
  } catch {
    return undefined;
  }
}

function entries(value: unknown, fields: string[], limit: number) {
  if (!Array.isArray(value)) return [];
  return value.slice(0, limit).flatMap((entry: unknown) => {
    if (!entry || typeof entry !== "object") return [];
    const record = entry as Record<string, unknown>;
    return fields.every((field) => typeof record[field] === "string") ? [record] : [];
  });
}

function validatedFeed(value: unknown): PortfolioSync {
  if (!value || typeof value !== "object") return fallback;
  const {
    introduction: rawIntroduction,
    cvUrl,
    cvLabel,
    faq: rawFaq,
    portfolioUrl,
    projects: rawProjects,
    links: rawLinks,
  } = value as Record<string, unknown>;
  const introduction =
    typeof rawIntroduction === "string" ? rawIntroduction.trim().slice(0, 600) : "";
  const shared = webLink(portfolioUrl);
  const sharedPath =
    shared?.origin === feed.origin && /^\/p\/[a-f0-9]{48}$/.test(shared.pathname)
      ? new URL(shared.pathname, feed).href
      : undefined;
  const cv = webLink(cvUrl);
  const publishedCv = cv?.href === new URL("/live/cv", feed).href;
  return {
    cvHref: publishedCv ? cv.href : fallback.cvHref,
    cvLabel: publishedCv && cvLabel === "View CV" ? "View CV" : fallback.cvLabel,
    cvDownload: publishedCv ? undefined : fallback.cvDownload,
    introduction,
    portfolioUrl: sharedPath,
    faq: entries(rawFaq, ["question", "answer"], 5)
      .map((entry) => ({
        question: String(entry["question"]).trim().slice(0, 160),
        answer: String(entry["answer"]).trim().slice(0, 550),
      }))
      .filter((entry) => entry.question && entry.answer),
    projects: entries(rawProjects, ["name", "category"], 40).map((entry) => ({
      name: String(entry["name"]).slice(0, 120),
      category: String(entry["category"]).slice(0, 80),
    })),
    links: entries(rawLinks, ["label", "url"], 40).flatMap((entry) => {
      const link = webLink(entry["url"]);
      return link ? [{ label: String(entry["label"]).slice(0, 120), url: link.href }] : [];
    }),
  };
}

function applyBridgeState(state: BridgeState | undefined) {
  update(state?.status === "ready" ? validatedFeed(state.data) : fallback);
}

function onBridgeUpdate(event: Event) {
  const { detail } = event as CustomEvent<BridgeState>;
  applyBridgeState(detail);
}

async function refresh() {
  if (window.PortfolioControlSync) {
    await window.PortfolioControlSync.refresh();
    return;
  }
  if (document.hidden || pending || Date.now() - previousRefresh < 10000) return;
  pending = true;
  previousRefresh = Date.now();
  try {
    const response = await fetch(feed, {
      credentials: "omit",
      redirect: "error",
      cache: "no-store",
      signal: AbortSignal.timeout(6500),
    });
    if (response.ok) update(validatedFeed(await response.json()));
    if (!response.ok) update(fallback);
  } catch {
    update(fallback);
  } finally {
    pending = false;
  }
}

function refreshOnReturn() {
  void refresh();
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  if (listeners.size === 1) {
    window.addEventListener("portfolio-sync:update", onBridgeUpdate);
    if (window.PortfolioControlSync) {
      applyBridgeState(window.PortfolioControlSync.getLatest());
      void window.PortfolioControlSync.refresh();
    } else {
      void refresh();
      timer = window.setInterval(refreshOnReturn, 60000);
      document.addEventListener("visibilitychange", refreshOnReturn);
    }
  }
  return () => {
    listeners.delete(listener);
    if (listeners.size === 0) {
      window.removeEventListener("portfolio-sync:update", onBridgeUpdate);
      window.clearInterval(timer);
      document.removeEventListener("visibilitychange", refreshOnReturn);
    }
  };
}

export function getDashboardPortfolio() {
  return snapshot;
}

export function useDashboardPortfolio() {
  return useSyncExternalStore(subscribe, getDashboardPortfolio, () => fallback);
}
