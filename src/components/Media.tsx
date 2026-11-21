import { useCallback, useEffect, useRef, useState } from "react";
import {
  X,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  BrainCircuit,
  Clapperboard,
  ScanEye,
  BookOpenText,
  Bot,
  ChartNoAxesCombined,
  Microscope,
  Code2,
} from "lucide-react";

/** Reveals children on scroll. */
export function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  // Keep core content visible even when scroll observers are delayed or unavailable.
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setVisible(true);
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal ${visible ? "is-visible" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

/** Image that degrades to a branded placeholder when the file has not been uploaded yet. */
export function SmartImage({
  src,
  alt,
  className = "",
  imgClassName = "",
}: {
  src: string;
  alt: string;
  label?: string;
  className?: string;
  imgClassName?: string;
}) {
  const resolvedSrc = src.startsWith("/") ? import.meta.env.BASE_URL + src.slice(1) : src;
  const [status, setStatus] = useState<"loading" | "ok" | "failed">("loading");
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    let alive = true;
    if (!src) {
      setStatus("failed");
      return;
    }
    setStatus("loading");
    const probe = new Image();
    probe.onload = () => alive && setStatus("ok");
    probe.onerror = () => alive && setStatus("failed");
    probe.src = resolvedSrc;
    return () => {
      alive = false;
    };
  }, [resolvedSrc, src]);

  const Icon = /video|studio/i.test(alt)
    ? Clapperboard
    : /university|uoh|assistant/i.test(alt)
      ? BookOpenText
      : /detect|vision|traffic|motion|pothole|helmet/i.test(alt)
        ? ScanEye
        : /sentiment|analytics|data|news/i.test(alt)
          ? ChartNoAxesCombined
          : /medical|fracture|insect/i.test(alt)
            ? Microscope
            : /agent|interview|robot/i.test(alt)
              ? Bot
              : /software|pipeline|classification/i.test(alt)
                ? Code2
                : BrainCircuit;

  if (status !== "ok") {
    return (
      <div
        className={`project-artwork flex flex-col items-center justify-center gap-4 px-6 py-8 ${className}`}
        role="img"
        aria-label={alt}
      >
        <span className="project-artwork-symbol">
          <Icon className="h-8 w-8" />
        </span>
        <span className="project-artwork-label">{alt}</span>
      </div>
    );
  }

  return (
    <img
      ref={imgRef}
      src={resolvedSrc}
      alt={alt}
      loading="lazy"
      onError={() => setStatus("failed")}
      className={`${className} ${imgClassName}`}
    />
  );
}

/** Small clickable thumbnail that opens the lightbox. */
export function Thumb({
  src,
  alt,
  onOpen,
  className = "",
}: {
  src: string;
  alt: string;
  onOpen: () => void;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className={`group relative aspect-video w-full overflow-hidden rounded-xl border border-border bg-surface transition-transform duration-300 hover:-translate-y-1 hover:glow-ring ${className}`}
      aria-label={`Open ${alt}`}
    >
      <SmartImage
        src={src}
        alt={alt}
        label="Click to view"
        className="h-full w-full"
        imgClassName="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/85 via-transparent to-transparent opacity-70" />
      <span className="pointer-events-none absolute bottom-2 left-2 flex items-center gap-1 rounded-full border border-border bg-background/70 px-2 py-1 font-mono text-[10px] uppercase tracking-widest text-primary backdrop-blur">
        <Maximize2 className="h-3 w-3" /> View
      </span>
    </button>
  );
}

export function Lightbox({
  images,
  index,
  onClose,
  onIndex,
  caption,
}: {
  images: string[];
  index: number;
  onClose: () => void;
  onIndex: (i: number) => void;
  caption?: string;
}) {
  const next = useCallback(
    () => onIndex((index + 1) % images.length),
    [index, images.length, onIndex],
  );
  const prev = useCallback(
    () => onIndex((index - 1 + images.length) % images.length),
    [index, images.length, onIndex],
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [next, prev, onClose]);

  return (
    <div
      className="fixed inset-0 z-[80] flex items-center justify-center bg-background/92 p-4 backdrop-blur-xl animate-in fade-in duration-200"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute right-5 top-5 grid h-10 w-10 place-items-center rounded-full border border-border bg-surface text-foreground transition-colors hover:bg-surface-2"
        aria-label="Close"
      >
        <X className="h-5 w-5" />
      </button>

      {images.length > 1 && (
        <>
          <button
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
            className="absolute left-4 grid h-11 w-11 place-items-center rounded-full border border-border bg-surface/80 transition-colors hover:bg-surface-2"
            aria-label="Previous image"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
            className="absolute right-4 grid h-11 w-11 place-items-center rounded-full border border-border bg-surface/80 transition-colors hover:bg-surface-2"
            aria-label="Next image"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </>
      )}

      <figure className="max-h-[86vh] w-full max-w-5xl" onClick={(e) => e.stopPropagation()}>
        <SmartImage
          src={images[index] ?? ""}
          alt={caption ?? "Preview"}
          label="Upload this image"
          className="max-h-[76vh] w-full rounded-2xl border border-border object-contain"
          imgClassName="max-h-[76vh] w-full rounded-2xl border border-border object-contain"
        />
        <figcaption className="mt-3 text-center font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
          {caption} {images.length > 1 && `· ${index + 1}/${images.length}`}
        </figcaption>
      </figure>
    </div>
  );
}
