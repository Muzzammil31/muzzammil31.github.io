import {
  achievements,
  certificates,
  education,
  experience,
  internships,
  openRoles,
  profile,
  projects,
  skillDomains,
  type Project,
} from "@/data/portfolio";
import type { PublicAnswer } from "@/lib/dashboardPortfolio";

export type AssistantLink = { label: string; href: string };
export type AssistantAnswer = {
  text: string;
  links: AssistantLink[];
  suggestions: string[];
  projectId?: string;
};

export const CHAT_EVENT = "portfolio:ask-assistant";

export function askPortfolioAssistant(question = "") {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(CHAT_EVENT, { detail: { question } }));
}

const prompts = {
  projects: "Tell me about your best AI projects",
  redfort: "What did you build at Red Fort?",
  uoh: "Tell me about the UOH AI Assistant",
  skills: "What AI skills and technologies do you use?",
  contact: "How can I contact you?",
};

export const defaultPrompts = Object.values(prompts);

function normalize(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9+.#]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}
const ignored = new Set([
  "a",
  "an",
  "and",
  "are",
  "about",
  "can",
  "could",
  "did",
  "do",
  "does",
  "for",
  "from",
  "have",
  "how",
  "i",
  "in",
  "is",
  "it",
  "me",
  "my",
  "of",
  "on",
  "or",
  "please",
  "show",
  "tell",
  "that",
  "the",
  "there",
  "this",
  "to",
  "use",
  "used",
  "uses",
  "was",
  "what",
  "which",
  "who",
  "with",
  "work",
  "works",
  "you",
  "your",
  "some",
  "more",
  "project",
  "projects",
  "ai",
  "system",
  "app",
  "application",
  "software",
  "technology",
  "technologies",
]);
const words = (value: string) =>
  normalize(value)
    .split(" ")
    .filter((word) => word.length > 1 && !ignored.has(word));

const aliases: Record<string, string[]> = {
  "redfort-studio": [
    "redfort",
    "red fort",
    "redfort studio",
    "video generation",
    "wan 2.2",
    "ltx 2.5",
  ],
  "uoh-assistant": [
    "uoh",
    "university assistant",
    "haripur assistant",
    "university chatbot",
    "fyp",
    "final year project",
  ],
  "ai-interviewer": ["interview assistant", "interviewer", "interview app"],
  "kaswa-software": ["kaswa", "kaswa ai", "investment company"],
  "ai-web-summarizer": ["web summarizer", "summarizer"],
};

const projectUrl = "#projects";
const sections = {
  projects: "#projects",
  experience: "#experience",
  skills: "#skills",
  certificates: "#certificates",
  education: "#education",
  contact: "#contact",
  about: "#about",
} as const;

const answer = (
  text: string,
  links: AssistantLink[] = [],
  suggestions: string[] = [prompts.uoh, prompts.redfort, prompts.contact],
  projectId?: string,
): AssistantAnswer => ({ text, links, suggestions, ...(projectId ? { projectId } : {}) });

function scoreProject(question: string, project: Project): number {
  const q = normalize(question);
  if (!q) return 0;
  let score = 0;
  const name = normalize(project.title);
  const nameWords = words(project.title);
  if (name === q || (name.length >= 6 && q.includes(name))) score += 100;
  const covered = nameWords.filter((word) => q.includes(word));
  if (nameWords.length) score += Math.round((covered.length / nameWords.length) * 33);
  if (covered.length > 1) score += 18;
  for (const alias of aliases[project.id] ?? []) {
    if (q.includes(normalize(alias))) score += alias.length > 6 ? 85 : 20;
  }
  for (const term of words(question)) {
    if (normalize(project.tagline).includes(term)) score += 3;
    if (project.stack.some((s) => normalize(s).includes(term))) score += 2;
  }
  return score;
}

function projectDetails(project: Project, focus = ""): AssistantAnswer {
  const stack = project.stack.slice(0, 7).join(", ");
  const text = `${project.title}\n\n${project.tagline}.\n\n${project.problem}\n\nHow it works: ${project.architecture.join("; ")}.\n\nMy contribution: ${project.contribution}\n\nTechnologies: ${stack}.`;
  return answer(
    text,
    [
      { label: "Explore project details", href: projectUrl },
      ...(project.id === "uoh-assistant"
        ? [{ label: "UOH live assistant", href: profile.universityAssistant }]
        : []),
    ],
    [
      `What features does ${project.title} have?`,
      "Which projects use RAG?",
      "How can I contact you?",
    ],
    project.id,
  );
}

export function respondToPortfolioQuestion(
  input: string,
  activeProjectId?: string,
  publicAnswers: PublicAnswer[] = [],
): AssistantAnswer {
  const question = input.trim().slice(0, 450);
  const normalizedQuestion = comparableQuestion(question);
  const published = publicAnswers.find(
    (entry) => comparableQuestion(entry.question) === normalizedQuestion,
  );
  if (published) return answer(published.answer);
  const q = normalize(question);
  if (!q || /^(hi|hello|hey|assalam|salam|aoa|help|start|hello there)$/.test(q)) {
    return answer(
      `Hi! I'm the portfolio assistant for ${profile.name}. I can answer questions using the details published on this website: projects, work experience, skills, education, certifications, and contact information.\n\nWhat would you like to explore?`,
      [{ label: "Explore projects", href: sections.projects }],
      defaultPrompts.slice(0, 4),
    );
  }
  if (
    /\b(bot|assistant)\b.*\b(real|live|ai|model|powered)\b|\b(what is this assistant|who are you|how does this assistant work|how do you work|what can you do)\b/.test(
      q,
    )
  ) {
    return answer(
      "I'm a website knowledge assistant. My answers come from the portfolio's published project and career information, so you can explore the site without sending your questions to an external AI service. I don't invent project details or claim to have live information.",
      [{ label: "See all projects", href: sections.projects }],
      defaultPrompts.slice(0, 3),
    );
  }
  if (
    /\b(email|mail|contact|reach|hire|recruit|collaborat|whatsapp|phone|call|linkedin)\b/.test(q)
  ) {
    return answer(
      `You can reach ${profile.name} at ${profile.email}. The portfolio also has a contact section, LinkedIn, and GitHub. For enquiries about AI engineering, LLM applications, computer vision or automation, email is the best starting point.`,
      [
        { label: "Email Muzammil", href: `mailto:${profile.email}` },
        { label: "LinkedIn", href: profile.linkedin },
        { label: "Contact section", href: sections.contact },
      ],
      [prompts.projects, prompts.skills, "Where can I download your CV?"],
    );
  }
  if (/\b(cv|resume|curriculum|download|pdf)\b/.test(q) && !/summari[sz]/.test(q)) {
    return answer(
      "You can read all four CV pages directly on this website, with thumbnails and page navigation. The original PDF is also available to download.",
      [
        { label: "View CV pages", href: "#cv" },
        { label: "Download PDF", href: `${import.meta.env.BASE_URL}resume.pdf` },
      ],
      [prompts.redfort, prompts.skills, prompts.contact],
    );
  }
  if (/\b(certif\w*|credential\w*|awards?|achievements?)\b/.test(q)) {
    return answer(
      `The portfolio documents ${certificates.length} certificates: ${certificates.map((c) => `${c.title} (${c.issuer})`).join("; ")}. The achievements section also highlights ${achievements.awards.map((a) => a.title).join(" and ")}.`,
      [{ label: "View certificates", href: sections.certificates }],
      [prompts.projects, prompts.redfort],
    );
  }
  if (
    /\b(degree|education|studied|graduat|university|haripur)\b/.test(q) &&
    !/\b(assistant|chatbot|fyp|final year|build|project|developed|rag)\b/.test(q)
  ) {
    return answer(
      `${profile.name} completed a ${education[0]?.degree ?? profile.degree} at ${profile.university} in 2026. His Final Year Project was the deployed UOH AI Assistant, a multilingual university information system with RAG, voice interaction and document support.`,
      [
        { label: "Education", href: sections.education },
        { label: "UOH Assistant project", href: sections.projects },
      ],
      [prompts.uoh, prompts.skills],
    );
  }
  if (/\b(intern\w*)\b/.test(q)) {
    return answer(
      `The portfolio lists ${internships.length} internships:\n\n${internships.map((job) => `• ${job.org} — ${job.role} (${job.year})`).join("\n")}`,
      [{ label: "See experience", href: sections.experience }],
      [prompts.redfort, "Tell me about Kaswa software"],
    );
  }
  const workIntent =
    /\b(worked|work experience|job|role|company|companies|employ|career|professional|red fort|redfort|rft 360)\b/.test(
      q,
    );
  const matchingRole = experience.find((job) => {
    const org = normalize(job.org);
    if (org.includes("red fort") && /red ?fort|rft 360/.test(q)) return true;
    if (org.includes("kaswa") && /kaswa/.test(q)) return true;
    if (org.includes("haripur") && /uoh|haripur/.test(q)) return true;
    return false;
  });
  if (workIntent && matchingRole && !/\b(studio|project|platform|video generation)\b/.test(q)) {
    return answer(
      `${matchingRole.role} at ${matchingRole.org} (${matchingRole.period}).\n\n${matchingRole.points.map((point) => `• ${point}`).join("\n")}\n\nFocus: ${matchingRole.stack.join(", ")}.`,
      [{ label: "See professional experience", href: sections.experience }],
      [prompts.projects, prompts.skills],
    );
  }
  if (workIntent && /\b(experience|career|professional|companies|jobs)\b/.test(q)) {
    return answer(
      `Professional work includes:\n\n${experience.map((job) => `• ${job.role} — ${job.org} (${job.period})`).join("\n")}\n\nThe portfolio also lists ${internships.length} internships.`,
      [{ label: "Experience and internships", href: sections.experience }],
      [prompts.redfort, "What did you build for Kaswa?"],
    );
  }
  if (
    /\b(skills?|stack|languages?|frameworks?|technolog\w*|tools?|python|pytorch|tensorflow|react|java|machine learning|deep learning)\b/.test(
      q,
    ) &&
    !/\b(project|projects|which|using|used|build)\b/.test(q)
  ) {
    return answer(
      `Core skills include:\n\n${skillDomains.map((domain) => `• ${domain.name}: ${domain.items.slice(0, 6).join(", ")}`).join("\n")}\n\nRoles of interest: ${openRoles.slice(0, 4).join(", ")}.`,
      [{ label: "View skills", href: sections.skills }],
      ["Which projects use RAG?", prompts.redfort, prompts.contact],
    );
  }
  if (
    /\b(projects|portfolio|what have you built|all projects|best projects|featured)\b/.test(q) &&
    !/\b(rag|yolo|ocr|python|nlp|cv|video|sentiment|detect\w*|agents?|computer vision|machine learning|pytorch|tensorflow|automation|image|medical)\b/.test(
      q,
    )
  ) {
    return answer(
      `There are ${projects.length} documented AI projects and concepts. Featured work includes:\n\n${projects
        .slice(0, 6)
        .map((p) => `• ${p.title} — ${p.tagline}`)
        .join(
          "\n",
        )}\n\nYou can explore every project, including architecture, features, contributions and technologies, in the Projects section.`,
      [{ label: "Browse all projects", href: sections.projects }],
      [prompts.redfort, prompts.uoh, "Which projects use computer vision?"],
    );
  }

  const ranked = projects
    .map((project) => ({ project, score: scoreProject(question, project) }))
    .sort((a, b) => b.score - a.score);
  const winner = ranked[0];
  if (winner && winner.score >= 23) {
    const isTechQuery =
      /\b(which|list|show|how many)\b/.test(q) &&
      /\b(project|projects|using|use|built|work|based)\b/.test(q);
    if (!isTechQuery || winner.score >= 65) {
      const project = winner.project;
      if (/\b(features?|capabilit\w*|functions?|what can)\b/.test(q)) {
        return answer(
          `${project.title} includes:\n\n${project.features.map((feature) => `• ${feature}`).join("\n")}\n\nTech stack: ${project.stack.join(", ")}.`,
          [{ label: "Explore project", href: projectUrl }],
          [`How was ${project.title} built?`, prompts.contact],
          project.id,
        );
      }
      return projectDetails(project);
    }
  }

  // Follow-up questions inherit the last project context when no different project is named.
  if (
    activeProjectId &&
    /\b(it|its|this project|that project|architecture|features|tech stack|built)\b/.test(q) &&
    (!winner || winner.score < 23)
  ) {
    const previous = projects.find((p) => p.id === activeProjectId);
    if (previous) {
      if (/\b(feature)\b/.test(q))
        return answer(
          `${previous.title} features:\n${previous.features.map((f) => `• ${f}`).join("\n")}`,
          [{ label: "Project details", href: projectUrl }],
          [prompts.contact],
          previous.id,
        );
      return projectDetails(previous);
    }
  }

  const tech = [
    "rag",
    "llm",
    "yolo",
    "ocr",
    "python",
    "pytorch",
    "tensorflow",
    "nlp",
    "automation",
    "computer vision",
    "voice",
    "multilingual",
    "react",
    "openrouter",
    "agent",
    "medical",
    "video",
    "sentiment",
    "image",
    "deep learning",
    "data",
    "detection",
  ].find((term) => q.includes(term));
  if (tech) {
    const matches = projects
      .filter((p) =>
        normalize(
          [p.title, p.tagline, p.problem, ...p.architecture, ...p.features, ...p.stack].join(" "),
        ).includes(tech),
      )
      .slice(0, 7);
    if (matches.length)
      return answer(
        `Projects related to ${tech.toUpperCase()}:\n\n${matches.map((p) => `• ${p.title} — ${p.tagline}`).join("\n")}`,
        [{ label: "Explore matching projects", href: projectUrl }],
        [`Tell me about ${matches[0]?.title ?? "UOH AI Assistant"}`, prompts.skills],
      );
  }
  if (/\b(who|about you|about muzammil|introduce|summary|profile)\b/.test(q)) {
    return answer(
      `${profile.name} is an ${profile.role} based in ${profile.location}. ${profile.summary} ${profile.summary2}`,
      [{ label: "Read about Muzammil", href: sections.about }],
      [prompts.projects, prompts.redfort, prompts.contact],
    );
  }
  return answer(
    "I couldn't find a precise match in the published portfolio information. I can help with all listed AI projects, Red Fort and Kaswa experience, internships, technical skills, certificates, education, the CV and contact details. Try asking about a specific project or topic.",
    [
      { label: "Browse projects", href: sections.projects },
      { label: "Contact Muzammil", href: sections.contact },
    ],
    [prompts.projects, prompts.redfort, prompts.skills, prompts.contact],
  );
}

function comparableQuestion(value: string) {
  return value
    .normalize("NFKC")
    .toLowerCase()
    .replace(/[\p{P}\p{Z}\s]+/gu, " ")
    .trim();
}
