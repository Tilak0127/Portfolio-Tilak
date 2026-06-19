export interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  period: string;
  grade: string;
  details?: string;
}

export interface SkillGroup {
  category: string;
  skills: { name: string; level: number }[]; // level in percentage (e.g., 90)
}

export interface ProjectItem {
  id: string;
  title: string;
  tagline: string;
  description: string;
  features: string[];
  techStack: string[];
  category: string;
  links?: {
    github?: string;
    demo?: string;
  };
  thumbnail?: string;
  isLive?: boolean;
  keyDetails?: string;
  architecture?: string;
}

export interface CertificationItem {
  id: string;
  title: string;
  issuer: string;
  date?: string;
  previewUrl: string; // Placeholder or template representation
  verifyUrl: string;
}

export interface AchievementItem {
  id: string;
  title: string;
  description: string;
  iconName: string;
}

export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}
