import { ArrowUpRight, Bot, FileCheck2, Layers3, ScanSearch } from "lucide-react";
import { projects, type Project } from "@/data/portfolio";
import { SmartImage } from "@/components/Media";
import { askPortfolioAssistant } from "@/lib/portfolioAssistant";

const caseStudies: { id: string; category: string; strength: string }[] = [
  {
    id: "uoh-assistant",
    category: "LLM / RAG application",
    strength: "Retrieval + multilingual interaction",
  },
  {
    id: "redfort-studio",
    category: "AI production workflow",
    strength: "Multi-model integration + reliability",
  },
  {
    id: "web-summarizer",
    category: "Applied NLP system",
    strength: "Document analysis + conversational AI",
  },
];

export function ReviewerShortlist({ onInspect }: { onInspect: (projectId: string) => void }) {
  const selected = caseStudies
    .map((item) => ({ ...item, project: projects.find((p) => p.id === item.id) }))
    .filter((item): item is typeof item & { project: Project } => item.project !== undefined);

  return (
    <section id="reviewer-highlights" aria-labelledby="reviewer-highlights-title" className="mt-9">
      <div className="overflow-hidden rounded-[1.65rem] border border-[#cfdff1] bg-gradient-to-br from-[#edf5ff] via-[#f9fbff] to-[#f2f3fd] px-4 py-6 shadow-[0_22px_60px_-44px_rgba(24,77,153,.6)] sm:px-7 sm:py-8">
        <div className="flex flex-wrap items-start justify-between gap-5">
          <div className="max-w-2xl">
            <p className="flex items-center gap-2 font-mono text-[10px] font-semibold uppercase tracking-[.23em] text-[#2566ae]">
              <ScanSearch className="h-4 w-4" /> For technical reviewers
            </p>
            <h3
              id="reviewer-highlights-title"
              className="mt-2 font-display text-2xl font-bold tracking-tight text-[#14375c] sm:text-3xl"
            >
              Three projects worth a closer look
            </h3>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-[#516781]">
              A faster way to assess how I approach real engineering problems: the need, the design,
              what I built, and the available project evidence. Detailed architecture and features
              are one click away.
            </p>
          </div>
          <a
            href="#cv"
            className="inline-flex shrink-0 items-center gap-2 rounded-xl border border-[#bfd5ed] bg-white/85 px-4 py-2.5 text-xs font-semibold text-[#17539b] transition hover:border-[#8eb4dc] hover:bg-white"
          >
            Review my CV <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-3">
          {selected.map(({ project, category, strength }) => (
            <article
              key={project.id}
              className="group flex min-w-0 flex-col overflow-hidden rounded-2xl border border-[#d7e3f2] bg-white shadow-[0_15px_35px_-27px_rgba(11,52,105,.42)] transition-transform duration-200 hover:-translate-y-1"
            >
              <div className="flex h-36 items-center justify-center overflow-hidden border-b border-[#e2eaf3] bg-gradient-to-br from-[#143459] to-[#244c78] p-3">
                <SmartImage
                  src={project.images[0] ?? ""}
                  alt={`${project.title} documentation preview`}
                  className="h-full w-full"
                  imgClassName="h-full w-full object-contain"
                />
              </div>
              <div className="flex flex-1 flex-col p-5">
                <p className="text-[10px] font-bold uppercase tracking-[.16em] text-[#3373b4]">
                  {category}
                </p>
                <h4 className="mt-1.5 font-display text-lg font-bold leading-snug text-[#163652]">
                  {project.title}
                </h4>
                <p className="mt-1 text-xs font-semibold text-[#526982]">{strength}</p>
                <div className="mt-5 space-y-3 text-[12px] leading-5 text-[#49617b]">
                  <div>
                    <span className="block text-[10px] font-bold uppercase tracking-widest text-[#2863a2]">
                      The challenge
                    </span>
                    <p className="mt-0.5">{project.problem}</p>
                  </div>
                  <div>
                    <span className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-[#2863a2]">
                      <Layers3 className="h-3 w-3" /> Engineering approach
                    </span>
                    <p className="mt-0.5">{project.architecture.slice(0, 2).join(" · ")}</p>
                  </div>
                  <div>
                    <span className="block text-[10px] font-bold uppercase tracking-widest text-[#2863a2]">
                      My contribution
                    </span>
                    <p className="mt-0.5">{project.contribution}</p>
                  </div>
                </div>
                <div className="mt-auto pt-5">
                  {project.report ? (
                    <a
                      href={`${import.meta.env.BASE_URL}${project.report}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mb-3 inline-flex items-center gap-1.5 text-[11px] font-semibold text-[#2763a7] underline-offset-4 hover:underline"
                    >
                      <FileCheck2 className="h-3.5 w-3.5" /> View original project poster{" "}
                      <ArrowUpRight className="h-3 w-3" />
                    </a>
                  ) : (
                    <p className="mb-3 flex items-center gap-1.5 text-[11px] font-medium text-[#64748b]">
                      <FileCheck2 className="h-3.5 w-3.5" /> Documentation preview available
                    </p>
                  )}
                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      type="button"
                      onClick={() => onInspect(project.id)}
                      className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-[#1b5597] px-3 py-2.5 text-[11px] font-bold text-white transition-colors hover:bg-[#103d77]"
                    >
                      Inspect case study <ArrowUpRight className="h-3.5 w-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        askPortfolioAssistant(
                          `Explain the architecture and features of ${project.title}`,
                        )
                      }
                      className="inline-flex items-center justify-center gap-1 rounded-xl border border-[#c7d7e8] px-3 py-2.5 text-[11px] font-bold text-[#1b5597] transition-colors hover:bg-[#eff5fc]"
                      aria-label={`Ask the assistant about ${project.title}`}
                    >
                      <Bot className="h-3.5 w-3.5" /> Ask
                    </button>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
        <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-[#d7e4f4] pt-4 text-xs text-[#5b718d]">
          <span>
            No invented benchmarks or metrics; details are drawn from the projects documented below.
          </span>
          <a
            href="#projects-search"
            className="font-semibold text-[#15559c] underline-offset-4 hover:underline"
          >
            Browse all {projects.length} projects
          </a>
        </div>
      </div>
    </section>
  );
}
