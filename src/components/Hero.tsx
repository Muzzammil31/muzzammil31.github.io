import { useEffect, useRef, useState } from "react";
import {
  ArrowDownRight,
  ArrowUpRight,
  FileText,
  Mail,
  Github,
  Linkedin,
  BrainCircuit,
  CircuitBoard,
  Database,
  ShieldCheck,
} from "lucide-react";
import { profile, stats } from "@/data/portfolio";
import { Reveal } from "@/components/Media";
import { useDashboardPortfolio } from "@/lib/dashboardPortfolio";

const roles = [
  "AI Engineer",
  "LLM & RAG Developer",
  "Machine Learning Engineer",
  "AI Automation Developer",
];

function Typewriter() {
  const [index, setIndex] = useState(0);
  const [letter, setLetter] = useState(0);
  const [deleting, setDeleting] = useState(false);
  useEffect(() => {
    const text = roles[index % roles.length] ?? "AI Engineer";
    const timeout = window.setTimeout(
      () => {
        if (!deleting && letter === text.length) {
          setDeleting(true);
        } else if (deleting && letter === 0) {
          setDeleting(false);
          setIndex((prev) => prev + 1);
        } else {
          setLetter((prev) => prev + (deleting ? -1 : 1));
        }
      },
      !deleting && letter === text.length ? 1800 : deleting ? 45 : 85,
    );
    return () => window.clearTimeout(timeout);
  }, [index, letter, deleting]);
  return (
    <span>
      {(roles[index % roles.length] ?? "AI Engineer").slice(0, letter)}
      <span className="ml-1 animate-pulse text-primary">|</span>
    </span>
  );
}

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(() =>
    typeof window !== "undefined" &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches &&
    "IntersectionObserver" in window
      ? 0
      : value,
  );

  useEffect(() => {
    const element = ref.current;
    if (!element || !("IntersectionObserver" in window)) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    let started = false;
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting) || started) return;
        started = true;
        const start = performance.now();
        const animate = (now: number) => {
          const progress = Math.min(1, (now - start) / 980);
          const eased = 1 - Math.pow(1 - progress, 3);
          setDisplay(Math.round(value * eased));
          if (progress < 1) frame = requestAnimationFrame(animate);
        };
        frame = requestAnimationFrame(animate);
        observer.disconnect();
      },
      { threshold: 0.55 },
    );
    observer.observe(element);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [value]);

  return (
    <span
      ref={ref}
      className="font-display text-3xl font-bold text-foreground sm:text-4xl"
      aria-label={`${value}${suffix}`}
    >
      <span aria-hidden="true">
        {display}
        {suffix}
      </span>
    </span>
  );
}

export function Hero() {
  const synced = useDashboardPortfolio();
  return (
    <section id="home" className="hero-shell relative isolate overflow-hidden pb-14 pt-32 sm:pt-40">
      <div className="hero-ambient pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-5 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20">
        <div>
          <Reveal>
            <div className="flex flex-wrap items-center gap-3">
              <span className="eyebrow-pill">
                <span className="status-dot" /> Available for opportunities
              </span>
              <span className="text-xs font-medium tracking-wide text-muted-foreground">
                Red Fort · University of Haripur · Kaswa
              </span>
            </div>
          </Reveal>

          <Reveal delay={70}>
            <p className="mt-10 font-mono text-[11px] font-medium uppercase tracking-[0.32em] text-primary">
              Artificial intelligence · Software engineering
            </p>
            <h1 className="hero-heading mt-5 font-display font-bold tracking-[-0.055em]">
              Building AI
              <br />
              <span className="hero-heading-accent">that works.</span>
            </h1>
            <h2 className="mt-6 font-display text-xl font-semibold tracking-tight sm:text-2xl">
              {profile.name}
            </h2>
            <div className="mt-2 min-h-7 text-base font-medium text-primary sm:text-lg">
              <Typewriter />
            </div>
          </Reveal>

          <Reveal delay={130}>
            <p className="mt-6 max-w-xl text-base leading-8 text-muted-foreground sm:text-lg">
              {synced.introduction || profile.summary2}
            </p>
          </Reveal>

          <Reveal delay={180}>
            <div className="career-spotlight mt-6 flex flex-col gap-2 rounded-xl border px-4 py-3 sm:flex-row sm:items-center sm:gap-4">
              <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-primary">
                2026 / Recent work
              </span>
              <span className="text-sm font-semibold text-foreground">AI Engineer at Red Fort</span>
              <span className="hidden text-muted-foreground sm:inline">•</span>
              <span className="text-xs text-muted-foreground">
                AI automation · LLMs · Video systems
              </span>
            </div>
          </Reveal>
          <Reveal delay={200}>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <a
                href="#projects"
                className="hero-primary-cta group inline-flex items-center gap-2 rounded-xl px-6 py-3.5 text-sm font-semibold transition-transform hover:-translate-y-0.5"
              >
                View selected work{" "}
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
              <a
                href="#cv"
                className="hero-secondary-cta inline-flex items-center gap-2 rounded-xl px-5 py-3.5 text-sm font-semibold transition-colors hover:bg-surface-2"
              >
                <FileText className="h-4 w-4" /> View my CV
              </a>
              <a
                href={`mailto:${profile.email}`}
                aria-label="Email Muzammil"
                className="hero-icon-link"
              >
                <Mail className="h-4 w-4" />
              </a>
              <a
                href={profile.github}
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub profile"
                className="hero-icon-link"
              >
                <Github className="h-4 w-4" />
              </a>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn profile"
                className="hero-icon-link"
              >
                <Linkedin className="h-4 w-4" />
              </a>
            </div>
          </Reveal>
        </div>

        <Reveal delay={160}>
          <div className="hero-visual relative mx-auto w-full max-w-[480px]">
            <div className="hero-visual-main relative overflow-hidden rounded-[2rem] p-7 sm:p-9">
              <div className="relative z-10 flex items-start justify-between">
                <div className="flex items-center gap-2 font-mono text-[10px] font-semibold uppercase tracking-[0.23em] text-muted-foreground">
                  <span className="status-dot" /> AI / ENGINEERING
                </div>
                <span className="font-mono text-xs text-muted-foreground">ENGINEER / 2026</span>
              </div>
              <div className="relative z-10 flex min-h-64 items-center justify-center py-8">
                <div className="hero-orbit hero-orbit-outer" />
                <div className="hero-orbit hero-orbit-middle" />
                <div className="hero-orbit hero-orbit-inner" />
                <div className="hero-portrait-shell group relative z-10">
                  <span
                    className="hero-portrait-rim pointer-events-none absolute -inset-2 rounded-[2rem]"
                    aria-hidden="true"
                  />
                  <img
                    src={`${import.meta.env.BASE_URL}images/muzammil-profile.jpg`}
                    alt="Portrait of Muzammil Hussain"
                    className="hero-profile-photo relative z-10 h-[240px] w-[240px] rounded-[1.65rem] object-cover sm:h-[258px] sm:w-[258px]"
                    width={258}
                    height={258}
                    loading="eager"
                    decoding="async"
                  />
                  <span className="hero-portrait-tag absolute -bottom-4 left-1/2 z-20 -translate-x-1/2 whitespace-nowrap rounded-full border border-white/20 bg-[#112d50] px-5 py-2 font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-[#e1f1ff] shadow-xl">
                    AI Engineer
                  </span>
                </div>
                <span className="hero-satellite satellite-one">
                  <BrainCircuit className="h-5 w-5" />
                </span>
                <span className="hero-satellite satellite-two">
                  <Database className="h-5 w-5" />
                </span>
                <span className="hero-satellite satellite-three">
                  <CircuitBoard className="h-5 w-5" />
                </span>
              </div>
              <div className="relative z-10 border-t border-border pt-5">
                <p className="font-mono text-[10px] uppercase tracking-[0.23em] text-muted-foreground">
                  Specialising in
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {["LLMs / RAG", "Agentic AI", "Computer Vision", "Automation"].map((item) => (
                    <span key={item} className="hero-tech-pill">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div className="hero-float-card absolute -bottom-5 -left-3 hidden items-center gap-3 rounded-2xl p-3.5 shadow-xl sm:flex">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-primary/10 text-primary">
                <ShieldCheck className="h-5 w-5" />
              </span>
              <span>
                <strong className="block text-sm font-semibold">Production experience</strong>
                <small className="text-xs text-muted-foreground">Build · Deploy · Improve</small>
              </span>
            </div>
          </div>
        </Reveal>
      </div>

      <div className="relative mx-auto mt-24 max-w-7xl px-5">
        <div className="mb-4 flex items-center gap-3 text-xs font-medium text-muted-foreground">
          <ArrowDownRight className="h-4 w-4 text-primary" /> Practical work, measurable impact
        </div>
        <div className="hero-stat-grid grid grid-cols-2 gap-3 md:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="hero-stat-card rounded-2xl p-5">
              <Counter value={stat.value} suffix={stat.suffix} />
              <p className="mt-2 text-xs font-medium tracking-wide text-muted-foreground">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
