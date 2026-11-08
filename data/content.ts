export type TileId =
  | "experience"
  | "projects"
  | "dsa"
  | "resume"
  | "profile"
  | "tech"
  | "contact"
  | "basic";

export type ComparePair = {
  before?: string;
  after?: string;
  beforeLabel?: string; // defaults to "Input"
  afterLabel?: string; // defaults to "Output"
};

export type Project = {
  id: string;
  name: string;
  kind: string;
  bullets: string[];
  tech: string[];
  /** Omit when there's no working public demo yet (e.g. backend not deployed). */
  demoUrl?: string;
  githubUrl?: string;
  /** "View X post" link shown in the modal header. */
  postUrl?: string;
  /** Before/after drag-to-compare slider. */
  compare?: ComparePair;
};

export type Experience = {
  id: string;
  company: string;
  role: string;
  period: string;
  summary: string;
  bullets: string[];
  tech: string[];
  /** Omit when there's no public-facing URL worth linking (e.g. no live frontend). */
  links?: { label: string; href: string }[];
};

export type TechCategoryId =
  | "languages"
  | "backend"
  | "databases"
  | "auth"
  | "cloud"
  | "apis"
  | "tools"
  | "core"
  | "ml"
  | "client";

export type TechCategory = {
  id: TechCategoryId;
  label: string;
  items: string[];
};

export type ContactItem = {
  id: string;
  label: string;
  value: string;
  href?: string;
};

export type PortfolioContent = {
  experience: Experience[];
  projects: Project[];
  dsaProfiles: {
    platform: "LeetCode" | "GitHub" | "LinkedIn" | "NeetCode";
    href: string;
  }[];
  resume: {
    pdfUrl: string;
  };
  techStack: TechCategory[];
  contact: ContactItem[];
  basicInfo: {
    headline: string;
    subheadline: string;
    intro: string;
  };
  profile: {
    name: string;
    role: string;
    imageSrc: string;
    imageAlt: string;
  };
};

export const content: PortfolioContent = {
  experience: [
    {
      id: "exp-freelance",
      company: "Freelance Full-Stack Developer",
      role: "Vedi Collections · SVJ Trust — Client Projects",
      period: "Jun – Jul 2026",
      summary:
        "Delivered two production client websites end to end in the same stretch — an e-commerce platform and a public trust website — owning each from schema to custom domain.",
      bullets: [
        "Delivered two production client websites end to end — owning requirements, information architecture, responsive implementation, deployment, and post-launch technical support",
        "Vedi Collections: shipped an e-commerce platform (product catalog, order flow, admin panel) with a Next.js frontend and FastAPI backend on Supabase PostgreSQL — deployed on Vercel + Render behind a custom domain, with Google Ads conversion tracking",
        "SVJ Trust: designed and launched a responsive public website for a trust's founder — biography, blogs, video content, donations, an upcoming book — on Next.js, Express, Prisma, Supabase, and Clerk",
      ],
      tech: ["Next.js", "FastAPI", "PostgreSQL", "Supabase", "Express", "Prisma", "Clerk", "Vercel", "Render"],
      links: [
        { label: "vedicollections.com", href: "https://vedicollections.com" },
        { label: "shivvedijagriti.org", href: "https://www.shivvedijagriti.org" },
      ],
    },
  ],
  projects: [
    {
      id: "project-captionfx",
      name: "CaptionFX",
      kind: "Video · Captioning · Live Product",
      bullets: [
        "Built and launched a web app where creators upload videos, generate multilingual captions, style them, and export finished captioned videos",
        "Backend captioning pipeline: speech APIs with word-level transcription, caption formatting rules, and ffmpeg-based export that burns captions into the final video",
        "Word-level highlighting, preset styles and animations, plus Razorpay-based credits for paid usage",
        "SEO improvements and a database round-trip latency cut from ~90 ms to ~4 ms",
      ],
      tech: ["Python", "Speech APIs", "ffmpeg", "React", "Razorpay"],
      demoUrl: "https://captionfx.com",
      postUrl: "https://x.com/captionfx",
    },
    {
      id: "project-topline",
      name: "Topline",
      kind: "AI Agent · Fintech",
      bullets: [
        "Gmail-native AI agent that helps a small business get paid on time — triages inbox history in staged passes (list → header-only peek → transparent relevance scoring → full fetch only above threshold) instead of ingesting the whole mailbox",
        "Extracts invoice facts — number, amount, due date, payment statements — from PDF and scanned attachments (text-first, with an OCR fallback), keeping a verbatim source snippet for every fact so any number traces back to the email it came from",
        "Factored invoice state into two orthogonal Postgres columns (payment evidence vs. reminder eligibility) collapsed to a seven-value ledger state via a pure function; schema-parity tests fail the build if the enums and DB CHECK constraints ever drift apart",
        "Enforced \"no email can mark an invoice paid\" at three independent layers — service logic, event ingestion, and a database constraint — so only a cryptographically-verified Razorpay webhook or an explicit owner override can confirm payment",
        "Gemini is scoped to narrow, human-approved tasks only — drafting reminder emails and parsing plain-English approval replies, never autonomous sending or payment decisions — reviewed and approved from a React 19 + TypeScript dashboard before anything goes out",
      ],
      tech: ["Python", "FastAPI", "PostgreSQL", "SQLAlchemy", "Gmail API", "Google Gemini", "Razorpay", "React", "TypeScript"],
      githubUrl: "https://github.com/aastha-malik/topline",
    },
    {
      id: "project-tendr",
      name: "Tendr",
      kind: "Productivity · Full-Stack",
      bullets: [
        "Solo full-stack project — gamified task manager with a virtual pet: 30+ REST endpoints (tasks, pets, focus sessions, analytics, auth) backed by PostgreSQL with SQLAlchemy ORM, React 19 + TypeScript SPA on the frontend",
        "Server-enforced XP system: task rewards scale by priority (High: 25, Medium: 15, Low: 10 XP), decay 3 XP/day for overdue tasks (floor: 1), and apply XP penalties when deeply overdue tasks are deleted — all computed at the API layer, not the client",
        "Pet aging via backend-enforced qualifying-day system — a pet gains age only when the user both feeds it (costs 35 XP) and logs a focus session on the same calendar day, deduplicated via a join table",
        "Dual auth flows: email/password with bcrypt + 6-digit OTP email verification (30-min TTL); and Google OAuth2 via Authlib with a short-lived pending JWT for new-user username selection — login accepts either email or username, providers handled uniformly at the route level",
        "Migrated from SQLite to PostgreSQL mid-project after hitting connection-pooling and concurrency limits; preserved live data with additive ALTER TABLE migrations and UUID primary keys; deployed on Render with environment-aware CORS, HTTPS-only session middleware, and proxy-header trust",
        "Launched solo on Product Hunt and ranked #66 on launch day",
      ],
      tech: ["Python", "FastAPI", "PostgreSQL", "SQLAlchemy", "JWT", "OAuth2", "React 19", "TypeScript", "Render"],
      demoUrl: "https://tendr-tick-treats.onrender.com/",
      githubUrl: "https://github.com/aastha-malik/Tendr",
      postUrl: "https://x.com/aastha__malik",
    },
    {
      id: "project-video-object-remover",
      name: "Video Object Remover",
      kind: "ML · Computer Vision",
      bullets: [
        "Click-to-remove video pipeline: SAM2 segments and tracks the object across every frame → ProPainter inpaints the removed regions → ffmpeg encodes the final video",
        "3-tier architecture: Next.js frontend → FastAPI backend → Hugging Face Spaces ML pipeline; built and deployed the full backend and infrastructure solo",
        "HF Spaces inference takes 30–60s — a synchronous call would timeout; used SSE to stream real-time progress updates to the frontend throughout processing, WebSocket syncs live progress percentage between the HF pipeline and the backend",
        "Resolved GPU out-of-memory failures at 720p via fp16 inference and chunked processing; containerized with Docker on Hugging Face Spaces, supporting both CPU and GPU inference",
      ],
      tech: ["Python", "FastAPI", "WebSocket", "SSE", "SAM2", "ProPainter", "OpenCV", "Gradio", "Docker", "Hugging Face Spaces"],
      demoUrl: "https://huggingface.co/spaces/aastha-malik/video-object-remover",
      githubUrl: "https://github.com/aastha-malik/video-object-removal",
      compare: { beforeLabel: "Input", afterLabel: "Object removed" },
    },
  ],
  dsaProfiles: [
    {
      platform: "LeetCode",
      href: "https://leetcode.com/u/aastha_malik/",
    },
  ],
  resume: {
    pdfUrl: "/aastha-malik-resume.pdf",
  },
  techStack: [
    {
      id: "languages",
      label: "Languages",
      items: ["Python", "JavaScript", "TypeScript", "SQL"],
    },
    {
      id: "backend",
      label: "Frameworks & Libraries",
      items: ["FastAPI", "Pydantic", "SQLAlchemy"],
    },
    {
      id: "databases",
      label: "Databases",
      items: ["PostgreSQL", "Supabase", "SQLite", "MySQL"],
    },
    {
      id: "auth",
      label: "Authentication & Security",
      items: ["JWT", "OAuth2.0", "Google Sign-In", "bcrypt", "UUID-based schema design"],
    },
    {
      id: "cloud",
      label: "Cloud & Deployment",
      items: ["Render", "Vercel", "Supabase Storage", "Hugging Face Spaces", "Docker", "Razorpay"],
    },
    {
      id: "apis",
      label: "APIs & Protocols",
      items: ["REST API", "WebSocket", "SSE", "Webhooks", "Gmail API", "Gemini API", "Speech-to-Text APIs"],
    },
    {
      id: "tools",
      label: "Developer Tools",
      items: ["Git", "GitHub", "Postman", "VS Code", "Swagger UI", "Linux", "Docker"],
    },
    {
      id: "core",
      label: "CS Core",
      items: ["DBMS", "OOPs", "Operating Systems", "Computer Networks", "HTTP/HTTPS"],
    },
    {
      id: "ml",
      label: "ML & Computer Vision",
      items: ["SAM2", "ProPainter", "faster-whisper", "Silero VAD", "OpenCV", "Gradio", "Machine Learning Pipelines"],
    },
    {
      id: "client",
      label: "Frontend & Client Technologies",
      items: ["Next.js", "React", "TypeScript", "Flutter", "Dart", "Tkinter"],
    },
  ],
  contact: [
    {
      id: "email",
      label: "Email",
      value: "aasthamalik.work@gmail.com",
      href: "mailto:aasthamalik.work@gmail.com",
    },
    {
      id: "phone",
      label: "Phone",
      value: "+91 7303102064",
      href: "tel:+917303102064",
    },
    {
      id: "github",
      label: "GitHub",
      value: "aastha-malik",
      href: "https://github.com/aastha-malik",
    },
    {
      id: "linkedin",
      label: "LinkedIn",
      value: "aastha-malik-",
      href: "https://linkedin.com/in/aastha-malik-",
    },
    {
      id: "twitter",
      label: "Twitter / X",
      value: "aastha__malik",
      href: "https://x.com/aastha__malik",
    },
    {
      id: "huggingface",
      label: "Hugging Face",
      value: "aastha-malik",
      href: "https://huggingface.co/aastha-malik",
    },
  ],
  basicInfo: {
    headline: "Software Engineer",
    subheadline: "Always shipping something new.",
    intro:
      "Software engineer and product builder focused on building and shipping complete products. I work across backend systems, product design, integrations, deployment, and iteration — through my own products like CaptionFX (a live video-captioning platform with paid credits), Topline (a Gmail-native revenue-recovery agent), and Tendr (a gamified productivity app that ranked #66 on Product Hunt), and through production client work for Vedi Collections and SVJ Trust. I work primarily in Python with FastAPI and PostgreSQL, and take projects from API design all the way to deployment.",
  },
  profile: {
    name: "Aastha Malik",
    role: "Software Engineer · Backend & Product",
    imageSrc: "/profile.jpg",
    imageAlt: "Aastha Malik",
  },
};
