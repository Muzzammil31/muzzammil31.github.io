/**
 * Portfolio-owned editorial records. Dates identify the publication or supported
 * year, not a claimed day of delivery. Missing client feedback is never invented.
 */
export type Delivery = {
  id: string;
  title: string;
  partner: string;
  date: string;
  kind: string;
  status: "Delivered" | "Implemented" | "In progress" | "Owner-reported";
  description: string;
  technology: string[];
  contribution: string;
  projectId?: string;
  evidence?: string;
};
export const deliveries: Delivery[] = [
  {
    id: "kaswa",
    title: "Enterprise AI Software",
    partner: "Kaswa Marketing & Investment (Kasba team)",
    date: "2025",
    kind: "Client delivery",
    status: "Delivered",
    description: "Independently designed and handed over an AI-based business software solution supporting marketing and investment-related workflows.",
    technology: ["AI software", "Business automation", "Testing", "Deployment"],
    contribution: "Owned architecture, development, testing, and handover.",
    projectId: "kaswa-software",
  },
  {
    id: "uoh",
    title: "UOH AI Assistant",
    partner: "University of Haripur",
    date: "2026",
    kind: "University implementation · FYP",
    status: "Implemented",
    description: "An AI university assistant for academic policies, admissions, fees, semester questions, and document-based search, with an administrative interface.",
    technology: ["Python", "FastAPI", "React", "Sentence-BERT", "TF-IDF", "ChromaDB", "Ollama", "Docker"],
    contribution: "Designed and deployed a university-facing AI assistant as a final-year project.",
    projectId: "uoh-assistant",
    evidence: "files/projects/uoh-assistant-poster.pdf",
  },
  {
    id: "news-sentiment",
    title: "Business News Sentiment Tracker",
    partner: "University principal · handover reported by portfolio owner",
    date: "Delivery date not documented",
    kind: "University stakeholder delivery",
    status: "Owner-reported",
    description: "A newspaper sentiment-analysis dashboard for collecting and interpreting business/news coverage. The owner reports presenting it to the principal; the delivery date and feedback remain unverified.",
    technology: ["Python", "NLP", "Sentiment analysis", "Dashboards"],
    contribution: "Built the news-processing and sentiment-visualization workflow.",
    projectId: "news-sentiment",
  },
  {
    id: "datasense",
    title: "DataSense AI",
    partner: "Client project · name undisclosed",
    date: "2026 · exact date not documented",
    kind: "Client delivery",
    status: "Delivered",
    description: "Natural-language access to structured SQL databases and PDF documents, combining read-only text-to-SQL guardrails with retrieval-augmented document search.",
    technology: ["Python", "FastAPI", "React", "Llama 3.1", "Ollama", "SQL", "RAG", "LangChain"],
    contribution: "Developed and delivered an AI data-intelligence workflow for a client.",
    projectId: "datasense-ai",
  },
  {
    id: "interviewpilot",
    title: "InterviewPilot AI",
    partner: "AI product development",
    date: "2026 · exact date not documented",
    kind: "Applied AI product",
    status: "Implemented",
    description: "Resume- and job-description-aware interview assistance with relevant question generation, speech recognition, and real-time audio interaction.",
    technology: ["Python", "LLMs", "OpenRouter", "Whisper", "Speech recognition", "PyInstaller"],
    contribution: "Built contextual interview support with real-time voice processing.",
    projectId: "interviewpilot-ai",
  },
  {
    id: "redfort",
    title: "RedFort Studio AI Workflows",
    partner: "Red Fort / RFT 360",
    date: "2026 · ongoing",
    kind: "Professional engineering",
    status: "In progress",
    description: "Production-oriented AI video workflows: model/API connectivity, automated captions, remote generation, cancellation, and media-library improvements.",
    technology: ["LTX 2.5", "WAN 2.2", "API integration", "Python", "AI automation"],
    contribution: "Engineering, model integration, diagnostics, testing, and workflow improvements.",
    projectId: "redfort-studio",
  },
  {
    id: "student-fyps",
    title: "Student Final-Year Project Support",
    partner: "University project collaborations",
    date: "Dates and individual project titles not supplied",
    kind: "Student FYP development",
    status: "Owner-reported",
    description: "The portfolio owner reports developing FYPs for students. Specific student projects, completion dates and permission to publish their details have not yet been documented.",
    technology: ["AI/ML", "Applied software", "Project documentation"],
    contribution: "Reported technical development and implementation support.",
  },
];

export type JournalEntry = {
  id: string;
  title: string;
  date: string;
  category: "Engineering Notes" | "University Days" | "Build Diary" | "Delivery Lessons";
  minutes: number;
  excerpt: string;
  paragraphs: string[];
  related?: string;
};
export const journalEntries: JournalEntry[] = [
  {
    id: "rag-is-an-engineering-system",
    title: "Building a university assistant taught me that RAG is a system, not a prompt",
    date: "24 Nov 2026",
    category: "Engineering Notes",
    minutes: 4,
    excerpt: "The interesting work starts after the model answers its first question.",
    paragraphs: [
      "Working on the UOH AI Assistant changed how I think about useful language-model applications. A convincing demo is only the beginning: students need answers about real university procedures, and those answers have to connect to relevant information.",
      "The architecture has several moving parts: collecting academic material, retrieving the right context, handling document queries, designing a clear interface, and giving administrators a practical way to manage information. These pieces matter as much as the language model itself.",
      "I learned to treat a question-answering system as an information product. The work is not simply to generate fluent text, but to make information discoverable and to make the experience understandable for the people who rely on it.",
      "My next improvement mindset is evidence first: test representative questions, inspect retrieval failures, and document what the assistant can and cannot reliably answer.",
    ],
    related: "uoh",
  },
  {
    id: "a-software-handover-is-not-a-screenshot",
    title: "What delivering software to a real business changes",
    date: "24 Nov 2026",
    category: "Delivery Lessons",
    minutes: 3,
    excerpt: "Ownership means considering the handover, not just the implementation.",
    paragraphs: [
      "Building the AI-based software for the Kaswa team gave me a practical lesson in taking responsibility for a project from architecture to handover. In client work, features only matter when the software supports an actual workflow.",
      "I think about delivery in four layers: understanding the problem, shaping the system, testing the behavior, and making the result usable by the people receiving it. The final layer is easy to underestimate.",
      "This is also why I document decisions and maintain clear project boundaries. A useful software project should be understandable after the developer closes the editor.",
    ],
    related: "kaswa",
  },
  {
    id: "natural-language-meets-sql",
    title: "DataSense: making natural-language data access safer",
    date: "24 Nov 2026",
    category: "Engineering Notes",
    minutes: 4,
    excerpt: "A helpful SQL agent needs boundaries just as much as it needs a capable model.",
    paragraphs: [
      "DataSense brings together two very different kinds of information: structured database records and unstructured PDF documents. A single natural-language interface has to route questions to the appropriate mechanism.",
      "For structured information, a model can help translate a question into a SQL query, but the system should enforce read-only execution and validation. For document questions, retrieval-augmented generation brings relevant passages into the answer flow.",
      "The engineering challenge is designing both paths so they feel consistent while preserving their different safety requirements. Guardrails, input handling and predictable API responses are part of the product—not optional finishing touches.",
      "I am interested in making data tools easier for people who know the business question but do not write SQL every day.",
    ],
    related: "datasense",
  },
  {
    id: "video-ai-beyond-a-generation-button",
    title: "Behind the scenes of an AI video workflow",
    date: "24 Nov 2026",
    category: "Build Diary",
    minutes: 3,
    excerpt: "Generation quality depends on the connections between models, media and the editor.",
    paragraphs: [
      "While contributing to RedFort Studio, I worked on the less visible parts of AI video creation: remote model connectivity, API diagnostics, captions, cancellation controls and making generated clips easier to manage.",
      "A polished interface is valuable, but the experience can fall apart when a generation request fails, an upload is inconsistent, or a caption obscures the important part of a scene. Reliable error handling and clear controls matter.",
      "I now look at model integration as a complete pipeline—from the input and generation request to preview, audio, captions and final delivery.",
    ],
    related: "redfort",
  },
  {
    id: "from-university-to-production",
    title: "University projects, internships and the habit of shipping",
    date: "24 Nov 2026",
    category: "University Days",
    minutes: 3,
    excerpt: "My strongest learning came from building alongside the coursework.",
    paragraphs: [
      "My BS Artificial Intelligence journey at the University of Haripur involved more than classroom study. I explored AI, computer vision, embedded systems and software development through practical projects.",
      "Internship work exposed me to team workflows, debugging and implementation constraints that are less visible in isolated assignments. Alongside that experience, independent work helped me practice full-cycle responsibility.",
      "The connection between university learning and industry work is visible in my portfolio: the questions become more practical, the delivery requirements become clearer, and documentation matters more with each project.",
    ],
    related: "uoh",
  },
];
export const journeyEvents = [
  { year: "2022", title: "University foundation", label: "BS Artificial Intelligence · University of Haripur", description: "Began formal AI studies and explored programming, data and machine-learning foundations.", projectIds: [] },
  { year: "2023–24", title: "Learning by building", label: "Early projects and software internships", description: "Worked on practical software, computer-vision and AI exercises alongside university study and internships.", projectIds: ["news-sentiment"] },
  { year: "2025", title: "First independent business delivery", label: "Kaswa software · Technik Nest · Arch Technologies", description: "Developed and handed over business software while gaining experience through professional training and internships.", projectIds: ["kaswa"] },
  { year: "2026", title: "University implementation", label: "UOH AI Assistant · final-year project", description: "Completed and deployed the university assistant and advanced applied-AI projects.", projectIds: ["uoh", "interviewpilot"] },
  { year: "2026 · Now", title: "Professional AI delivery", label: "Red Fort / RFT 360 work · client AI development", description: "Contributed to AI automation and video production systems; delivered DataSense for a client. The current role name 'Red Code' is awaiting confirmation against available employment records.", projectIds: ["redfort", "datasense"] },
];
export const linkedInEndorsement = {
  author: "Muhammad Muddassir Hussain",
  excerpt: "Muzammil has a rare combination of deep technical knowledge and practical problem-solving skills.",
  source: "https://www.linkedin.com/in/muzzammil-hussain-864752246/",
  status: "Publicly visible LinkedIn recommendation",
};
