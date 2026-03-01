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
  | "auth"
  | "cloud"
  | "apis"
  | "tools"
  | "core"
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
      description:
        "A full-stack healthcare records management platform with 35 REST API endpoints across 7 routes: Auth, Users, Medical Records, Medical Analysis, Family Access, Hospital Search, and Feedback. Features OAuth2 with Google Sign-In, JWT token management, UUID-based multi-user data modeling, family access control via QR code scanning and email invitations, OpenStreetMap API integration for hospital discovery, and health metrics validation engine. Deployed on Render with PostgreSQL and Supabase cloud storage.",
      tech: ["Python", "FastAPI", "PostgreSQL", "Supabase", "JWT", "OAuth2", "Render"],
      demoUrl: "https://drive.google.com/file/d/10A-i4ca3aM3ZiWz79QTj451qiwctJ6P_/view?usp=sharing",
      githubUrl: "https://github.com/aastha-malik/ChikitsaCloud",
    },
    {
      id: "project-blossom",
      name: "Blossom",
      description:
        "A gamified task management platform with 20+ REST API endpoints supporting task CRUD, streaks, XP/points, rewards, user analytics, and team management. Engineered gamification logic including streak tracking, inactivity penalties, and reward tier progression with backend-enforced rules. Implemented multi-method authentication: Google OAuth2, standard JWT auth, and OTP-based password reset. First full-stack project demonstrating end-to-end system design and cloud deployment.",
      tech: ["Python", "FastAPI", "PostgreSQL", "JWT", "OAuth2", "Render"],
      demoUrl: "https://blossom-arru.onrender.com/",
      githubUrl: "https://github.com/aastha-malik/Blossom",
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
      items: ["Render", "Vercel", "Supabase Storage", "AWS S3"],
    },
    {
      id: "apis",
      label: "APIs",
      items: ["REST API", "OpenStreetMap API"],
    },
    {
      id: "tools",
      label: "Developer Tools",
      items: ["Git", "GitHub", "Postman", "VS Code", "Swagger UI", "Linux"],
    },
    {
      id: "core",
      label: "CS Core",
      items: ["DBMS", "OOPs", "Operating Systems", "Computer Networks", "HTTP/HTTPS"],
    },
    {
      id: "client",
      label: "Client Integrations",
      items: ["React", "TypeScript", "Flutter", "Dart", "Tkinter"],
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
    subheadline:
      "Passionate about solving real-world problems through clean, efficient code and continuously expanding expertise to work on production-grade, scalable products.",
    intro:
      "Backend developer with hands-on experience building and deploying healthcare and productivity applications. Proficient in Python, FastAPI, PostgreSQL, JWT/OAuth2, and cloud deployment on Render. Fast learner with a growth mindset, actively deep diving into backend development to design secure, scalable REST APIs.",
  },
  profile: {
    name: "Aastha Malik",
    role: "Backend Developer",
    imageSrc: "/profile.jpg",
    imageAlt: "Aastha Malik",
  },
};
