import { useMemo, useState } from "react";
import { Search, X, BadgeCheck, Calendar, Building2, Maximize2 } from "lucide-react";
import { certificates, type Certificate } from "@/data/portfolio";
import { Reveal, SmartImage, Lightbox } from "@/components/Media";
import { SectionHeader } from "@/components/SectionHeader";

const categories = ["All", ...Array.from(new Set(certificates.map((c) => c.category)))];

export function Certificates() {
  const [cat, setCat] = useState("All");
  const [q, setQ] = useState("");
  const [open, setOpen] = useState<Certificate | null>(null);
  const [zoom, setZoom] = useState<string | null>(null);

  const list = useMemo(
    () =>
      certificates.filter(
        (c) =>
          (cat === "All" || c.category === cat) &&
          (q.trim() === "" ||
            `${c.title} ${c.issuer} ${c.skills.join(" ")}`.toLowerCase().includes(q.toLowerCase())),
      ),
    [cat, q],
  );

  return (
    <section id="certificates" className="relative py-24">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_50%_at_80%_20%,color-mix(in_oklab,var(--violet)_16%,transparent),transparent)]" />
      <div className="relative mx-auto max-w-7xl px-5">
        <SectionHeader
          index="05"
          kicker="Credential Vault"
          title="CERTIFICATION VAULT"
          subtitle="Privacy-safe credential previews, professional recognitions and CV-documented training. No credential IDs are shown or linked."
        />

        <Reveal delay={80}>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap gap-2">
              {categories.map((c) => (
                <button
                  key={c}
                  onClick={() => setCat(c)}
                  className={`rounded-full border px-4 py-1.5 text-xs font-medium transition-all ${
                    cat === c
                      ? "border-transparent bg-[image:var(--gradient-line)] text-background"
                      : "border-border bg-surface text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
            <div className="relative sm:w-64">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search certificates"
                className="w-full rounded-full border border-border bg-surface py-2 pl-9 pr-3 text-sm outline-none transition-shadow placeholder:text-muted-foreground focus:glow-ring"
              />
            </div>
          </div>
        </Reveal>

        <p className="mt-5 text-xs font-medium text-muted-foreground">
          Showing {list.length} of {certificates.length} credential records ·{" "}
          {certificates.filter((c) => Boolean(c.image)).length} privacy-safe credential previews
          available
        </p>
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((c, i) => (
            <Reveal key={c.id} delay={i * 50}>
              <button
                onClick={() => setOpen(c)}
                className="group panel h-full w-full overflow-hidden p-0 text-left transition-all duration-300 hover:-translate-y-2 hover:glow-ring"
              >
                <div className="relative aspect-[4/3] overflow-hidden border-b border-border">
                  {c.image ? (
                    <SmartImage
                      src={c.image}
                      alt={c.title}
                      className="h-full w-full"
                      imgClassName="h-full w-full object-contain bg-[#ecf2fb] transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <div
                      className="certificate-no-scan flex h-full w-full flex-col items-center justify-center gap-2 px-6 text-center"
                      role="img"
                      aria-label="CV-documented credential; original scan unavailable"
                    >
                      <BadgeCheck className="h-11 w-11 text-[#afcfff]" />
                      <span className="text-xs font-semibold uppercase tracking-wider text-[#d8eaff]">
                        CV-documented recognition
                      </span>
                      <span className="text-[11px] text-[#a9c0dc]">
                        Original certificate preview unavailable
                      </span>
                    </div>
                  )}
                  <span className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent" />
                  <span className="absolute left-3 top-3 rounded-full border border-border bg-background/70 px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest text-primary backdrop-blur">
                    {c.category}
                  </span>
                  <span className="absolute bottom-3 right-3 flex items-center gap-1 rounded-full border border-border bg-background/70 px-2 py-1 font-mono text-[10px] text-foreground opacity-0 backdrop-blur transition-opacity group-hover:opacity-100">
                    <Maximize2 className="h-3 w-3" /> Open
                  </span>
                </div>
                <div className="p-5">
                  <h3 className="font-display text-base font-semibold leading-snug">{c.title}</h3>
                  <p className="mt-1 flex items-center gap-1.5 text-xs text-primary">
                    <BadgeCheck className="h-3.5 w-3.5" /> {c.issuer}
                  </p>
                  <p className="mt-2 line-clamp-2 text-xs text-muted-foreground">{c.description}</p>
                </div>
              </button>
            </Reveal>
          ))}
        </div>
        {list.length === 0 && (
          <p className="mt-10 text-center font-mono text-xs uppercase tracking-widest text-muted-foreground">
            No certificates match
          </p>
        )}
      </div>

      {open && (
        <div
          className="fixed inset-0 z-[75] flex items-start justify-center overflow-y-auto bg-background/90 p-4 py-10 backdrop-blur-xl"
          onClick={() => setOpen(null)}
        >
          <div
            className="panel relative w-full max-w-2xl animate-rise p-0"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setOpen(null)}
              className="absolute right-4 top-4 z-10 grid h-10 w-10 place-items-center rounded-full border border-border bg-background/80 backdrop-blur transition-colors hover:bg-surface-2"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>

            {open.image ? (
              <button
                type="button"
                onClick={() => setZoom(open.image)}
                className="group relative block w-full overflow-hidden rounded-t-2xl border-b border-border"
                aria-label="Enlarge privacy-safe certificate preview"
              >
                <SmartImage
                  src={open.image}
                  alt={open.title}
                  className="aspect-[4/3] w-full bg-[#edf3fb]"
                  imgClassName="aspect-[4/3] w-full bg-[#edf3fb] object-contain"
                />
                <span className="absolute bottom-3 right-3 flex items-center gap-1 rounded-full border border-border bg-background/75 px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest text-primary backdrop-blur">
                  <Maximize2 className="h-3 w-3" /> Enlarge scan
                </span>
              </button>
            ) : (
              <div className="certificate-no-scan flex aspect-[4/2] w-full flex-col items-center justify-center gap-3 rounded-t-2xl border-b border-border px-6 text-center">
                <BadgeCheck className="h-12 w-12 text-[#accfff]" />
                <p className="max-w-sm text-sm font-semibold">
                  This credential is listed in the CV, but the original scan was not found in the
                  available backup.
                </p>
              </div>
            )}

            <div className="p-6">
              <span className="rounded-full border border-border bg-surface px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest text-primary">
                {open.category}
              </span>
              <h3 className="mt-3 font-display text-2xl font-bold">{open.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{open.description}</p>

              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                <Meta
                  icon={<Building2 className="h-3.5 w-3.5" />}
                  label="Issuer"
                  value={open.issuer}
                />
                <Meta
                  icon={<Calendar className="h-3.5 w-3.5" />}
                  label="Issued"
                  value={open.date}
                />
              </div>

              {open.image && (
                <a
                  href={`${import.meta.env.BASE_URL}${open.image.slice(1)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex items-center gap-2 rounded-xl border border-primary/20 bg-primary/10 px-4 py-2.5 text-xs font-semibold text-primary transition hover:bg-primary/15"
                >
                  <Maximize2 className="h-4 w-4" /> Open privacy-safe certificate preview
                </a>
              )}
              <div className="mt-5">
                <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.24em] text-muted-foreground">
                  Skills covered
                </p>
                <div className="flex flex-wrap gap-2">
                  {open.skills.map((s) => (
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

      {zoom && (
        <Lightbox
          images={[zoom]}
          index={0}
          caption={open?.title ?? ""}
          onClose={() => setZoom(null)}
          onIndex={() => {}}
        />
      )}
    </section>
  );
}

function Meta({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="rounded-xl border border-border bg-surface/60 p-3">
      <p className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
        {icon} {label}
      </p>
      <p className="mt-1 text-sm">{value}</p>
    </div>
  );
}
