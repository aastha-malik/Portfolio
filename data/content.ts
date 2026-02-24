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
  | "frameworks"
  | "databases"
  | "tools";

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
    platform: "LeetCode" | "NeetCode";
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
      id: "project-1",
      name: "Distributed Job Orchestrator",
      description:
        "Backend service for scheduling and monitoring long-running data jobs with retry semantics and observability hooks.",
      tech: ["TypeScript", "Node.js", "PostgreSQL", "Redis", "Docker"],
      demoUrl: "#",
      githubUrl: "#",
    },
    {
      id: "project-2",
      name: "API Platform for Internal Tools",
      description:
        "Unified API gateway exposing internal services with authentication, rate limiting, and metrics-first design.",
      tech: ["Go", "gRPC", "Kubernetes", "Prometheus"],
      demoUrl: "#",
      githubUrl: "#",
    },
  ],
  dsaProfiles: [
    {
      platform: "LeetCode",
      href: "#",
    },
    {
      platform: "NeetCode",
      href: "#",
    },
  ],
  resume: {
    previewImage: "/resume-preview.png",
    downloadUrl: "#",
  },
  techStack: [
    {
      id: "languages",
      label: "Languages",
      items: ["TypeScript", "Go", "Python", "SQL"],
    },
    {
      id: "frameworks",
      label: "Frameworks",
      items: ["Next.js", "Node.js", "Express", "FastAPI"],
    },
    {
      id: "databases",
      label: "Databases",
      items: ["PostgreSQL", "MongoDB", "Redis"],
    },
    {
      id: "tools",
      label: "Tools",
      items: ["Docker", "Kubernetes", "GitHub Actions", "Grafana"],
    },
  ],
  contact: [
    {
      id: "email",
      label: "Email",
      value: "you@example.com",
      href: "mailto:you@example.com",
    },
    {
      id: "github",
      label: "GitHub",
      value: "@your-github",
      href: "https://github.com/your-github",
    },
    {
      id: "linkedin",
      label: "LinkedIn",
      value: "your-linkedin",
      href: "https://linkedin.com/in/your-linkedin",
    },
  ],
  basicInfo: {
    headline: "Backend Engineer",
    subheadline: "Designing reliable systems with clear boundaries.",
    intro:
      "I build backend systems that prioritize correctness, observability, and pragmatic performance. I enjoy designing APIs, data models, and infrastructure that teams can rely on.",
  },
  profile: {
    name: "Your Name",
    role: "Backend Engineer",
    imageSrc: "/profile.jpg",
    imageAlt: "Portrait of a backend engineer",
  },
};

