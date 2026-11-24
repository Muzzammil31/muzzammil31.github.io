import { useMemo, useState } from "react";
import { ArrowRight, ArrowUpRight, BookOpenText, BriefcaseBusiness, CalendarDays, CheckCircle2, ChevronLeft, ChevronRight, ExternalLink, GitBranch, Quote, Search, ShieldCheck, X } from "lucide-react";
import { SectionHeader } from "@/components/SectionHeader";
import { Reveal } from "@/components/Media";
import { askPortfolioAssistant } from "@/lib/portfolioAssistant";
import { deliveries, journalEntries, journeyEvents, type JournalEntry } from "@/data/story";

const root = import.meta.env.BASE_URL;

export function DeliveredWork() {
  const [kind, setKind] = useState("All");
  const kinds = ["All", "Client delivery", "University stakeholder delivery", "University implementation · FYP", "AI product / FYP", "Professional engineering"];
  const shown = deliveries.filter((entry) => kind === "All" || entry.kind === kind || (kind === "AI product / FYP" && (/FYP|product/.test(entry.kind))));
  return (
    <section id="delivered" className="relative scroll-mt-24 bg-[#f3f7fd] py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-5">
        <SectionHeader index="04" kicker="Work that shipped" title="DELIVERED & IMPLEMENTED" subtitle="Selected client work, university systems and applied AI products. Exact handover dates are shown only when documented." />
        <Reveal>
          <div className="mt-8 flex flex-wrap gap-2" role="group" aria-label="Filter deliveries">
            {kinds.map(item => <button type="button" key={item} aria-pressed={kind === item} onClick={() => setKind(item)} className={`rounded-full border px-3.5 py-2 text-xs font-semibold transition-all ${kind === item ? "border-[#235b9c] bg-[#235b9c] text-white" : "border-[#c8d8ec] bg-white text-[#31567b] hover:border-[#527db4]"}`}>{item === "University implementation · FYP" ? "University / FYP" : item === "University stakeholder delivery" ? "Stakeholder delivery" : item === "Professional engineering" ? "Professional work" : item}</button>)}
          </div>
        </Reveal>
        <div className="mt-7 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {shown.map((item, index) => <Reveal key={item.id} delay={(index % 3) * 55}>
            <article className="group flex h-full flex-col rounded-[1.35rem] border border-[#dbe6f3] bg-white p-5 shadow-[0_16px_45px_-38px_#14365e] transition-all hover:-translate-y-1.5 hover:shadow-[0_26px_54px_-35px_#214c83] sm:p-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <span className="rounded-full bg-[#e9f3ff] px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#245b99]">{item.kind}</span>
                <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-[#386387]"><CheckCircle2 className="h-3.5 w-3.5" /> {item.status}</span>
              </div>
              <div className="my-5 flex items-center gap-3">
                <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-[#16426c] to-[#6377c8] text-white"><BriefcaseBusiness className="h-6 w-6" /></div>
                <div>
                  <h3 className="font-display text-lg font-bold leading-snug text-[#152f51]">{item.title}</h3>
                  <p className="mt-1 text-xs text-[#647994]">{item.partner}</p>
                </div>
              </div>
              <p className="text-sm leading-6 text-[#516782]">{item.description}</p>
              <p className="mt-3 text-xs text-[#486581]"><span className="font-bold text-[#1c4c80]">My role:</span> {item.contribution}</p>
              <div className="mt-4 flex flex-wrap gap-1.5">{item.technology.slice(0, 5).map(tag => <span key={tag} className="rounded-md bg-[#f0f5fb] px-2.5 py-1 text-[10px] font-medium text-[#31577c]">{tag}</span>)}</div>
              <div className="mt-auto flex flex-wrap items-center justify-between gap-2 border-t border-[#e4ebf6] pt-5 text-xs text-[#4b6987]">
                <span className="inline-flex items-center gap-1.5 font-semibold"><CalendarDays className="h-3.5 w-3.5" /> {item.date}</span>
                <div className="flex items-center gap-3">
                  {item.evidence && <a href={root + item.evidence} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 font-bold text-[#2869a9]">Evidence <ExternalLink className="h-3 w-3" /></a>}
                  <button type="button" onClick={() => askPortfolioAssistant(`Explain the ${item.title} project and its architecture`)} className="inline-flex items-center gap-1 font-bold text-[#245d9b]">Ask AI <ArrowUpRight className="h-3.5 w-3.5" /></button>
                </div>
              </div>
            </article>
          </Reveal>)}
        </div>
        <p className="mt-5 text-xs leading-5 text-[#60758d]">Delivery dates, testimonial wording and client identities are not fabricated. Items marked “Owner-reported” need separate handover evidence before they can be described as independently verified.</p>
      </div>
    </section>
  );
}

export function Journey() {
  const [focus, setFocus] = useState<number | null>(null);
  const chosen = focus === null ? null : journeyEvents[focus];
  return (
    <section id="journey" className="relative scroll-mt-24 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5">
        <SectionHeader index="05" kicker="Education meets engineering" title="MY JOURNEY" subtitle="A living timeline of university work, internships, client delivery and AI engineering—not just a list of job titles." />
        <div className="mt-12 grid gap-10 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-start">
          <div className="relative ml-3 border-l-2 border-[#b8d2ee] pl-8 sm:ml-5 sm:pl-11">
            {journeyEvents.map((item, i) => <Reveal key={item.title} delay={Math.min(i, 4) * 60}>
              <button type="button" aria-pressed={focus === i} onClick={() => setFocus(focus === i ? null : i)} className={`group relative mb-6 w-full rounded-[1.25rem] border p-5 text-left transition-all duration-300 hover:translate-x-1 hover:shadow-lg sm:p-6 ${focus === i ? "border-[#588ed0] bg-[#eef5ff] shadow-lg" : "border-[#dae5f4] bg-white"}`}>
                <span aria-hidden="true" className={`absolute -left-[43px] top-7 h-[18px] w-[18px] rounded-full border-4 border-white shadow-[0_0_0_2px_#93badd] sm:-left-[55px] ${focus === i ? "bg-[#286bb8]" : "bg-[#77a5d5]"}`} />
                <span className="font-mono text-[11px] font-bold uppercase tracking-[.18em] text-[#276bb2]">{item.year}</span>
                <div className="mt-2 flex items-start justify-between gap-3">
                  <h3 className="font-display text-xl font-bold leading-tight text-[#163a63]">{item.title}</h3>
                  <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[#eef4fc] text-[#2a69a9] transition-transform group-hover:rotate-45"><ArrowUpRight className="h-4 w-4" /></span>
                </div>
                <p className="mt-1.5 text-sm font-semibold text-[#3b6897]">{item.label}</p>
                <p className="mt-3 text-sm leading-6 text-[#59718c]">{item.description}</p>
              </button>
            </Reveal>)}
          </div>
          <div className="lg:sticky lg:top-28">
            <div className="overflow-hidden rounded-[1.5rem] border border-[#aabfdd] bg-gradient-to-br from-[#0e2c4d] to-[#243960] p-7 text-white shadow-[0_25px_60px_-32px_#122a53]">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[.18em] text-[#a5d8ff]"><GitBranch className="h-4 w-4" /> Journey inspector</div>
              <p className="mt-8 text-xs font-bold text-[#9dc7f7]">{chosen?.year ?? "UNIVERSITY → INDUSTRY"}</p>
              <h3 className="mt-2 font-display text-2xl font-bold">{chosen?.title ?? "Choose a milestone"}</h3>
              <p className="mt-3 text-sm leading-6 text-[#cadaec]">{chosen?.description ?? "Select any milestone to see which actual projects belong to that stage. The projects listed here are connected to their delivery records."}</p>
              <div className="mt-5 space-y-2">
                {(chosen ? chosen.projectIds : ["kaswa", "uoh", "datasense"]).map(id => {
                  const project = deliveries.find(entry => entry.id === id);
                  return project ? <a key={id} href="#delivered" className="flex items-center justify-between rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-sm font-semibold transition-colors hover:bg-white/20"><span>{project.title}</span><ArrowRight className="h-4 w-4" /></a> : null;
                })}
                {chosen?.projectIds.length === 0 && <p className="text-sm text-[#c5d5e8]">Foundation and experimentation period</p>}
              </div>
              <div className="mt-6 flex items-center justify-between border-t border-white/15 pt-4">
                <span className="font-mono text-xs text-[#bed5eb]">Milestone {focus === null ? "—" : focus + 1} / {journeyEvents.length}</span>
                <div className="flex gap-2">
                  <button type="button" aria-label="Previous milestone" onClick={() => setFocus(focus === null ? 0 : Math.max(0, focus - 1))} className="grid h-9 w-9 place-items-center rounded-lg border border-white/20 bg-white/10 hover:bg-white/20"><ChevronLeft className="h-4 w-4" /></button>
                  <button type="button" aria-label="Next milestone" onClick={() => setFocus(focus === null ? 0 : Math.min(journeyEvents.length - 1, focus + 1))} className="grid h-9 w-9 place-items-center rounded-lg border border-white/20 bg-white/10 hover:bg-white/20"><ChevronRight className="h-4 w-4" /></button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const categories = ["All", "Engineering Notes", "University Days", "Build Diary", "Delivery Lessons"];
export function FieldNotes() {
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [active, setActive] = useState<JournalEntry | null>(null);
  const posts = useMemo(() => journalEntries.filter(entry => (category === "All" || entry.category === category) && (entry.title + " " + entry.excerpt).toLowerCase().includes(search.toLowerCase())), [category, search]);

  return <section id="blog" className="relative scroll-mt-24 bg-[#eff5fd] py-20 sm:py-28">
    <div className="mx-auto max-w-7xl px-5">
      <SectionHeader index="06" kicker="Notes from the workshop" title="THE BUILD DIARY" subtitle="Dated reflections on AI engineering, project delivery and life between university and industry. Written as personal field notes rather than invented daily events." />
      <div className="mt-9 rounded-[1.6rem] border border-[#cadbef] bg-white px-5 py-6 shadow-sm sm:px-8">
        <div className="flex flex-wrap justify-between gap-3">
          <div><p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[.15em] text-[#356fae]"><BookOpenText className="h-4 w-4" /> Personal field notes</p><h3 className="mt-2 font-display text-2xl font-bold text-[#183f69]">Ideas, challenges & lessons learned.</h3></div>
          <span className="self-start rounded-full border border-[#d2dfef] bg-[#f1f6fc] px-4 py-2 text-xs font-semibold text-[#42688e]">{journalEntries.length} entries · Updated 24 Nov 2026</span>
        </div>
        <div className="mt-5 flex flex-wrap gap-2">{categories.map(tag => <button key={tag} type="button" aria-pressed={tag === category} onClick={() => setCategory(tag)} className={`rounded-full border px-3 py-1.5 text-[11px] font-semibold transition-all ${tag === category ? "border-[#2c6097] bg-[#225b9a] text-white" : "border-[#cedcec] bg-white text-[#467092] hover:border-[#7ea8d4]"}`}>{tag}</button>)}</div>
        <label className="relative mt-4 block max-w-md"><Search className="absolute left-3 top-3 h-4 w-4 text-[#6585a3]" /><input type="search" value={search} onChange={event => setSearch(event.target.value)} placeholder="Search field notes..." className="w-full rounded-xl border border-[#d1dfed] bg-[#f7faff] py-2.5 pl-10 pr-4 text-sm text-[#1e426c] outline-none focus:border-[#5793ce]" /></label>
      </div>
      <div className="mt-7 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((entry, index) => <Reveal key={entry.id} delay={(index % 3) * 60}>
          <article className="group flex h-full flex-col rounded-[1.35rem] border border-[#d7e4f2] bg-white p-6 shadow-[0_20px_45px_-38px_#184771] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_25px_53px_-30px_#164f88]">
            <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-[#3f7bb5]"><span>{entry.category}</span><BookOpenText className="h-5 w-5" /></div>
            <div className="mt-5 flex items-center gap-2 text-xs text-[#748ba2]"><CalendarDays className="h-3.5 w-3.5" /> {entry.date} <span>·</span> {entry.minutes} min read</div>
            <h3 className="mt-3 font-display text-xl font-bold leading-snug text-[#153b63]">{entry.title}</h3>
            <p className="mt-3 text-sm leading-6 text-[#5b728c]">{entry.excerpt}</p>
            <button type="button" onClick={() => setActive(entry)} className="mt-auto flex items-center gap-2 pt-6 text-sm font-bold text-[#276db0]">Read entry <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" /></button>
          </article>
        </Reveal>)}
      </div>
      {posts.length === 0 && <p className="mt-8 text-sm text-[#647d9b]">No entries found. Try another topic.</p>}
    </div>
    {active && <div role="presentation" className="fixed inset-0 z-[90] flex items-start justify-center overflow-y-auto bg-[#07172b]/75 px-3 py-8 backdrop-blur-md sm:py-14" onMouseDown={e => { if(e.target === e.currentTarget) setActive(null); }}>
      <article role="dialog" aria-modal="true" aria-labelledby="journal-title" className="w-full max-w-[790px] rounded-[1.5rem] bg-white p-6 shadow-2xl sm:p-10">
        <div className="flex justify-between gap-5"><div className="text-xs font-bold uppercase tracking-[.15em] text-[#3875ac]">{active.category} · {active.date} · {active.minutes} min</div><button type="button" autoFocus onClick={() => setActive(null)} aria-label="Close diary entry" className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-[#cedae9] text-[#2c5c8b] hover:bg-[#eff5fc]"><X className="h-5 w-5" /></button></div>
        <h3 id="journal-title" className="mt-4 font-display text-3xl font-bold leading-tight text-[#123a65] sm:text-4xl">{active.title}</h3>
        <p className="mt-5 border-b border-[#e0e8f2] pb-5 text-base font-medium text-[#55718e]">{active.excerpt}</p>
        <div className="mt-7 space-y-5 text-[15px] leading-8 text-[#3c5673]">{active.paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}</div>
        <div className="mt-8 flex flex-wrap justify-between gap-3 border-t border-[#dbe6f3] pt-5">
          <a href="#delivered" onClick={() => setActive(null)} className="inline-flex items-center gap-2 text-sm font-semibold text-[#2867a5]">Related delivered work <ArrowUpRight className="h-4 w-4" /></a>
          <button type="button" onClick={() => setActive(null)} className="rounded-lg bg-[#205b98] px-4 py-2 text-sm font-semibold text-white">Back to diary</button>
        </div>
      </article>
    </div>}
  </section>;
}

export function Reputation() {
  return <section id="reviews" className="relative scroll-mt-24 py-20 sm:py-24">
    <div className="mx-auto max-w-7xl px-5">
      <SectionHeader index="07" kicker="Evidence over decoration" title="REVIEWS & RECOMMENDATIONS" subtitle="Professional feedback deserves accurate attribution. This area links to actual source records without inventing client praise." />
      <div className="mt-8 grid gap-5 md:grid-cols-2">
        <Reveal>
          <div className="panel flex h-full flex-col p-6 sm:p-8">
            <div className="flex items-center gap-3"><Quote className="h-7 w-7 text-primary" /><h3 className="text-xl font-bold">LinkedIn recommendations</h3></div>
            <blockquote className="mt-4 border-l-2 border-primary/40 pl-4 text-sm italic leading-7 text-muted-foreground">“Muzammil has a rare combination of deep technical knowledge and practical problem-solving skills.”</blockquote>
            <p className="mt-3 text-xs font-semibold text-primary">Muhammad Muddassir Hussain · LinkedIn recommendation</p>
            <p className="mt-3 text-xs leading-6 text-muted-foreground">One recommendation and its attribution could be verified on the public profile. A second recommendation was mentioned by the portfolio owner but its text is not publicly verifiable, so it has not been quoted.</p>
            <a href="https://www.linkedin.com/in/muzammil-hussain-864752246/" target="_blank" rel="noopener noreferrer" className="mt-auto inline-flex items-center gap-2 pt-6 text-sm font-semibold text-primary">Read recommendations on LinkedIn <ExternalLink className="h-4 w-4" /></a>
          </div>
        </Reveal>
        <Reveal delay={90}>
          <div className="panel flex h-full flex-col p-6 sm:p-8">
            <div className="flex items-center gap-3"><ShieldCheck className="h-7 w-7 text-primary" /><h3 className="text-xl font-bold">Client delivery evidence</h3></div>
            <p className="mt-4 text-sm leading-7 text-muted-foreground">The delivered-projects section lists what was built, the reported recipient, technology, and any original documentation. Client testimonials will appear here only after the exact review and permission to publish are available.</p>
            <a href="#delivered" className="mt-auto inline-flex items-center gap-2 pt-6 text-sm font-semibold text-primary">Inspect the delivered work <ArrowUpRight className="h-4 w-4" /></a>
          </div>
        </Reveal>
      </div>
    </div>
  </section>;
}
