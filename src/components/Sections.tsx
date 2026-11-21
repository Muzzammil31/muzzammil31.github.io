import { useState } from "react";
import {
  Mail,
  MapPin,
  Github,
  Linkedin,
  Briefcase,
  GraduationCap,
  Trophy,
  FlaskConical,
  Send,
  ExternalLink,
  Sparkles,
  CheckCircle2,
} from "lucide-react";
import { toast } from "sonner";
import {
  profile,
  openRoles,
  skillDomains,
  experience,
  internships,
  education,
  achievements,
} from "@/data/portfolio";
import { Reveal } from "@/components/Media";
import { SectionHeader } from "@/components/SectionHeader";

export function About() {
  return (
    <section id="about" className="relative py-24">
      <div className="mx-auto max-w-7xl px-5">
        <SectionHeader
          index="01"
          kicker="Engineer Profile"
          title="ABOUT ME"
          subtitle="Who I am, what I build, and how I turn AI ideas into working systems."
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
          <Reveal>
            <div className="panel h-full p-6 sm:p-8">
              <div className="flex items-center gap-2 text-primary">
                <CheckCircle2 className="h-4 w-4" />
                <span className="font-mono text-[10px] uppercase tracking-[0.24em]">
                  Professional summary
                </span>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
                {profile.summary}
              </p>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
                {profile.summary2}
              </p>

              <div className="mt-6 rounded-xl border border-border bg-surface/60 p-4">
                <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-muted-foreground">
                  Current focus
                </p>
                <p className="mt-1.5 text-sm">{profile.focus}</p>
              </div>

              <div className="mt-6">
                <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.24em] text-muted-foreground">
                  Open to roles
                </p>
                <div className="flex flex-wrap gap-2">
                  {openRoles.map((r) => (
                    <span
                      key={r}
                      className="rounded-full border border-border bg-surface px-3 py-1 text-xs text-muted-foreground transition-colors hover:border-primary hover:text-primary"
                    >
                      {r}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div className="panel h-full space-y-3 p-6">
              <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-muted-foreground">
                Identity
              </p>
              {[
                ["Name", profile.name],
                ["Role", "AI Engineer"],
                ["Degree", profile.degree],
                ["University", profile.university],
                ["Location", profile.location],
              ].map(([k, v]) => (
                <div
                  key={k}
                  className="flex items-start justify-between gap-4 border-b border-border pb-2 last:border-0"
                >
                  <span className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
                    {k}
                  </span>
                  <span className="text-right text-sm">{v}</span>
                </div>
              ))}
              <a
                href={profile.assistant}
                target="_blank"
                rel="noreferrer"
                className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-border bg-[image:var(--gradient-card)] px-4 py-3 text-sm font-semibold transition-transform hover:-translate-y-0.5"
              >
                <Sparkles className="h-4 w-4 text-primary" /> Try my AI assistant{" "}
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
              <a
                href={profile.universityAssistant}
                target="_blank"
                rel="noreferrer"
                className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-border bg-surface px-4 py-3 text-sm font-semibold text-muted-foreground transition-colors hover:border-primary hover:text-foreground"
              >
                <ExternalLink className="h-4 w-4 text-primary" /> UOH AI Assistant — deployed demo
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export function Experience() {
  return (
    <section id="experience" className="relative py-24">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(50%_40%_at_10%_30%,color-mix(in_oklab,var(--cyan)_14%,transparent),transparent)]" />
      <div className="relative mx-auto max-w-7xl px-5">
        <SectionHeader
          index="02"
          kicker="Timeline"
          title="PROFESSIONAL EXPERIENCE"
          subtitle="Professional AI/software work and internship experience."
        />

        <div className="mt-12 space-y-6">
          {experience.map((e, i) => (
            <Reveal key={e.role} delay={i * 80}>
              <div
                className={[
                  "panel relative overflow-hidden p-6 transition-transform hover:-translate-y-1",
                  i === 0 ? "experience-featured" : "",
                ].join(" ")}
              >
                <span className="absolute inset-y-0 left-0 w-1 bg-[image:var(--gradient-line)]" />
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <h3 className="font-display text-xl font-semibold">{e.role}</h3>
                    <p className="flex items-center gap-1.5 text-sm text-primary">
                      <Briefcase className="h-3.5 w-3.5" /> {e.org}
                    </p>
                  </div>
                  <span className="rounded-full border border-border bg-surface px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                    {e.period}
                  </span>
                </div>
                <p className="mt-2 text-xs text-muted-foreground">{e.note}</p>
                <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                  {e.points.map((p) => (
                    <li key={p} className="flex gap-2 text-sm text-muted-foreground">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                      {p}
                    </li>
                  ))}
                </ul>
                <div className="mt-4 flex flex-wrap gap-2">
                  {e.stack.map((s) => (
                    <span
                      key={s}
                      className="rounded-full border border-border bg-surface px-2.5 py-1 font-mono text-[10px] text-muted-foreground"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <h3 className="mt-14 font-display text-lg font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            Internship experience
          </h3>
        </Reveal>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {internships.map((it, i) => (
            <Reveal key={it.org} delay={i * 50}>
              <div className="panel h-full p-5 transition-all hover:-translate-y-1 hover:glow-ring">
                <div className="flex items-center justify-between gap-2">
                  <h4 className="font-display text-sm font-semibold">{it.org}</h4>
                  <span className="font-mono text-[10px] text-primary">{it.year}</span>
                </div>
                <p className="mt-1 text-xs text-accent">{it.role}</p>
                <p className="mt-2 text-xs text-muted-foreground">{it.detail}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Skills() {
  const [active, setActive] = useState(0);
  const domain = skillDomains[active]!;
  return (
    <section id="skills" className="relative py-24">
      <div className="mx-auto max-w-7xl px-5">
        <SectionHeader
          index="04"
          kicker="Technology Ecosystem"
          title="SKILLS & EXPERTISE"
          subtitle="Select a domain to inspect the technologies I actually build with."
        />

        <div className="mt-10 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal>
            <div className="flex flex-wrap gap-2">
              {skillDomains.map((d, i) => (
                <button
                  key={d.name}
                  onClick={() => setActive(i)}
                  className={`rounded-full border px-4 py-2 text-xs font-medium transition-all ${
                    active === i
                      ? "border-transparent bg-[image:var(--gradient-line)] text-background"
                      : "border-border bg-surface text-muted-foreground hover:-translate-y-0.5 hover:text-foreground"
                  }`}
                >
                  {d.name}
                </button>
              ))}
            </div>
          </Reveal>

          <Reveal delay={80}>
            <div className="panel p-6">
              <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-primary">
                {domain.name}
              </p>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {domain.items.map((s, i) => (
                  <div
                    key={s}
                    className="group flex items-center gap-3 rounded-xl border border-border bg-surface/60 px-3 py-2.5 transition-all hover:-translate-y-0.5 hover:glow-ring"
                    style={{ animation: `rise 0.5s ${i * 45}ms cubic-bezier(0.22,1,0.36,1) both` }}
                  >
                    <span className="font-mono text-[10px] text-muted-foreground">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-sm">{s}</span>
                    <span className="ml-auto h-1.5 w-1.5 rounded-full bg-primary opacity-0 transition-opacity group-hover:opacity-100" />
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export function Education() {
  return (
    <section id="education" className="relative py-24">
      <div className="mx-auto max-w-7xl px-5">
        <SectionHeader index="06" kicker="Academic Track" title="EDUCATION" />
        <div className="relative mt-12 space-y-6 border-l border-border pl-6">
          {education.map((e, i) => (
            <Reveal key={e.degree} delay={i * 70}>
              <div className="panel relative p-5 transition-transform hover:-translate-y-1">
                <span className="absolute -left-[31px] top-6 grid h-4 w-4 place-items-center rounded-full bg-[image:var(--gradient-line)]">
                  <span className="h-1.5 w-1.5 rounded-full bg-background" />
                </span>
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="flex items-center gap-2 font-display text-lg font-semibold">
                    <GraduationCap className="h-4 w-4 text-primary" /> {e.degree}
                  </h3>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                    {e.period}
                  </span>
                </div>
                <p className="mt-1 text-sm text-accent">{e.org}</p>
                <p className="mt-2 text-sm text-muted-foreground">{e.detail}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Achievements() {
  return (
    <section id="achievements" className="relative py-24">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(50%_40%_at_85%_40%,color-mix(in_oklab,var(--amber)_14%,transparent),transparent)]" />
      <div className="relative mx-auto max-w-7xl px-5">
        <SectionHeader index="07" kicker="Recognition & Research" title="ACHIEVEMENTS & RESEARCH" />

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          <Reveal>
            <div className="panel h-full p-6">
              <h3 className="flex items-center gap-2 font-display text-sm font-semibold uppercase tracking-[0.18em] text-amber">
                <Trophy className="h-4 w-4" /> Awards
              </h3>
              <div className="mt-4 space-y-3">
                {achievements.awards.map((a) => (
                  <div
                    key={a.title}
                    className="rounded-xl border border-border bg-surface/60 p-4 transition-transform hover:translate-x-1"
                  >
                    <p className="text-sm font-semibold">{a.title}</p>
                    <p className="mt-1 text-xs text-muted-foreground">{a.detail}</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={90}>
            <div className="panel h-full p-6">
              <h3 className="flex items-center gap-2 font-display text-sm font-semibold uppercase tracking-[0.18em] text-primary">
                <FlaskConical className="h-4 w-4" /> Research
              </h3>
              <div className="mt-4 space-y-3">
                {achievements.research.map((r) => (
                  <div key={r.title} className="rounded-xl border border-border bg-surface/60 p-4">
                    <p className="text-sm font-semibold leading-snug">{r.title}</p>
                    <p className="mt-1.5 text-xs text-muted-foreground">{r.detail}</p>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {r.tags.map((t) => (
                        <span
                          key={t}
                          className="rounded-full border border-border bg-surface px-2.5 py-0.5 font-mono text-[10px] text-muted-foreground"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
        <Reveal delay={140}>
          <div id="participation" className="panel mt-6 p-6">
            <h3 className="font-display text-sm font-semibold uppercase tracking-[0.17em] text-primary">
              Project Exhibitions & Participation
            </h3>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              {achievements.participation.map((item) => (
                <article
                  key={item.title}
                  className="rounded-xl border border-border bg-surface/60 p-5"
                >
                  <h4 className="text-sm font-semibold">{item.title}</h4>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {item.detail}
                  </p>
                  <a
                    href={import.meta.env.BASE_URL + item.evidence}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center gap-2 text-xs font-semibold text-primary underline-offset-4 hover:underline"
                  >
                    View exhibition poster <ExternalLink className="h-4 w-4" />
                  </a>
                </article>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function Contact() {
  const channels = [
    {
      icon: <Mail className="h-4 w-4" />,
      label: "Email",
      value: profile.email,
      href: `mailto:${profile.email}`,
    },
    {
      icon: <Linkedin className="h-4 w-4" />,
      label: "LinkedIn",
      value: "muzzammil-hussain",
      href: profile.linkedin,
    },
    {
      icon: <Github className="h-4 w-4" />,
      label: "GitHub",
      value: "Muzzammil31",
      href: profile.github,
    },
    {
      icon: <Sparkles className="h-4 w-4" />,
      label: "Fiverr",
      value: "muzamil_47",
      href: profile.fiverr,
    },
    { icon: <MapPin className="h-4 w-4" />, label: "Location", value: profile.location, href: "" },
    {
      icon: <Mail className="h-4 w-4" />,
      label: "Phone / WhatsApp",
      value: profile.phone,
      href: `https://wa.me/${profile.phone.replace(/\D/g, "")}`,
    },
  ];

  return (
    <section id="contact" className="relative py-24">
      <div className="pointer-events-none absolute inset-0 bg-[image:var(--gradient-hero)] opacity-60" />
      <div className="relative mx-auto max-w-7xl px-5">
        <SectionHeader
          index="09"
          kicker="Contact Console"
          title="LET'S WORK TOGETHER"
          subtitle="Open to AI Engineer / ML Engineer roles and freelance AI projects."
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
          <Reveal>
            <div className="panel h-full space-y-3 p-6">
              <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-lime">
                ● Channels open
              </p>
              {channels.map((c) => (
                <a
                  key={c.label}
                  href={c.href || undefined}
                  target={c.href.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer"
                  className="flex items-center gap-3 rounded-xl border border-border bg-surface/60 p-3 transition-all hover:-translate-y-0.5 hover:glow-ring"
                >
                  <span className="grid h-9 w-9 place-items-center rounded-lg bg-[image:var(--gradient-card)] text-primary">
                    {c.icon}
                  </span>
                  <span>
                    <span className="block font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                      {c.label}
                    </span>
                    <span className="block text-sm">{c.value}</span>
                  </span>
                </a>
              ))}
            </div>
          </Reveal>

          <Reveal delay={90}>
            <form
              className="panel h-full space-y-4 p-6"
              onSubmit={(e) => {
                e.preventDefault();
                const form = new FormData(e.currentTarget);
                const name = String(form.get("name") ?? "").trim();
                const email = String(form.get("email") ?? "").trim();
                const subject = String(form.get("subject") ?? "").trim();
                const message = String(form.get("message") ?? "").trim();
                const body = `From: ${name} (${email})\n\n${message}`;
                window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
                toast.info("Email draft opened", {
                  description: "Complete sending in your email application.",
                });
              }}
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Name" name="name" />
                <Field label="Email" name="email" type="email" />
              </div>
              <Field label="Subject" name="subject" />
              <div>
                <label className="mb-1.5 block font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                  Message
                </label>
                <textarea
                  required
                  name="message"
                  rows={5}
                  className="w-full rounded-xl border border-border bg-surface px-3 py-2.5 text-sm outline-none transition-shadow focus:glow-ring"
                />
              </div>
              <button
                type="submit"
                className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[image:var(--gradient-line)] px-6 py-3 text-sm font-semibold text-background transition-transform hover:scale-[1.02]"
              >
                Open email draft
                <Send className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Field({ label, name, type = "text" }: { label: string; name: string; type?: string }) {
  return (
    <div>
      <label className="mb-1.5 block font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
        {label}
      </label>
      <input
        required
        name={name}
        type={type}
        className="w-full rounded-xl border border-border bg-surface px-3 py-2.5 text-sm outline-none transition-shadow focus:glow-ring"
      />
    </div>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-border py-8">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-5 text-center sm:flex-row sm:text-left">
        <div>
          <p className="font-display text-sm font-semibold">{profile.name}</p>
          <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-muted-foreground">
            AI Engineer · LLMs · Machine Learning · Computer Vision
          </p>
        </div>
        <p className="font-mono text-[10px] text-muted-foreground">
          © {new Date().getFullYear()} · Built with care and curiosity
        </p>
      </div>
    </footer>
  );
}
