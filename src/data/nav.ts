import {
  Briefcase,
  FolderGit2,
  Layers,
  LayoutDashboard,
  Mail,
  // MessageSquare,
  Settings,
  Sparkles,
  User,
  Wrench,
} from "lucide-react";
import type { NavItem } from "@/types";

export const navItems: NavItem[] = [
  { id: "overview", label: "Overview", icon: LayoutDashboard, path: "/" },
  { id: "about", label: "About", icon: User, path: "/about" },
  { id: "skills", label: "Skills", icon: Sparkles, path: "/skills" },
  { id: "tech-stack", label: "Tech Stack", icon: Layers, path: "/tech-stack" },
  { id: "projects", label: "Projects", icon: FolderGit2, path: "/projects" },
  {
    id: "experience",
    label: "Experience",
    icon: Briefcase,
    path: "/experience",
  },
  { id: "services", label: "Services", icon: Wrench, path: "/services" },
  // { id: 'testimonials', label: 'Testimonials', icon: MessageSquare, path: '/testimonials' },
  { id: "contact", label: "Contact", icon: Mail, path: "/contact" },
  { id: "settings", label: "Settings", icon: Settings, path: "/settings" },
];
