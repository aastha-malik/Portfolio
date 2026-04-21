export type TileId =
  | "projects"
  | "dsa"
  | "resume"
  | "profile"
  | "tech"
  | "contact"
  | "basic";

export type Project = {
  id: string;
  name: string;
  kind: string;
  bullets: string[];
  tech: string[];
  demoUrl: string;
  githubUrl: string;
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
  projects: Project[];
  dsaProfiles: {
    platform: "LeetCode" | "GitHub" | "LinkedIn" | "NeetCode";
    href: string;
  }[];
  resume: {
    previewImage: string;
    downloadUrl: string;
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
  projects: [
    {
      id: "project-chikitsa",
      name: "Chikitsa Cloud",
      kind: "Healthcare · Backend",
      bullets: [
        "Architected the full backend — 35 REST endpoints across 7 modules: Auth, User Management, Medical Records, Health Analysis, Family Access Control, Hospital Discovery, and Feedback",
        "UUID primary keys over sequential IDs — eliminates enumeration vulnerabilities and referential integrity issues caused by deletions",
        "Dual-channel family access control via QR code scanning and email invitations — frictionless UX over password sharing, same reasoning as UPI over card payments",
        "Medical files on Supabase Storage (AWS S3-backed); PostgreSQL stores metadata and references only — keeps the DB lean, files encrypted and cloud-managed",
        "OAuth2 + Google Sign-In with JWT auth; OpenStreetMap API for hospital discovery; health metrics validation engine checks BMI and vitals against age/weight/height-based thresholds",
        "Deployed on Render with PostgreSQL — full backend owned end-to-end as part of a team project",
      ],
      tech: ["Python", "FastAPI", "PostgreSQL", "Supabase", "JWT", "OAuth2", "Render"],
      demoUrl: "https://drive.google.com/file/d/10A-i4ca3aM3ZiWz79QTj451qiwctJ6P_/view?usp=sharing",
      githubUrl: "https://github.com/aastha-malik/ChikitsaCloud",
    },
    {
      id: "project-blossom",
      name: "Blossom",
      kind: "Productivity · Gamified",
      bullets: [
        "Solo end-to-end project — gamified task manager with a virtual pet that degrades if you miss tasks; behavioral pressure, not just tracking",
        "20+ REST endpoints covering task CRUD, streaks, XP/points, rewards, user analytics, and team management",
        "Gamification engine: daily streak tracking, inactivity penalties on missed days, and reward tier progression driven by cumulative XP — backend-enforced, not cosmetic",
        "Migrated from SQLite to PostgreSQL mid-project — SQLite hit its limits on connection handling, concurrency, and cloud compatibility; Postgres was the right call for production",
        "OTP-based password reset over email links — already using OTP at signup, keeping it consistent reduced complexity and gave users a uniform auth experience",
        "Deployed on Render with PostgreSQL — API design, schema, auth, gamification logic, and deployment all owned solo",
      ],
      tech: ["Python", "FastAPI", "PostgreSQL", "JWT", "OAuth2", "Render"],
      demoUrl: "https://blossom-arru.onrender.com/",
      githubUrl: "https://github.com/aastha-malik/Blossom",
    },
    {
      id: "project-video-object-remover",
      name: "Video Object Remover",
      kind: "ML · Computer Vision",
      bullets: [
        "Click-to-remove video pipeline: SAM2 segments and tracks the object across every frame → ProPainter inpaints the removed regions → ffmpeg encodes the final video",
        "3-tier architecture: Next.js frontend → FastAPI backend → Hugging Face Spaces ML pipeline; built and deployed the full backend and infrastructure solo",
        "HF Spaces inference takes 30–60s — a synchronous call would timeout; used SSE to stream real-time progress updates to the frontend throughout processing, WebSocket syncs live progress percentage between the HF pipeline and the backend",
        "ML pipeline containerized with Docker on Hugging Face Spaces; supports both CPU and GPU inference",
      ],
      tech: ["Python", "FastAPI", "WebSocket", "SSE", "SAM2", "ProPainter", "OpenCV", "Gradio", "Docker", "Hugging Face Spaces"],
      demoUrl: "https://huggingface.co/spaces/aastha-malik/video-object-remover",
      githubUrl: "https://github.com/aastha-malik/video-object-remover",
    },
    {
      id: "project-face-fusion",
      name: "Face Fusion",
      kind: "ML · Generative",
      bullets: [
        "Frame-by-frame face swap pipeline: InsightFace detects and embeds faces → inswapper_128 performs neural face swap → GFPGAN restores and sharpens output → ffmpeg merges audio and encodes final MP4",
        "ONNX Runtime for GPU-accelerated inference — ~12 frames/second on T4 GPU on HF Spaces, the practical ceiling for this hardware without batching optimizations",
        "yt-dlp integration locally for YouTube video input (non-Shorts); dropped in HF Spaces deployment due to platform network constraints — upload-only there",
        "Deployed as an interactive Gradio UI on Hugging Face Spaces with Docker — solo project, open-source reimplementation of what HeyGen and Reface do commercially",
      ],
      tech: ["Python", "InsightFace", "GFPGAN", "OpenCV", "yt-dlp", "ffmpeg", "Gradio", "ONNX Runtime", "Hugging Face Spaces"],
      demoUrl: "https://huggingface.co/spaces/aastha-malik/video-face-replace",
      githubUrl: "https://github.com/aastha-malik/video-face-replace",
    },
  ],
  dsaProfiles: [
    {
      platform: "LeetCode",
      href: "https://leetcode.com/u/aastha_malik/",
    },
  ],
  resume: {
    previewImage: "/resume-preview-v4.png",
    downloadUrl: "https://drive.google.com/file/d/1do2N7AP97TTnx6aWRvHQu4qkFG39r2Qq/view?usp=sharing",
  },
  techStack: [
    {
      id: "languages",
      label: "Languages",
      items: ["Python"],
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
      items: ["JWT", "OAuth2.0", "Google Sign-In", "bcrypt"],
    },
    {
      id: "cloud",
      label: "Cloud & Deployment",
      items: ["Render", "Vercel", "Supabase Storage", "Hugging Face Spaces"],
    },
    {
      id: "apis",
      label: "APIs & Protocols",
      items: ["REST API", "WebSocket", "SSE", "OpenStreetMap API"],
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
      items: ["SAM2", "ProPainter", "InsightFace", "GFPGAN", "ONNX Runtime", "OpenCV", "Gradio", "Machine Learning Pipelines"],
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
    headline: "Backend Developer",
    subheadline: "Always shipping something new.",
    intro:
      "I build and deploy production-grade backend systems. My projects span healthcare (Chikitsa Cloud — 35 REST API endpoints, OAuth2, QR-based family access control), productivity (Blossom — gamified task management with streaks, XP, and reward tiers), and AI/ML (Video Object Remover using Meta's SAM2 + ProPainter; Face Fusion achieving ~12fps face-swap on T4 GPU via ONNX Runtime — both deployed on Hugging Face Spaces with Docker). I work primarily in Python with FastAPI, PostgreSQL, and JWT/OAuth2 — and I'm comfortable taking a project from API design all the way to cloud deployment.",
  },
  profile: {
    name: "Aastha Malik",
    role: "Backend Developer",
    imageSrc: "/profile.jpg",
    imageAlt: "Aastha Malik",
  },
};
