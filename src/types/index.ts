import type { LucideIcon } from 'lucide-react';
import type { IconType } from 'react-icons';

export type SkillCategory = 'Frontend' | 'Backend' | 'Database' | 'Tools & Design';
export type ProjectCategory = 'Web App' | 'Full-Stack' | 'UI Design';

export interface Skill {
  id: string;
  name: string;
  category: SkillCategory;
  proficiency: number;
  icon: IconType;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  category: ProjectCategory;
  tech: string[];
  image?: string;
  liveUrl: string;
  githubUrl: string;
  featured: boolean;
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  startDate: string;
  endDate: string;
  description: string;
  achievements: string[];
  type: 'work' | 'education';
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  features: string[];
}

export interface Stat {
  id: string;
  label: string;
  value: number;
  suffix: string;
  icon: LucideIcon;
}

export interface NavItem {
  id: string;
  label: string;
  icon: LucideIcon;
  path: string;
}

export interface PersonalInfo {
  name: string;
  title: string;
  bio: string;
  longBio: string;
  location: string;
  email: string;
  phone: string;
  languages: string[];
  interests: string[];
  social: {
    github: string;
    linkedin: string;
    whatsapp: string;
  };
  availability: string;
  resumeUrl: string;
  resumeFileName: string;
  stats: Stat[];
  activityData: { year: string; projects: number }[];
  skillRadarData: { category: string; proficiency: number }[];
}

export interface Settings {
  theme: 'dark' | 'light';
  accentColor: string;
  glowEnabled: boolean;
  reduceAnimations: boolean;
  sidebarCollapsed: boolean;
  fontSize: 'sm' | 'md' | 'lg';
}

export interface SearchResult {
  id: string;
  title: string;
  type: 'page' | 'skill' | 'project';
  path: string;
}