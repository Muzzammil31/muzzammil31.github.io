export type Project = {
  id: string;
  code: string;
  title: string;
  tagline: string;
  problem: string;
  architecture: string[];
  features: string[];
  contribution: string;
  stack: string[];
  images: string[];
  report?: string;
  accent: "cyan" | "violet" | "amber" | "lime";
};

export type Certificate = {
  id: string;
  title: string;
  issuer: string;
  category: string;
  description: string;
  date: string;
  credentialId: string;
  skills: string[];
  image: string;
};

export const profile = {
  name: "Muzammil Hussain",
  role: "Artificial Intelligence Engineer",
  tagline: "Building intelligent software that moves beyond prototypes and solves real problems.",
  summary:
    "Artificial Intelligence Engineer with one year of practical experience across AI, machine learning, deep learning, NLP, computer vision, automation and LLM-based applications.",
  summary2:
    "Experienced in developing and deploying AI solutions with Python, PyTorch, TensorFlow, RAG, APIs and modern AI tools—from independent projects to production-ready company software.",
  degree: "BS in Artificial Intelligence",
  university: "University of Haripur",
  location: "Wah Cantt, Pakistan",
  focus: "Production AI automation, LLM/RAG systems, agentic workflows and computer vision",
  email: "muzzammilh26@gmail.com",
  linkedin: "https://www.linkedin.com/in/muzammil-hussain-864752246",
  github: "https://github.com/Muzzammil31",
  fiverr: "https://www.fiverr.com/muzamil_47",
  assistant: "https://violet-jacynth-89.tiiny.site",
  avatar: "/images/muzammil-profile.jpg",
  phone: "+923180523076",
  website: "https://muzzammil31.github.io/",
  universityAssistant: "http://121.52.149.158:12380/",
};

export const stats = [
  { label: "Practical experience", value: 1, suffix: " year" },
  { label: "AI projects & concepts", value: 22, suffix: "" },
  { label: "Internships", value: 6, suffix: "" },
  { label: "Certificates & training", value: 7, suffix: "" },
];

export const openRoles = [
  "AI Engineer",
  "AI / ML Engineer",
  "Machine Learning Engineer",
  "Deep Learning Engineer",
  "LLM Application Developer",
  "AI Automation Engineer",
  "Computer Vision Engineer",
];

export const projects: Project[] = [
  {
    id: "redfort-studio",
    code: "AI-00",
    title: "RedFort Studio — AI Video Automation",
    tagline: "Professional AI video creation workflows · Red Fort",
    problem:
      "Video-production teams need reliable orchestration of AI generation models, captions, and media workflows.",
    architecture: [
      "Web-based AI video production",
      "LTX 2.5 and WAN 2.2 model/API connectivity",
      "Caption, media-library and generation orchestration",
    ],
    features: [
      "API/model connection status and diagnostics",
      "Automatic transcription/captions from existing video audio",
      "Video-generation cancellation and output organisation",
      "AI video quality, rendering and workflow testing",
    ],
    contribution:
      "Contributed to professional AI video automation, model integration, workflow implementation, debugging, and testing at Red Fort.",
    stack: [
      "AI automation",
      "LTX 2.5",
      "WAN 2.2",
      "API integration",
      "Video workflows",
      "Captions",
    ],
    images: ["/images/projects/redfort-studio-cover.jpg"],
    accent: "violet",
  },
  {
    id: "uoh-assistant",
    code: "AI-01",
    title: "UOH AI Assistant",
    tagline: "Deployed university assistant · Final Year Project",
    problem:
      "Students need a practical place to ask university-related academic and administrative questions.",
    architecture: [
      "FastAPI backend and React interface with administrative controls",
      "Semantic retrieval using Sentence-BERT, TF-IDF and ChromaDB",
      "Ollama LLM, document retrieval and multilingual question answering",
    ],
    features: [
      "Answers university admissions, fee, policy and semester questions",
      "GPA calculator, document/PDF support and admin management",
      "Semantic search, NLP matching and student-facing interface",
      "Successfully deployed for use in a government-university environment",
    ],
    contribution:
      "Designed and developed the assistant as a BS Artificial Intelligence Final Year Project.",
    stack: ["Python", "FastAPI", "React", "Sentence-BERT", "TF-IDF", "ChromaDB", "Ollama", "Docker"],
    images: ["/images/projects/uoh-assistant-poster.jpg"],
    report: "files/projects/uoh-assistant-poster.pdf",
    accent: "cyan",
  },
  {
    id: "ai-interviewer",
    code: "AI-02",
    title: "AI Interview Assistant",
    tagline: "AI-assisted interview interaction with audio support",
    problem:
      "Interview practice can benefit from timely, relevant support and an audio-based interaction flow.",
    architecture: [
      "OpenRouter API integration",
      "AI model integration for question responses",
      "Audio-based input and spoken responses",
    ],
    features: [
      "Processes interview questions with AI models",
      "Listens to questions and delivers generated responses through audio",
      "Built for real-time interview interaction",
    ],
    contribution: "Developed the AI-powered assistant, API integration and audio interaction flow.",
    stack: ["OpenRouter API", "AI models", "Audio interaction"],
    images: ["/images/projects/ai-interview-report-cover.jpg"],
    accent: "violet",
  },
  {
    id: "kaswa-software",
    code: "AI-03",
    title: "Kaswa Company AI Software",
    tagline: "Independently built and delivered for a marketing and investment company",
    problem:
      "The company needed a substantial AI-based software solution tailored to its business needs.",
    architecture: [
      "Independently planned system architecture",
      "AI software and automation features",
      "End-to-end development, testing and deployment",
    ],
    features: [
      "Designed and built independently from start to finish",
      "AI and automation features for marketing and investment insights",
      "Delivered as a functional, production-ready company solution",
    ],
    contribution: "Sole developer responsible for architecture, coding, testing and deployment.",
    stack: ["AI", "Software development", "Automation"],
    images: [],
    accent: "amber",
  },
  {
    id: "web-summarizer",
    code: "AI-04",
    title: "AI Web Summarizer Pro",
    tagline: "Content summarization and analysis for web pages, documents and text",
    problem: "Long-form content takes time to review and understand.",
    architecture: [
      "Transformer-based natural language processing",
      "Multi-format content inputs",
      "Context-aware chatbot and content analysis",
    ],
    features: [
      "Summarizes web content, PDFs, images and text",
      "Includes sentiment analysis and trend detection",
      "Adds an interactive, context-aware chatbot",
    ],
    contribution: "Developed an AI-powered platform for summarization and content analysis.",
    stack: ["NLP", "Transformer models", "AI chatbot", "Sentiment analysis"],
    images: [
      "/images/projects/ai-web-summarizer-poster.jpg",
      "/images/projects/ai-web-summarizer-fyp.jpg",
    ],
    report: "files/projects/ai-web-summarizer-poster.pdf",
    accent: "lime",
  },
  {
    id: "vehicle-helmet-detection",
    code: "AI-05",
    title: "Vehicle & Helmet Detection",
    tagline: "Computer vision and number-plate OCR for traffic monitoring",
    problem:
      "Traffic monitoring needs to identify helmet compliance and capture vehicle plates when a rider is not wearing a helmet.",
    architecture: [
      "Computer-vision vehicle and helmet detection",
      "Automatic number-plate detection",
      "Optical character recognition (OCR)",
    ],
    features: [
      "Detects vehicles and helmet compliance",
      "Uses OCR to read a plate when a helmet violation is detected",
    ],
    contribution: "Developed an AI-based traffic-monitoring and compliance-detection system.",
    stack: ["AI", "Computer vision", "OCR"],
    images: [],
    accent: "cyan",
  },
  {
    id: "motion-detection",
    code: "AI-06",
    title: "AI Motion Detection",
    tagline: "Real-time video analysis to identify moving objects",
    problem:
      "Monitoring video for moving objects can benefit from automated frame-by-frame analysis.",
    architecture: [
      "Video-frame preprocessing",
      "Feature extraction",
      "Model-based motion classification",
    ],
    features: [
      "Analyzes video frames to identify movement in real time",
      "Designed for security monitoring and automated video analysis",
    ],
    contribution: "Developed an AI-based motion-detection system and its video-analysis pipeline.",
    stack: ["AI", "Video analysis", "Feature extraction", "Classification"],
    images: [],
    accent: "violet",
  },
  {
    id: "medical-ai-research",
    code: "AI-07",
    title: "Medical & Radiology AI Research",
    tagline: "Research focus: multimodal AI for reports and radiology images",
    problem:
      "Interpreting medical reports alongside radiology images is a complex multimodal research challenge.",
    architecture: [
      "Agentic AI and multimodal models",
      "Large Language Models (LLMs)",
      "Retrieval-Augmented Generation (RAG)",
    ],
    features: [
      "Research framework for interpreting medical reports and radiology images",
      "Combines multimodal AI, language models and retrieval",
    ],
    contribution:
      "Developing research focused on using AI to assist medical-report and radiology-image interpretation.",
    stack: ["Agentic AI", "Multimodal AI", "Medical AI", "LLMs", "RAG"],
    images: ["/images/projects/medical-ai-research-cover.jpg"],
    accent: "amber",
  },
  // Additional projects documented in the updated November 2026 CV.
  {
    id: "news-sentiment",
    code: "AI-08",
    title: "News Sentiment Analysis",
    tagline: "An AI-powered dashboard for understanding Pakistani news sentiment",
    problem: "News reporting can be difficult to compare and interpret at scale.",
    architecture: [
      "News collection and preprocessing",
      "NLP-based sentiment classification",
      "Web dashboard and one-click launcher",
    ],
    features: [
      "Aggregates local news",
      "Performs sentiment analysis",
      "Presents results using visual dashboards",
    ],
    contribution: "Developed an end-to-end news analysis web application.",
    stack: ["NLP", "Sentiment analysis", "Full-stack", "Dashboards"],
    images: [],
    accent: "violet",
  },
  {
    id: "job-agent",
    code: "AI-09",
    title: "AI Job Application Agent",
    tagline: "CV-aware job discovery and application automation",
    problem: "Manually reviewing job posts and assessing compatibility is repetitive.",
    architecture: [
      "Automated vacancy discovery",
      "CV-to-job matching",
      "Application workflow automation",
    ],
    features: [
      "Finds relevant job opportunities",
      "Matches jobs with CV information",
      "Supports applying to suitable positions",
    ],
    contribution: "Built an AI-enabled job-search and application workflow.",
    stack: ["AI agent", "Automation", "Job matching"],
    images: [],
    accent: "cyan",
  },
  {
    id: "crash-detection",
    code: "AI-10",
    title: "Vehicle Crash Detection",
    tagline: "YOLO-based accident detection from traffic video",
    problem:
      "Identifying potential road accidents from video requires consistent visual monitoring.",
    architecture: ["Video-frame analysis", "YOLO-based detection", "Computer-vision inference"],
    features: ["Analyzes road footage", "Identifies potential vehicle crashes"],
    contribution: "Built a computer-vision vehicle accident detection system.",
    stack: ["YOLO", "Computer vision", "Video analysis"],
    images: [],
    accent: "amber",
  },
  {
    id: "pothole-detection",
    code: "AI-11",
    title: "Pothole Detection System",
    tagline: "Deep learning for roadway hazard detection on edge devices",
    problem: "Roadway potholes can pose safety risks and are difficult to assess manually.",
    architecture: [
      "Image input and preprocessing",
      "Deep-learning detection",
      "Jetson Nano deployment target",
    ],
    features: ["Detects roadway potholes", "Designed for a compact edge AI environment"],
    contribution: "Designed a pothole-detection system intended for Jetson Nano.",
    stack: ["Deep learning", "Computer vision", "Jetson Nano"],
    images: [],
    accent: "lime",
  },
  {
    id: "bone-fracture",
    code: "AI-12",
    title: "Bone Fracture Detection",
    tagline: "Deep learning applied to medical imaging",
    problem: "Medical-image classification requires careful visual pattern detection.",
    architecture: [
      "Medical image preprocessing",
      "Deep-learning inference",
      "Fracture classification",
    ],
    features: [
      "Analyzes bone images for signs of fractures",
      "Explores AI-assisted medical image analysis",
    ],
    contribution: "Developed a medical image-analysis project using deep learning.",
    stack: ["Deep learning", "Medical imaging", "Computer vision"],
    images: [],
    accent: "violet",
  },
  {
    id: "insect-detection",
    code: "AI-13",
    title: "Insect Detection Desktop App",
    tagline: "Image recognition with a desktop interface",
    problem: "Recognizing insects from pictures can be challenging without specialised tools.",
    architecture: ["Image ingestion", "AI-based insect identification", "Desktop GUI workflow"],
    features: ["Recognizes insects from images", "Provides an accessible desktop interface"],
    contribution: "Developed a desktop AI application for insect identification.",
    stack: ["Image classification", "AI", "Desktop application"],
    images: [],
    accent: "cyan",
  },
  {
    id: "urdu-translator",
    code: "AI-14",
    title: "Language Translator App",
    tagline: "A graphical translation tool with Urdu support",
    problem: "People need practical translation tools that support multiple languages.",
    architecture: ["Text input", "Language translation", "Graphical user interface"],
    features: ["Provides text translation", "Includes Urdu-language support"],
    contribution: "Built a GUI-based language translation application.",
    stack: ["NLP", "Translation", "Urdu", "GUI"],
    images: [],
    accent: "lime",
  },
  {
    id: "news-scraper",
    code: "AI-15",
    title: "News Scraper System",
    tagline: "Automated collection of Pakistani news data",
    problem: "Gathering news articles manually makes content analysis inefficient.",
    architecture: [
      "Web content retrieval",
      "Extraction and parsing",
      "Respectful robots.txt-aware crawling",
    ],
    features: [
      "Collects news from Pakistani news websites",
      "Handles source access restrictions appropriately",
    ],
    contribution: "Developed a web-scraping pipeline for news collection.",
    stack: ["Web scraping", "Python", "Data collection", "Automation"],
    images: [],
    accent: "amber",
  },
  {
    id: "image-classification",
    code: "AI-16",
    title: "Image Classification Training Pipeline",
    tagline: "Research-ready model training and evaluation in PyTorch",
    problem: "Training and comparing different vision models needs a repeatable process.",
    architecture: [
      "EfficientNet, ResNet and ConvNeXt",
      "Image augmentation and preprocessing",
      "Model evaluation workflow",
    ],
    features: [
      "Supports multiple model architectures",
      "Includes augmentation and evaluation utilities",
    ],
    contribution: "Created a configurable PyTorch image-classification training framework.",
    stack: ["PyTorch", "EfficientNet", "ResNet", "ConvNeXt"],
    images: [],
    accent: "violet",
  },
  {
    id: "emotion-ai",
    code: "AI-17",
    title: "Emotion-Aware Conversation AI",
    tagline: "Exploring more natural, context-aware AI conversations",
    problem: "AI assistants can miss important emotional nuance in user interactions.",
    architecture: [
      "Conversation context analysis",
      "Emotion-aware response logic",
      "Iterative dialogue improvement",
    ],
    features: [
      "Explores emotional context in conversations",
      "Aims to improve response quality and relevance",
    ],
    contribution: "Worked on a project to improve conversational AI interactions.",
    stack: ["Conversational AI", "NLP", "Emotion recognition"],
    images: [],
    accent: "lime",
  },
  {
    id: "muzzammil-robot",
    code: "AI-18",
    title: "Muzzammil Robot",
    tagline: "Personal AI assistant and automation concept",
    problem: "Personal automation can be simplified through a unified AI assistant.",
    architecture: [
      "AI assistant concepts",
      "Automation integration planning",
      "Interactive robot interface",
    ],
    features: ["Personal assistant concept", "Planned extensions for automation"],
    contribution:
      "Exploring a personal AI assistant and robotics concept; future features are planned.",
    stack: ["AI assistant", "Robotics", "Automation concept"],
    images: [],
    accent: "cyan",
  },
  {
    id: "smart-fire-fighting-robot",
    code: "AI-19",
    title: "Smart Fire-Fighting Robot (ESP32)",
    tagline: "Autonomous flame detection & response · Embedded IoT prototype",
    problem:
      "A mobile fire-fighting prototype must detect a flame, avoid obstacles, and safely control its extinguishing mechanism.",
    architecture: [
      "ESP32 controller connected to three flame sensors",
      "Ultrasonic obstacle detection and dual-motor drive",
      "Relay-controlled pump with servo-based targeting",
    ],
    features: [
      "Automatic patrol, flame investigation and approach modes",
      "Remote manual control through web interface and Blynk",
      "Emergency stop, speed control and obstacle-safety logic",
    ],
    contribution:
      "Developed the ESP32 control logic and integrated sensing, navigation, manual control and targeted extinguishing.",
    stack: ["ESP32", "Arduino IDE", "IoT", "Flame sensors", "Ultrasonic", "Blynk", "Web UI"],
    images: [],
    accent: "amber",
  },

  {
    id: "interviewpilot-ai",
    code: "AI-20",
    title: "InterviewPilot AI",
    tagline: "Voice-aware interview assistant · AI product",
    problem: "Preparing for interviews requires connecting job descriptions, resumes and conversational practice.",
    architecture: ["Context generation from resumes and job descriptions", "OpenRouter-powered LLM question and answer workflows", "Whisper speech recognition, audio processing and desktop packaging"],
    features: ["Resume- and role-aware interview question generation", "Context-sensitive answers and voice interaction", "Real-time audio processing and packaged desktop experience"],
    contribution: "Built an AI-powered interview assistant integrating language models and audio workflows.",
    stack: ["Python", "LLMs", "OpenRouter", "Whisper", "Speech Recognition", "PyInstaller"],
    images: [],
    accent: "cyan",
  },
  {
    id: "datasense-ai",
    code: "AI-21",
    title: "DataSense AI — Natural Language Data Assistant",
    tagline: "Text-to-SQL and document Q&A · Client AI delivery",
    problem: "People need answers from databases and PDF documents without manually writing complex queries.",
    architecture: ["Natural-language-to-SQL with validation and read-only safeguards", "RAG document indexing and semantic retrieval", "Local Llama 3.1/Ollama model integration with application APIs"],
    features: ["Conversational analysis of structured SQL data", "Question answering over PDFs and documents", "Unified interface for database and document questions"],
    contribution: "Designed and delivered an AI data assistant integrating structured querying and retrieval-augmented generation.",
    stack: ["Python", "FastAPI", "React", "Llama 3.1", "Ollama", "SQL", "LangChain", "RAG"],
    images: [],
    accent: "violet",
  },
];

export const skillDomains = [
  {
    name: "AI & machine learning",
    items: [
      "Artificial Intelligence",
      "Machine Learning",
      "Deep Learning",
      "Model training",
      "Model evaluation",
    ],
  },
  {
    name: "Deep learning frameworks",
    items: ["PyTorch", "TensorFlow", "Scikit-learn", "EfficientNet", "ResNet", "ConvNeXt"],
  },
  {
    name: "Programming",
    items: ["Python", "NumPy", "Pandas", "Matplotlib", "Java", "Spring Boot"],
  },
  {
    name: "LLMs & applied AI",
    items: ["LLM applications", "RAG", "OpenRouter API", "AI automation", "AI system development"],
  },
  {
    name: "Computer vision",
    items: [
      "OpenCV",
      "YOLO",
      "OCR",
      "Image classification",
      "Video analysis",
      "Medical image analysis",
    ],
  },
  {
    name: "Web development",
    items: ["HTML", "CSS", "JavaScript", "React (basic)", "Backend APIs"],
  },
  {
    name: "Data & visualization",
    items: ["Data preprocessing", "Feature engineering", "EDA", "Seaborn", "Power BI"],
  },
  {
    name: "Professional skills",
    items: [
      "Problem-solving",
      "Independent delivery",
      "Critical thinking",
      "System testing",
      "Team collaboration",
      "Technical documentation",
    ],
  },
  {
    name: "Tools & collaboration",
    items: [
      "Git",
      "GitHub",
      "Jupyter Notebook",
      "Google Colab",
      "VS Code",
      "Anaconda",
      "Problem-solving",
      "Team collaboration",
    ],
  },
];

export const experience = [
  {
    role: "AI Software Developer — UOH AI Assistant",
    org: "University of Haripur",
    period: "2026",
    note: "Deployed academic AI system · Final Year Project",
    points: [
      "Designed and deployed an AI university assistant for students and academic services",
      "Integrated retrieval-augmented generation (RAG), voice interaction and multilingual support",
      "Added file handling and university-information capabilities",
      "Delivered the system for practical use in a government university environment",
    ],
    stack: ["RAG", "LLMs", "Multilingual", "Voice", "Deployment"],
  },
  {
    role: "AI Engineer",
    org: "Red Fort Company · AI & Automation",
    period: "2026",
    note: "Applied AI engineering · Video workflows · LLM systems",
    points: [
      "Contributed to RedFort Studio AI video automation workflows and video-generation model integration",
      "Worked on API connectivity, LTX/WAN model diagnostics, captions, cancel controls and testing",
      "Developed an AI-powered interview assistant for real-time interview interaction",
      "Integrated OpenRouter APIs and AI models to process questions and generate relevant responses",
      "Implemented audio-based question listening and spoken AI-generated responses",
      "Contributed to AI automation, model integration, testing and system improvements",
    ],
    stack: ["AI", "OpenRouter API", "Audio interaction", "Automation"],
  },
  {
    role: "AI Software Developer",
    org: "Kaswa Marketing & Investment Company",
    period: "2025",
    note: "Sole developer · Full project lifecycle",
    points: [
      "Designed and delivered an AI-based software solution independently",
      "Handled architecture, development, testing and deployment",
      "Integrated AI and automation features for marketing strategies and investment insights",
      "Handed over a functional, production-ready solution without an external development team",
    ],
    stack: ["AI software", "Automation", "Independent delivery", "Deployment"],
  },
];

export const internships = [
  {
    org: "RFT 360 (SMC-Private) Limited",
    role: "AI Automation Intern",
    year: "Aug 2026 – Present",
    detail:
      "AI automation internship supporting business workflows, software development, API/model integration, testing and continuous system improvement under senior-developer supervision.",
  },
  {
    org: "Technik Nest",
    role: "AI / Software Development Intern",
    year: "2025 · 3 months",
    detail:
      "Completed an international internship contributing to software-development projects and practical AI / software tasks.",
  },
  {
    org: "Arch Technologies",
    role: "Software Development Intern",
    year: "2025",
    detail:
      "Assisted with software development and AI model integration, and helped debug and improve internal tools.",
  },
  {
    org: "CodeAlpha",
    role: "Machine Learning Intern",
    year: "2024",
    detail:
      "Worked with machine-learning algorithms and data visualization; contributed to dashboards and model-output analysis.",
  },
  {
    org: "Empowered",
    role: "AI Research & Automation Intern",
    year: "2024",
    detail:
      "Supported AI product research and automation work, with dataset preparation and AI-module documentation.",
  },
  {
    org: "Brainware",
    role: "Deep Learning Intern",
    year: "2023",
    detail:
      "Contributed to deep-learning prototypes, tested models and suggested performance improvements.",
  },
];

export const certificates: Certificate[] = [
  {
    id: "google-ai-essentials",
    title: "Google AI Essentials",
    issuer: "Google · Coursera",
    category: "AI",
    description:
      "Google AI Essentials course completion recorded in the archived July 2026 CV and supported by the original certificate.",
    date: "07 Aug 2024",
    credentialId: "See original scan",
    skills: ["Generative AI", "Responsible AI", "Prompt engineering"],
    image: "/images/certificates/google-ai-essentials.jpg",
  },
  {
    id: "opswat-cip",
    title: "Introduction to Critical Infrastructure Protection",
    issuer: "OPSWAT Academy",
    category: "Security",
    description:
      "Completed the Introduction to CIP program. The certificate records an expiry date in March 2026.",
    date: "17 Mar 2025",
    credentialId: "nniB8cipFQ",
    skills: ["Critical infrastructure", "Cybersecurity", "Security awareness"],
    image: "/images/certificates/opswat-cip.jpg",
  },
  {
    id: "arch-generative-ai",
    title: "Certificate of Completion — Generative AI",
    issuer: "Arch Technologies",
    category: "AI",
    description:
      "Generative AI training recorded in the archived CV; a matching Arch Technologies completion certificate is attached.",
    date: "01 Jul 2024 (CV)",
    credentialId: "ARCH-2504-0409",
    skills: ["Generative AI", "AI training", "Software development"],
    image: "/images/certificates/arch-generative-ai.jpg",
  },
  {
    id: "technik-ai-ml-internship",
    title: "AI & Machine Learning Internship Certificate",
    issuer: "Technik Nest",
    category: "Internship",
    description:
      "Certificate for a six-week AI/ML internship covering algorithms, preprocessing and model training, June–July 2025.",
    date: "04 Aug 2025",
    credentialId: "TN/IN01/AM/003",
    skills: ["Machine Learning", "Data preprocessing", "Model training"],
    image: "/images/certificates/technik-nest-internship.png",
  },
  {
    id: "kaswa-software-delivery",
    title: "Company-Wide Software Solution Delivery",
    issuer: "Kaswa Marketing & Business Developers",
    category: "Project Recognition",
    description:
      "Software-delivery recognition described in the latest CV; a separate certificate scan has not been recovered.",
    date: "2025",
    credentialId: "Not listed",
    skills: ["AI software delivery", "Project development", "Deployment"],
    image: "",
  },
  {
    id: "technik-nest-project-completion",
    title: "Enterprise Software Development — Project Recognition",
    issuer: "Technik Nest",
    category: "Project Recognition",
    description:
      "A project-completion entry documented in the latest CV. The recovered Technik Nest image is an internship certificate, not a separate project document.",
    date: "Not separately recorded",
    credentialId: "Not separately verified",
    skills: ["Software projects", "AI development", "Internship work"],
    image: "",
  },
  {
    id: "pak-austria-ai-ml",
    title: "Artificial Intelligence / Machine Learning Training",
    issuer: "Pak-Austria Fachhochschule",
    category: "Training",
    description:
      "Training entry listed in the archived July 2026 CV. Its old attachment points to a Technik Nest certificate, so no matching scan is available yet.",
    date: "20 Jul 2025 (CV)",
    credentialId: "Scan not found",
    skills: ["Artificial Intelligence", "Machine Learning", "Applied sciences"],
    image: "",
  },
];

export const education = [
  {
    degree: "Bachelor of Science in Artificial Intelligence",
    org: "University of Haripur",
    period: "Completed · 2026",
    detail:
      "Focused on artificial intelligence, machine learning, deep learning, NLP and computer vision. Final Year Project: UOH AI Assistant, deployed at the university.",
  },
];

export const achievements = {
  participation: [
    {
      title: "University of Haripur — Final Year Project Exhibition",
      detail:
        "Presented the University Chatbot AI-powered documentation assistant project at the Department of Information Technology exhibition. The original exhibition poster is attached.",
      evidence: "files/projects/uoh-assistant-poster.pdf",
    },
  ],
  awards: [
    {
      title: "UOH AI Assistant deployed",
      detail: "Final Year Project delivered for use within a government-university environment.",
    },
    {
      title: "Kaswa company-wide software delivery",
      detail:
        "Independently designed, developed and delivered a functional AI-based company solution.",
    },
  ],
  research: [
    {
      title: "Agentic Multimodal AI for Medical Reports and Radiology",
      detail:
        "Research framework exploring Agentic AI, multimodal models, LLMs and RAG to assist medical-report and radiology-image interpretation.",
      tags: ["Agentic AI", "Multimodal AI", "Medical AI", "Radiology", "LLMs", "RAG"],
    },
    {
      title: "UOH AI Assistant — Final Year Project",
      detail:
        "Final Year Project at the University of Haripur: a university assistant with RAG, voice support, multilingual interaction, file handling and university information services.",
      tags: ["Final Year Project", "RAG", "Voice", "Multilingual AI"],
    },
  ],
};
