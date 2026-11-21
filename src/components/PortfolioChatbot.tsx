import { useCallback, useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  Bot,
  Check,
  ChevronDown,
  MessageCircle,
  Send,
  Sparkles,
  X,
} from "lucide-react";
import { profile } from "@/data/portfolio";
import {
  bundledCvHref,
  getDashboardPortfolio,
  useDashboardPortfolio,
} from "@/lib/dashboardPortfolio";
import {
  askPortfolioAssistant,
  CHAT_EVENT,
  defaultPrompts,
  respondToPortfolioQuestion,
  type AssistantLink,
} from "@/lib/portfolioAssistant";

type Message = {
  id: number;
  role: "assistant" | "visitor";
  text: string;
  links?: AssistantLink[];
  suggestions?: string[];
};

export function PortfolioChatbot() {
  const synced = useDashboardPortfolio();
  const openingPrompts = [
    ...new Set([...synced.faq.map((entry) => entry.question), ...defaultPrompts]),
  ];
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 0,
      role: "assistant",
      text: "Hi there! I'm Muzammil's portfolio assistant. Ask me about AI projects, Red Fort experience, skills, the CV, or ways to get in touch.",
      suggestions: defaultPrompts.slice(0, 4),
    },
  ]);
  const conversationId = useRef(1);
  const lastProject = useRef<string | undefined>(undefined);
  const messageEnd = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const sendQuestion = useCallback((rawQuestion: string) => {
    const question = rawQuestion.trim().slice(0, 450);
    setOpen(true);
    if (!question) return;
    const response = respondToPortfolioQuestion(
      question,
      lastProject.current,
      getDashboardPortfolio().faq,
    );
    if (response.projectId) lastProject.current = response.projectId;
    const userMessage: Message = {
      id: conversationId.current++,
      role: "visitor",
      text: question,
    };
    const replyMessage: Message = {
      id: conversationId.current++,
      role: "assistant",
      text: response.text,
      links: response.links,
      suggestions: response.suggestions,
    };
    setMessages((previous) => [...previous, userMessage, replyMessage].slice(-26));
    setInput("");
  }, []);

  useEffect(() => {
    const onAsk = (event: Event) => {
      const custom = event as CustomEvent<{ question?: string }>;
      sendQuestion(custom.detail?.question ?? "");
    };
    window.addEventListener(CHAT_EVENT, onAsk);
    const url = new URL(window.location.href);
    if (url.searchParams.has("assistant")) {
      sendQuestion(url.searchParams.get("ask") ?? "");
    }
    return () => window.removeEventListener(CHAT_EVENT, onAsk);
  }, [sendQuestion]);

  useEffect(() => {
    if (open) {
      messageEnd.current?.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }, [open, messages]);

  useEffect(() => {
    if (open) inputRef.current?.focus({ preventScroll: true });
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onEscape);
    return () => document.removeEventListener("keydown", onEscape);
  }, [open]);

  return (
    <div className="pointer-events-none fixed inset-x-3 bottom-4 z-[95] flex flex-col items-end sm:inset-x-auto sm:bottom-6 sm:right-6">
      {open && (
        <section
          id="portfolio-chatbot"
          role="dialog"
          aria-modal="false"
          aria-label="Ask about Muzammil's portfolio"
          className="pointer-events-auto mb-3 flex h-[min(610px,calc(100dvh-107px))] w-full max-w-[415px] flex-col overflow-hidden rounded-[26px] border border-[#d7e2f0] bg-white text-[#1a2d47] shadow-[0_30px_90px_-25px_rgba(9,30,60,.42)] animate-rise sm:w-[390px]"
        >
          <header className="relative shrink-0 overflow-hidden bg-[#102b4d] px-5 pb-4 pt-5 text-white">
            <div className="pointer-events-none absolute -right-10 -top-14 h-40 w-40 rounded-full bg-[#456fb5]/30 blur-3xl" />
            <div className="relative flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="relative grid h-11 w-11 shrink-0 place-items-center rounded-2xl border border-white/15 bg-white/10">
                  <Bot className="h-6 w-6 text-[#cfddff]" />
                  <span className="absolute -bottom-1 -right-1 h-3 w-3 rounded-full border-2 border-[#102b4d] bg-[#52d9a5]" />
                </div>
                <div>
                  <h2 className="font-display text-[15px] font-bold tracking-tight text-white">
                    Portfolio Assistant
                  </h2>
                  <p className="mt-0.5 text-[11px] text-[#b6cde6]">
                    Ask about projects, skills & experience
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close portfolio assistant"
                className="grid h-8 w-8 shrink-0 place-items-center rounded-lg border border-white/15 bg-white/5 transition hover:bg-white/15 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="relative mt-4 flex items-center gap-2 border-t border-white/10 pt-3 text-[10px] text-[#c6d9eb]">
              <Check className="h-3.5 w-3.5 text-[#5ee0b2]" />
              Answers grounded in this website's content
            </div>
          </header>

          <div
            className="flex-1 space-y-4 overflow-y-auto bg-gradient-to-b from-[#f5f8fd] to-white px-4 py-5"
            aria-live="polite"
            aria-relevant="additions"
            aria-label="Assistant conversation"
          >
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.role === "visitor" ? "justify-end" : "justify-start"}`}
              >
                <div className={`max-w-[95%] ${message.role === "visitor" ? "max-w-[88%]" : ""}`}>
                  {message.role === "assistant" && (
                    <div className="mb-1.5 flex items-center gap-1.5 px-1 text-[10px] font-semibold uppercase tracking-[.14em] text-[#5a7090]">
                      <Sparkles className="h-3 w-3" /> Portfolio Guide
                    </div>
                  )}
                  <div
                    className={`whitespace-pre-line rounded-2xl px-4 py-3 text-[12px] leading-[1.7] shadow-sm ${message.role === "visitor" ? "rounded-tr-sm bg-[#2059a4] text-white" : "rounded-tl-sm border border-[#e0e8f2] bg-white text-[#263c57]"}`}
                  >
                    {message.text}
                  </div>
                  {message.links && message.links.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-2">
                      {message.links.map((link) => {
                        const isCv = link.href === bundledCvHref;
                        const href = isCv ? synced.cvHref : link.href;
                        const external = /^(https?:|mailto:)/.test(href);
                        return (
                          <a
                            key={link.href + link.label}
                            data-dashboard-cv={isCv ? true : undefined}
                            href={href}
                            target={href.startsWith("http") ? "_blank" : undefined}
                            rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                            download={isCv ? synced.cvDownload : undefined}
                            onClick={() => {
                              if (!external) setOpen(false);
                            }}
                            className="inline-flex items-center gap-1.5 rounded-lg border border-[#c9d9ee] bg-[#eaf1fb] px-2.5 py-1.5 text-[11px] font-semibold text-[#194e90] transition hover:bg-[#dce9fc]"
                          >
                            {isCv ? synced.cvLabel : link.label} <ArrowRight className="h-3 w-3" />
                          </a>
                        );
                      })}
                    </div>
                  )}
                  {message.suggestions && message.id === messages[messages.length - 1]?.id && (
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {(message.id === 0 ? openingPrompts : message.suggestions)
                        .slice(0, 4)
                        .map((prompt) => (
                          <button
                            key={prompt}
                            type="button"
                            onClick={() => sendQuestion(prompt)}
                            className="rounded-full border border-[#d3dff0] bg-white px-3 py-2 text-left text-[11px] font-medium leading-tight text-[#285286] transition hover:border-[#8aaedb] hover:bg-[#edf4ff]"
                          >
                            {prompt}
                          </button>
                        ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
            <div ref={messageEnd} />
          </div>

          <form
            className="shrink-0 border-t border-[#e2e9f4] bg-white px-3 py-3"
            onSubmit={(event) => {
              event.preventDefault();
              sendQuestion(input);
            }}
          >
            <div className="flex items-center gap-2 rounded-2xl border border-[#cddbec] bg-[#f7f9fd] p-1.5 focus-within:border-[#6b97d2] focus-within:ring-2 focus-within:ring-[#d8e9ff]">
              <input
                ref={inputRef}
                type="text"
                maxLength={450}
                value={input}
                onChange={(event) => setInput(event.target.value)}
                aria-label="Ask about projects or this website"
                placeholder="Ask anything about the portfolio..."
                className="min-w-0 flex-1 bg-transparent px-2 py-2 text-[12px] text-[#1c304e] outline-none placeholder:text-[#8393a7]"
              />
              <button
                type="submit"
                disabled={!input.trim()}
                aria-label="Send question"
                className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-[#2059a4] text-white transition hover:bg-[#15417e] disabled:cursor-not-allowed disabled:opacity-40"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
            <p className="mt-2 text-center text-[10px] leading-snug text-[#8290a3]">
              Based on portfolio data · No AI API or account required
            </p>
          </form>
        </section>
      )}
      <button
        type="button"
        onClick={() => setOpen((wasOpen) => !wasOpen)}
        aria-label={open ? "Minimize portfolio assistant" : "Open portfolio assistant"}
        aria-expanded={open}
        aria-controls="portfolio-chatbot"
        className="pointer-events-auto group flex items-center gap-3 rounded-full border border-[#a1bce0]/30 bg-[#113156] py-2.5 pl-4 pr-3 text-white shadow-[0_13px_40px_-9px_rgba(8,29,54,.5)] transition duration-200 hover:-translate-y-1 hover:bg-[#1d4d81] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#5098e7]"
      >
        <span className="flex items-center gap-2 text-[12px] font-semibold tracking-wide">
          {open ? "Minimize" : "Ask about my work"}
          {!open && <span className="h-1.5 w-1.5 rounded-full bg-[#4ce0a4]" />}
        </span>
        <span className="grid h-9 w-9 place-items-center rounded-full bg-white/15">
          {open ? <ChevronDown className="h-5 w-5" /> : <MessageCircle className="h-5 w-5" />}
        </span>
      </button>
      {!open && (
        <button
          type="button"
          onClick={() => askPortfolioAssistant("Tell me about your best AI projects")}
          className="pointer-events-auto mr-1 mt-1 hidden text-[10px] text-[#697b91] underline-offset-2 hover:underline sm:block"
        >
          Quick project overview
        </button>
      )}
    </div>
  );
}
