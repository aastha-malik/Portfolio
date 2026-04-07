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
      bullets: [
        "35 REST API endpoints across 7 routes: Auth, Users, Medical Records, Medical Analysis, Family Access, Hospital Search, and Feedback",
        "OAuth2 with Google Sign-In, JWT token management, UUID-based multi-user data modeling",
        "Family access control via QR code scanning and email invitations",
        "OpenStreetMap API integration for hospital discovery; health metrics validation engine (BMI, vitals)",
        "Deployed MVP on Render with PostgreSQL and Supabase cloud storage for enhanced data encryption and security",
      ],
      tech: ["Python", "FastAPI", "PostgreSQL", "Supabase", "JWT", "OAuth2", "Render"],
      demoUrl: "https://drive.google.com/file/d/10A-i4ca3aM3ZiWz79QTj451qiwctJ6P_/view?usp=sharing",
      githubUrl: "https://github.com/aastha-malik/ChikitsaCloud",
    },
    {
      id: "project-blossom",
      name: "Blossom",
      bullets: [
        "20+ REST API endpoints supporting task CRUD, streaks, XP/points, rewards, user analytics, and team management",
        "Gamification logic: streak tracking, inactivity penalties, and reward tier progression with backend-enforced rules",
        "Multi-method auth: Google OAuth2, standard JWT, and OTP-based password reset",
        "End-to-end solo project from API design to cloud deployment on Render with PostgreSQL",
      ],
      tech: ["Python", "FastAPI", "PostgreSQL", "JWT", "OAuth2", "Render"],
      demoUrl: "https://blossom-arru.onrender.com/",
      githubUrl: "https://github.com/aastha-malik/Blossom",
    },
    {
      id: "project-video-object-remover",
      name: "Video Object Remover",
      bullets: [
        "End-to-end CV pipeline: click on object → SAM2 segments & tracks across all frames → ProPainter inpaints removed regions → ffmpeg encodes final video",
        "3-tier architecture: Next.js frontend → FastAPI backend with native WebSocket for real-time progress → Hugging Face ML pipeline polled via SSE",
        "Meta's SAM2 for click-based multi-object segmentation and frame-by-frame tracking",
        "Containerized and deployed ML pipeline on Hugging Face Spaces using Docker; supports CPU and GPU inference",
      ],
      tech: ["Python", "FastAPI", "WebSocket", "SSE", "SAM2", "ProPainter", "OpenCV", "Gradio", "Docker", "Hugging Face Spaces"],
      demoUrl: "https://huggingface.co/spaces/aastha-malik/video-object-remover",
      githubUrl: "https://github.com/aastha-malik/video-object-remover",
    },
    {
      id: "project-face-fusion",
      name: "Face Fusion",
      bullets: [
        "End-to-end face-swap ML pipeline: source photo + YouTube URL (or upload) → InsightFace detects & embeds faces per frame → inswapper_128 performs neural face swap → GFPGAN restores & sharpens output → ffmpeg merges audio and encodes final MP4",
        "Integrated yt-dlp for YouTube video download (non-shorts) locally; Hugging Face Spaces deployment supports video upload only due to platform constraints",
        "~12 frames/second on T4 GPU using ONNX Runtime GPU-accelerated inference; deployed interactive Gradio UI on Hugging Face Spaces",
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
    {
      platform: "NeetCode",
      href: "https://neetcode.io/profile",
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
