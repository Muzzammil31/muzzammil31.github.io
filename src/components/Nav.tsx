import { useEffect, useState } from "react";
import { Menu, X, Sparkles } from "lucide-react";
import { useDashboardPortfolio } from "@/lib/dashboardPortfolio";

const links = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "certificates", label: "Certificates" },
  { id: "cv", label: "View CV" },
  { id: "education", label: "Education" },
  { id: "achievements", label: "Research" },
  { id: "participation", label: "Participation" },
  { id: "contact", label: "Contact" },
];

export function Nav() {
  const synced = useDashboardPortfolio();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("home");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(h > 0 ? (window.scrollY / h) * 100 : 0);
      let current = "home";
      for (const l of links) {
        const el = document.getElementById(l.id);
        if (el && el.getBoundingClientRect().top <= 140) current = l.id;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <div className="fixed left-0 top-0 z-[70] h-0.5 w-full bg-transparent">
        <div
          className="h-full bg-[image:var(--gradient-line)] transition-[width] duration-150"
          style={{ width: `${progress}%` }}
        />
      </div>

      <header
        className={`fixed inset-x-0 top-0 z-[60] transition-all duration-300 ${
          scrolled
            ? "border-b border-border bg-background/95 shadow-lg backdrop-blur-xl"
            : "border-b border-border bg-background/95 backdrop-blur-xl"
        }`}
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3.5">
          <a href="#home" className="group flex items-center gap-3">
            <span className="profile-avatar-nav relative grid h-10 w-10 shrink-0 overflow-hidden rounded-xl border border-primary/20 bg-primary/10 shadow-sm">
              <img
                src={`${import.meta.env.BASE_URL}images/muzammil-profile.jpg`}
                alt="Muzammil Hussain"
                className="h-full w-full object-cover"
                width={40}
                height={40}
                loading="eager"
              />
            </span>
            <span className="hidden sm:block">
              <span className="block font-display text-sm font-semibold tracking-tight">
                MUZAMMIL.AI
              </span>
              <span className="block font-mono text-[10px] uppercase tracking-[0.28em] text-muted-foreground">
                AI Engineer · Portfolio
              </span>
            </span>
          </a>

          <div className="hidden items-center gap-0.5 xl:flex">
            {links
              .filter((l) =>
                [
                  "home",
                  "about",
                  "experience",
                  "projects",
                  "skills",
                  "certificates",
                  "education",
                  "achievements",
                ].includes(l.id),
              )
              .map((l) => (
                <a
                  key={l.id}
                  href={`#${l.id}`}
                  className={`relative whitespace-nowrap rounded-full px-2 py-1.5 text-xs font-semibold transition-colors ${
                    active === l.id
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {active === l.id && (
                    <span className="absolute inset-0 -z-10 rounded-full border border-border bg-[image:var(--gradient-card)]" />
                  )}
                  {l.label}
                </a>
              ))}
          </div>

          <div className="flex items-center gap-2">
            <a
              href="#cv"
              className="hidden items-center gap-2 rounded-xl border border-border bg-surface px-3 py-2 text-xs font-semibold text-foreground whitespace-nowrap transition-colors hover:bg-surface-2 sm:inline-flex"
            >
              View CV
            </a>
            <a
              href="#contact"
              className="hidden items-center gap-2 rounded-full bg-[image:var(--gradient-line)] px-3 py-2 text-xs font-semibold text-background whitespace-nowrap transition-transform hover:scale-[1.04] sm:inline-flex"
            >
              <Sparkles className="h-4 w-4" /> Contact me
            </a>
            <button
              onClick={() => setOpen((v) => !v)}
              className="grid h-10 w-10 place-items-center rounded-xl border border-border bg-surface xl:hidden"
              aria-label="Toggle menu"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </nav>

        {open && (
          <div className="border-t border-border bg-background/95 px-5 py-4 backdrop-blur-xl xl:hidden">
            <div className="grid grid-cols-2 gap-2">
              {links.map((l) => (
                <a
                  key={l.id}
                  href={`#${l.id}`}
                  onClick={() => setOpen(false)}
                  className="rounded-xl border border-border bg-surface px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {l.label}
                </a>
              ))}
              <a
                data-dashboard-cv
                href={synced.cvHref}
                download={synced.cvDownload}
                onClick={() => setOpen(false)}
                className="col-span-2 rounded-xl border border-primary/20 bg-primary/10 px-3 py-2.5 text-center text-sm font-semibold text-primary"
              >
                {synced.cvLabel}
              </a>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
