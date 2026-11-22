import { useCallback, useEffect, useRef, useState, type KeyboardEvent } from "react";
import {
  ArrowDown,
  ArrowDownToLine,
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  FileText,
  Maximize2,
  Minus,
  Plus,
} from "lucide-react";
import { SectionHeader } from "@/components/SectionHeader";
import { useDashboardPortfolio, bundledCvHref } from "@/lib/dashboardPortfolio";

const pages = [
  { number: 1, title: "Profile & Experience" },
  { number: 2, title: "Internships & Skills" },
  { number: 3, title: "Achievements & Projects" },
  { number: 4, title: "Additional AI Projects" },
] as const;

const imageRoot = `${import.meta.env.BASE_URL}images/cv/`;
const zoomLevels = [80, 100, 125, 150];

export function CVViewer() {
  const synced = useDashboardPortfolio();
  const [activePage, setActivePage] = useState(1);
  const [zoom, setZoom] = useState(100);
  const [atEnd, setAtEnd] = useState(false);
  const [failedPages, setFailedPages] = useState<number[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const pageRefs = useRef<(HTMLDivElement | null)[]>([]);

  const scrollToPage = useCallback((page: number) => {
    const target = pageRefs.current[page - 1];
    const container = scrollRef.current;
    if (!target || !container) return;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    container.scrollTo({
      top:
        target.getBoundingClientRect().top -
        container.getBoundingClientRect().top +
        container.scrollTop -
        14,
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
    setActivePage(page);
  }, []);

  useEffect(() => {
    let scheduled = false;
    const container = scrollRef.current;
    if (!container) return;

    const trackPage = () => {
      if (scheduled) return;
      scheduled = true;
      window.requestAnimationFrame(() => {
        const top = container.getBoundingClientRect().top;
        let bestPage = 1;
        let bestDistance = Number.POSITIVE_INFINITY;
        pageRefs.current.forEach((element, index) => {
          if (!element) return;
          const distance = Math.abs(element.getBoundingClientRect().top - top - 16);
          if (distance < bestDistance) {
            bestDistance = distance;
            bestPage = index + 1;
          }
        });
        setActivePage(bestPage);
        setAtEnd(container.scrollTop + container.clientHeight >= container.scrollHeight - 48);
        scheduled = false;
      });
    };
    container.addEventListener("scroll", trackPage, { passive: true });
    return () => container.removeEventListener("scroll", trackPage);
  }, []);

  const adjustZoom = (direction: -1 | 1) => {
    const index = zoomLevels.indexOf(zoom);
    const next = Math.max(0, Math.min(zoomLevels.length - 1, index + direction));
    setZoom(zoomLevels[next] ?? 100);
  };

  const onViewerKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.target !== event.currentTarget) return;
    if (event.key === "ArrowRight" || event.key === "PageDown") {
      event.preventDefault();
      if (activePage === pages.length && atEnd) {
        const nextSection = document.getElementById("education");
        nextSection?.scrollIntoView({
          behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
            ? "auto"
            : "smooth",
          block: "start",
        });
      } else {
        scrollToPage(Math.min(pages.length, activePage + 1));
      }
    } else if (event.key === "ArrowLeft" || event.key === "PageUp") {
      event.preventDefault();
      scrollToPage(Math.max(1, activePage - 1));
    }
  };

  return (
    <section
      id="cv"
      className="section-shell scroll-mt-24 py-20 sm:py-28"
      aria-labelledby="cv-viewer-heading"
    >
      <div className="container-shell mx-auto w-[calc(100%-1.5rem)] max-w-[1120px] sm:w-full sm:px-8 lg:px-10">
        <div className="flex flex-wrap items-end justify-between gap-5">
          <div>
            <SectionHeader
              index="08"
              kicker="INTERACTIVE RESUME"
              title="Explore my CV"
              subtitle="Read all four pages without leaving the portfolio. Choose a page from the thumbnails, scroll to continue, or open the original PDF."
            />
          </div>
          <a
            href={synced.cvHref}
            data-dashboard-cv
            download={synced.cvDownload}
            className="inline-flex items-center gap-2 rounded-xl border border-primary/25 bg-primary/10 px-5 py-3 text-sm font-semibold text-primary transition-colors hover:bg-primary/15"
          >
            <ArrowDownToLine className="h-4 w-4" />
            Download CV
          </a>
        </div>

        <div className="mt-9 overflow-hidden rounded-[1.6rem] border border-border bg-surface shadow-[0_25px_85px_-45px_rgba(0,0,0,.65)]">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border bg-surface-2/80 px-4 py-4 sm:px-6">
            <div className="flex min-w-0 items-center gap-3">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-primary/20 bg-primary/10 text-primary">
                <FileText className="h-5 w-5" />
              </span>
              <div className="min-w-0">
                <h3
                  id="cv-viewer-heading"
                  className="truncate text-sm font-semibold text-foreground sm:text-base"
                >
                  Muzammil Hussain · Curriculum Vitae
                </h3>
                <p className="text-xs text-muted-foreground">
                  {pages.length} pages · PDF document · On-screen preview
                </p>
              </div>
            </div>
            <a
              href={bundledCvHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-xs font-semibold text-foreground transition-colors hover:bg-background/50"
            >
              <ExternalLink className="h-3.5 w-3.5" />
              Open original PDF
            </a>
          </div>

          <div className="grid min-w-0 grid-cols-1 lg:grid-cols-[180px_minmax(0,1fr)]">
            <aside
              aria-label="CV page thumbnails"
              className="border-b border-border bg-background/40 p-4 lg:border-b-0 lg:border-r lg:p-5"
            >
              <p className="mb-3 hidden font-mono text-[10px] font-semibold uppercase tracking-[.2em] text-muted-foreground lg:block">
                Pages
              </p>
              <div className="flex gap-3 overflow-x-auto pb-2 lg:max-h-[680px] lg:flex-col lg:overflow-y-auto lg:overflow-x-hidden lg:pr-1">
                {pages.map((page) => (
                  <button
                    key={page.number}
                    type="button"
                    onClick={() => scrollToPage(page.number)}
                    aria-label={`View CV page ${page.number}`}
                    aria-current={activePage === page.number ? "page" : undefined}
                    className={`group min-w-[94px] max-w-[122px] shrink-0 rounded-xl border p-2 text-left transition-all duration-200 lg:w-full lg:max-w-none lg:min-w-0 ${
                      activePage === page.number
                        ? "border-primary/70 bg-primary/10 shadow-[0_0_0_1px_rgba(103,202,247,.15)]"
                        : "border-border bg-surface hover:border-primary/45 hover:bg-surface-2"
                    }`}
                  >
                    <img
                      src={`${imageRoot}thumb-${page.number}.jpg`}
                      alt={`Thumbnail of CV page ${page.number}`}
                      width={292}
                      height={413}
                      loading="lazy"
                      className="mx-auto aspect-[595/842] w-full rounded-md border border-white/15 bg-white object-contain shadow-sm"
                    />
                    <span className="mt-2 block text-center font-mono text-[10px] font-semibold text-foreground">
                      PAGE {String(page.number).padStart(2, "0")}
                    </span>
                    <span className="mt-0.5 hidden truncate text-center text-[10px] text-muted-foreground lg:block">
                      {page.title}
                    </span>
                  </button>
                ))}
              </div>
            </aside>

            <div className="min-w-0 bg-[radial-gradient(circle_at_50%_0%,rgba(59,117,195,.16),transparent_45%)]">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border bg-surface/80 px-4 py-3 sm:px-5">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    aria-label="Previous CV page"
                    title="Previous page"
                    disabled={activePage === 1}
                    onClick={() => scrollToPage(activePage - 1)}
                    className="cv-toolbar-button"
                  >
                    <ArrowLeft className="h-4 w-4" />
                  </button>
                  <span className="min-w-[98px] text-center font-mono text-xs font-semibold text-foreground">
                    {activePage} <span className="text-muted-foreground">/ {pages.length}</span>
                  </span>
                  <button
                    type="button"
                    aria-label="Next CV page"
                    title="Next page"
                    disabled={activePage === pages.length}
                    onClick={() => scrollToPage(activePage + 1)}
                    className="cv-toolbar-button"
                  >
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    aria-label="Zoom out of CV"
                    disabled={zoom === zoomLevels[0]}
                    onClick={() => adjustZoom(-1)}
                    className="cv-toolbar-button"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <output className="min-w-[48px] text-center font-mono text-xs font-semibold text-foreground">
                    {zoom}%
                  </output>
                  <button
                    type="button"
                    aria-label="Zoom into CV"
                    disabled={zoom === zoomLevels[zoomLevels.length - 1]}
                    onClick={() => adjustZoom(1)}
                    className="cv-toolbar-button"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div
                ref={scrollRef}
                tabIndex={0}
                onKeyDown={onViewerKeyDown}
                role="region"
                aria-label="Scrollable CV pages. Use the page thumbnails or arrow keys to navigate."
                className="cv-document-scroll relative h-[540px] overflow-auto overscroll-y-auto px-3 py-5 outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary sm:h-[640px] sm:p-6 lg:h-[720px]"
              >
                <div
                  className="flex flex-col items-center gap-8"
                  style={{ minWidth: zoom > 100 ? `${zoom}%` : "100%" }}
                >
                  {pages.map((page) => (
                    <div
                      key={page.number}
                      ref={(node) => {
                        pageRefs.current[page.number - 1] = node;
                      }}
                      className={`cv-page-surface relative w-full max-w-[760px] scroll-mt-3 ${activePage === page.number ? "cv-page-active" : ""}`}
                      style={{
                        width: zoom < 100 ? `${zoom}%` : "100%",
                        maxWidth: zoom > 100 ? `${(760 * zoom) / 100}px` : "760px",
                      }}
                    >
                      <div className="mb-2 flex items-center justify-between px-1 text-[10px] font-semibold uppercase tracking-[.18em] text-muted-foreground">
                        <span>{page.title}</span>
                        <span>{String(page.number).padStart(2, "0")} / 04</span>
                      </div>
                      {failedPages.includes(page.number) ? (
                        <div className="flex aspect-[595/842] items-center justify-center rounded-lg border border-border bg-surface p-8 text-center text-sm text-muted-foreground">
                          Preview unavailable. Use “Open original PDF” above to read this page.
                        </div>
                      ) : (
                        <img
                          src={`${imageRoot}page-${page.number}.jpg`}
                          alt={`CV page ${page.number}: ${page.title}`}
                          width={1310}
                          height={1853}
                          loading={page.number === 1 ? "eager" : "lazy"}
                          decoding="async"
                          onError={() =>
                            setFailedPages((existing) => [...new Set([...existing, page.number])])
                          }
                          className="block h-auto w-full rounded-md border border-black/15 bg-white shadow-[0_22px_50px_-20px_rgba(0,0,0,.55)]"
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex items-center justify-between gap-2 border-t border-border bg-surface/80 px-4 py-3 text-[11px] text-muted-foreground sm:px-6">
                <span>
                  {atEnd
                    ? "End of CV · Continue exploring the portfolio"
                    : "Scroll through the pages or choose a thumbnail"}
                </span>
                {atEnd ? (
                  <a
                    href="#education"
                    className="inline-flex shrink-0 items-center gap-1.5 rounded-lg bg-primary/10 px-3 py-2 text-[11px] font-semibold text-primary transition-colors hover:bg-primary/20"
                  >
                    Continue to Education <ArrowDown className="h-3.5 w-3.5" />
                  </a>
                ) : (
                  <span className="hidden items-center gap-1 font-mono sm:inline-flex">
                    <Maximize2 className="h-3.5 w-3.5" /> Zoom up to 150%
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
        {synced.cvHref !== bundledCvHref && (
          <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
            This on-page preview shows the portfolio's four-page CV. The Control Center has a newer
            CV link; use Download CV to access that edition.
          </p>
        )}
      </div>
    </section>
  );
}
