import { useState } from "react";
import {
  ArrowUpRight,
  X,
  Layers,
  Target,
  Sparkles,
  User,
  Search,
  Bot,
  MessageCircle,
  FileText,
} from "lucide-react";
import { askPortfolioAssistant } from "@/lib/portfolioAssistant";
import { useDashboardPortfolio } from "@/lib/dashboardPortfolio";
import { projects, type Project } from "@/data/portfolio";
import { Reveal, SmartImage, Thumb, Lightbox } from "@/components/Media";
import { SectionHeader } from "@/components/SectionHeader";
import { ReviewerShortlist } from "@/components/ReviewerShortlist";

const accentClass: Record<Project["accent"], string> = {
  cyan: "from-cyan/25",
  violet: "from-violet/25",
  amber: "from-amber/25",
  lime: "from-lime/25",
};

function SharedPortfolio() {
  const shared = useDashboardPortfolio();
  if (!shared.portfolioUrl && shared.projects.length === 0 && shared.links.length === 0)
    return null;
  return (
    <aside aria-labelledby="shared-portfolio-title" className="panel mt-8 rounded-2xl p-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h3 id="shared-portfolio-title" className="font-display text-lg font-bold">
          Portfolio highlights
        </h3>
        {shared.portfolioUrl && (
          <a
            href={shared.portfolioUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary"
          >
            Open portfolio and media <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </a>
        )}
      </div>
      {shared.projects.length > 0 && (
        <ul
          className="mt-4 grid gap-3 md:grid-cols-2 lg:grid-cols-3"
          aria-label="Selected projects"
        >
          {shared.projects.map((project, index) => (
            <li key={`${project.name}-${index}`} className="rounded-xl border border-border p-3">
              <p className="text-sm font-semibold text-foreground">{project.name}</p>
              <p className="mt-1 text-xs text-muted-foreground">{project.category}</p>
            </li>
          ))}
        </ul>
      )}
      {shared.links.length > 0 && (
        <ul className="mt-4 flex flex-wrap gap-2" aria-label="Selected links">
          {shared.links.map((link, index) => (
            <li key={`${link.url}-${index}`}>
              <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-2 text-sm text-primary"
              >
                {link.label} <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </li>
          ))}
        </ul>
      )}
    </aside>
  );
}

export function Projects() {
  const [openId, setOpenId] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("All");
  const categories = ["All", "LLMs / NLP", "Computer Vision", "Automation", "Data / Apps"];
  const visibleProjects = projects.filter((p) => {
    const haystack = [p.title, p.tagline, ...p.stack].join(" ").toLowerCase();
    if (!haystack.includes(query.trim().toLowerCase())) return false;
    if (filter === "LLMs / NLP")
      return /llm|rag|nlp|language|agent|convers|summar|translation|sentiment/i.test(haystack);
    if (filter === "Computer Vision")
      return /vision|video|image|yolo|ocr|detect|pothole|fracture|insect|medical|pytorch/i.test(
        haystack,
      );
    if (filter === "Automation")
      return /automat|software|robot|agent|scrap|interview|job/i.test(haystack);
    if (filter === "Data / Apps")
      return /data|dashboard|app|web|software|news|training/i.test(haystack);
    return true;
  });
  const [box, setBox] = useState<{ images: string[]; index: number; caption: string } | null>(null);
  const active = projects.find((p) => p.id === openId) ?? null;

  return (
    <section id="projects" className="relative py-24">
      <div className="pointer-events-none absolute inset-0 grid-bg opacity-20 [mask-image:radial-gradient(60%_50%_at_50%_50%,black,transparent)]" />
      <div className="relative mx-auto max-w-7xl px-5">
        <SectionHeader
          index="03"
          kicker="Systems"
          title="WORK & PROJECTS"
          subtitle="From deployed university systems and business software to AI research and experimental builds. Explore the architecture and my contribution."
        />

        <ReviewerShortlist onInspect={setOpenId} />

        <SharedPortfolio />

        <div className="mt-9 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-[#d5e2f2] bg-gradient-to-r from-[#f2f7ff] to-white px-5 py-4 shadow-sm">
          <div className="flex min-w-0 items-center gap-3">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-[#16385f] text-[#d4e8ff]">
              <Bot className="h-5 w-5" />
            </span>
            <div>
              <p className="text-sm font-semibold text-foreground">Meet the Project Assistant</p>
              <p className="mt-0.5 text-xs text-muted-foreground">
                Ask about architectures, tech stacks, features and my contribution.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => askPortfolioAssistant("Help me explore your best AI projects")}
            className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-[#1755ba] px-4 py-2.5 text-xs font-semibold text-white transition hover:-translate-y-0.5 hover:bg-[#103f92]"
          >
            <MessageCircle className="h-4 w-4" /> Ask about projects
          </button>
        </div>

        <div
          id="projects-search"
          className="mt-8 flex scroll-mt-28 flex-col gap-4 lg:flex-row lg:items-center lg:justify-between"
        >
          <div className="flex flex-wrap gap-2" role="group" aria-label="Filter projects">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                aria-pressed={filter === category}
                onClick={() => setFilter(category)}
                className={`rounded-full border px-3.5 py-2 text-xs font-semibold transition-colors ${filter === category ? "border-primary bg-primary text-primary-foreground" : "border-border bg-surface text-muted-foreground hover:text-foreground"}`}
              >
                {category}
              </button>
            ))}
          </div>
          <label className="flex w-full items-center gap-2 rounded-xl border border-border bg-surface px-3.5 py-2.5 text-muted-foreground lg:w-60">
            <Search className="h-4 w-4" />
            <input
              type="search"
              placeholder="Search projects"
              aria-label="Search projects"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
            />
          </label>
        </div>
        <p className="mt-5 text-xs font-medium text-muted-foreground">
          Showing {visibleProjects.length} of {projects.length} projects
        </p>
        <div className="mt-5 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {visibleProjects.map((p, i) => (
            <Reveal key={p.id} delay={i * 60}>
              <article className="group panel relative h-full overflow-hidden p-0 transition-all duration-300 hover:-translate-y-2 hover:glow-ring">
                <div
                  className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${accentClass[p.accent]} to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100`}
                />
                <button
                  type="button"
                  onClick={() => setOpenId(p.id)}
                  className="relative block aspect-video w-full overflow-hidden border-b border-border"
                  aria-label={`Explore ${p.title}`}
                >
                  <SmartImage
                    src={p.images[0] ?? ""}
                    alt={p.title}
                    label="Add project image"
                    className="h-full w-full"
                    imgClassName="h-full w-full bg-[#123157] object-contain transition-transform duration-700 group-hover:scale-105"
                  />
                  <span className="absolute left-3 top-3 rounded-full border border-border bg-background/70 px-2.5 py-1 font-mono text-[10px] tracking-widest text-primary backdrop-blur">
                    {p.code}
                  </span>
                </button>

                <div className="relative p-5">
                  {["redfort-studio", "uoh-assistant", "kaswa-software"].includes(p.id) && (
                    <span className="mb-2 inline-flex items-center rounded-full bg-primary/10 px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-wider text-primary">
                      Featured work
                    </span>
                  )}
                  <h3 className="font-display text-xl font-semibold">{p.title}</h3>
                  <p className="mt-1.5 text-sm text-muted-foreground">{p.tagline}</p>
                  {p.report && (
                    <span className="mt-2 inline-flex items-center gap-1.5 text-[11px] font-medium text-primary">
                      <FileText className="h-3.5 w-3.5" /> Original project poster available
                    </span>
                  )}

                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {p.stack.slice(0, 4).map((s) => (
                      <span
                        key={s}
                        className="rounded-full border border-border bg-surface px-2.5 py-1 font-mono text-[10px] text-muted-foreground"
                      >
                        {s}
                      </span>
                    ))}
                    {p.stack.length > 4 && (
                      <span className="rounded-full border border-border bg-surface px-2.5 py-1 font-mono text-[10px] text-primary">
                        +{p.stack.length - 4}
                      </span>
                    )}
                  </div>

                  <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
                    <button
                      type="button"
                      onClick={() => setOpenId(p.id)}
                      className="inline-flex items-center gap-2 text-sm font-semibold text-primary transition-colors hover:text-foreground"
                    >
                      Inspect system <ArrowUpRight className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => askPortfolioAssistant(`Tell me about ${p.title}`)}
                      className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/5 px-3 py-1.5 text-xs font-semibold text-primary transition-colors hover:border-primary/50 hover:bg-primary/10"
                      aria-label={`Ask the assistant about ${p.title}`}
                    >
                      <Bot className="h-3.5 w-3.5" /> Ask
                    </button>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>

      {active && (
        <div
          className="fixed inset-0 z-[75] flex items-start justify-center overflow-y-auto bg-background/90 p-4 py-10 backdrop-blur-xl"
          onClick={() => setOpenId(null)}
        >
          <div
            className="panel relative w-full max-w-4xl animate-rise p-0"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setOpenId(null)}
              className="absolute right-4 top-4 z-10 grid h-10 w-10 place-items-center rounded-full border border-border bg-background/80 backdrop-blur transition-colors hover:bg-surface-2"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="relative aspect-[21/9] overflow-hidden rounded-t-2xl border-b border-border">
              <SmartImage
                src={active.images[0] ?? ""}
                alt={active.title}
                label="Add project image"
                className="h-full w-full"
                imgClassName="h-full w-full bg-[#123157] object-contain"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
              <div className="absolute bottom-4 left-5">
                <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-primary">
                  {active.code}
                </span>
                <h3 className="font-display text-2xl font-bold sm:text-3xl">{active.title}</h3>
                <p className="text-sm text-muted-foreground">{active.tagline}</p>
              </div>
            </div>

            <div className="grid gap-6 p-6 md:grid-cols-2">
              {active.report && (
                <a
                  href={`${import.meta.env.BASE_URL}${active.report}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="md:col-span-2 inline-flex w-fit items-center gap-2 rounded-xl border border-primary/25 bg-primary/10 px-4 py-2.5 text-sm font-semibold text-primary transition hover:bg-primary/15"
                >
                  <FileText className="h-4 w-4" /> View original project poster (PDF){" "}
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              )}
              <Block icon={<Target className="h-4 w-4" />} title="Problem">
                <p className="text-sm text-muted-foreground">{active.problem}</p>
              </Block>
              <Block icon={<Layers className="h-4 w-4" />} title="Architecture">
                <ul className="space-y-1.5 text-sm text-muted-foreground">
                  {active.architecture.map((a) => (
                    <li key={a} className="flex gap-2">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                      {a}
                    </li>
                  ))}
                </ul>
              </Block>
              <Block icon={<Sparkles className="h-4 w-4" />} title="Key features">
                <ul className="space-y-1.5 text-sm text-muted-foreground">
                  {active.features.map((a) => (
                    <li key={a} className="flex gap-2">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                      {a}
                    </li>
                  ))}
                </ul>
              </Block>
              <Block icon={<User className="h-4 w-4" />} title="My contribution">
                <p className="text-sm text-muted-foreground">{active.contribution}</p>
              </Block>

              <div className="md:col-span-2">
                <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.24em] text-muted-foreground">
                  {active.images.length > 0
                    ? "Gallery — click to enlarge"
                    : "Project documented · no screenshot available"}
                </p>
                <div className="grid gap-3 sm:grid-cols-2">
                  {active.images.map((img, i) => (
                    <Thumb
                      key={img}
                      src={img}
                      alt={`${active.title} screenshot ${i + 1}`}
                      onOpen={() =>
                        setBox({ images: active.images, index: i, caption: active.title })
                      }
                    />
                  ))}
                </div>
              </div>

              <div className="md:col-span-2">
                <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.24em] text-muted-foreground">
                  Tech stack
                </p>
                <div className="flex flex-wrap gap-2">
                  {active.stack.map((s) => (
                    <span
                      key={s}
                      className="rounded-full border border-border bg-surface px-3 py-1 text-xs text-muted-foreground"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {box && (
        <Lightbox
          images={box.images}
          index={box.index}
          caption={box.caption}
          onClose={() => setBox(null)}
          onIndex={(i) => setBox({ ...box, index: i })}
        />
      )}
    </section>
  );
}

function Block({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-border bg-surface/60 p-4">
      <div className="mb-2 flex items-center gap-2 text-primary">
        {icon}
        <h4 className="font-display text-sm font-semibold uppercase tracking-[0.14em]">{title}</h4>
      </div>
      {children}
    </div>
  );
}
