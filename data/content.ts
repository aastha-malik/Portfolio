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
  description: string;
  tech: string[];
  demoUrl: string;
  githubUrl: string;
};

export type TechCategoryId =
  | "languages"
  | "backend"
  | "databases"
  | "tools"
  | "core"
  | "studying"
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
      id: "project-blossom",
      name: "Blossom",
      description:
        "A gamified task manager using FastAPI with JWT/OAuth2. Built backend-enforced gamification (points, streaks, virtual pet system) and managed task analytics.",
      tech: ["Python", "FastAPI", "PostgreSQL", "SQLAlchemy", "JWT", "OAuth2"],
      demoUrl: "https://blossom-arru.onrender.com/",
      githubUrl: "https://github.com/aastha-malik/Blossom",
    },
    {
      id: "project-chikitsa",
      name: "Chikitsa Cloud",
      description:
        "Cloud-based medical record management app. Featuring secure PDF/image uploads, a QR-based emergency family access system. (Download APK via Demo)",
      tech: ["Python", "FastAPI", "Supabase", "Flutter", "ML Integration"],
      demoUrl: "https://drive.google.com/file/d/10A-i4ca3aM3ZiWz79QTj451qiwctJ6P_/view?usp=sharing",
      githubUrl: "https://github.com/aastha-malik/ChikitsaCloud",
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
    previewImage: "/resume-preview.png",
    downloadUrl: "https://drive.google.com/file/d/1SWgH-HdU_yI6a4KM2lqHO_D972ewfebI/view?usp=sharing",
  },
  techStack: [
    {
      id: "languages",
      label: "Programming Languages",
      items: ["Python"],
    },
    {
      id: "backend",
      label: "Backend & APIs",
      items: [
        "FastAPI",
        "REST API design",
        "Authentication & Authorization (JWT, OAuth2.0)",
        "bcrypt",
      ],
    },
    {
      id: "databases",
      label: "Databases",
      items: ["SQLite", "PostgreSQL", "Supabase"],
    },
    {
      id: "tools",
      label: "Tools & Platforms",
      items: ["Git", "GitHub", "Linux (basic)", "Swagger UI"],
    },
    {
      id: "core",
      label: "Computer Science Core",
      items: ["DBMS", "OOPs", "OS"],
    },
    {
      id: "studying",
      label: "Currently Studying",
      items: ["Deployment", "Data Structure & Algorithm"],
    },
    {
      id: "client",
      label: "Client Integrations",
      items: ["React", "Typescript", "Flutter", "Dart", "Tkinter"],
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
      value: "7303102064",
      href: "tel:7303102064",
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
    headline: "Backend Engineer",
    subheadline: "Developing robust backends for modern applications.",
    intro:
      "I am a Computer Science student (B.Tech, 2024-2028) and a Backend Engineer specializing in Python and FastAPI. I build secure, scalable systems with a focus on authentication (JWT/OAuth2) and database architecture. My experience ranges from gamified task managers to cloud-based health record platforms.",
  },
  profile: {
    name: "Aastha Malik",
    role: "Backend Engineer",
    imageSrc: "/profile.jpg",
    imageAlt: "Aastha Malik",
  },
};
