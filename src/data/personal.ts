import { Calendar, Cpu, FolderGit2 } from "lucide-react";
import type { PersonalInfo } from "@/types";

export const personal: PersonalInfo = {
  name: "Akeredolu Kolawole O.",
  title: "Full-Stack Web Developer",
  bio: "Full stack web developer with 2+ years of hands-on experience designing, developing, and maintaining modern, data-driven web applications using JavaScript, TypeScript, React, Node.js, Express.js, and MongoDB.",
  longBio:
    "I am a full stack web developer with over two years of practical experience designing, developing, and maintaining modern web applications. My technical journey includes building robust, end to end platforms like the Laundry Wash service app and Task Duty, as well as collaborating with engineering teams on projects like the Miles Car Rental platform during my internship at Tech Studio Academy. I specialize in bridging frontend and backend systems writing clean JavaScript and TypeScript logic, building responsive interfaces with React, Tailwind CSS, DaisyUI, and Framer Motion, and structuring reliable RESTful APIs with Node.js, Express.js, and Mongoose for MongoDB under the hood. Driven by a commitment to component-based architecture, database management with Mongoose, version control with Git/GitHub, and modern UI practices, I focus on delivering scalable, high-performance applications that provide seamless user experiences.",
  location: "Lagos, Nigeria",
  email: "Akeredolukolawoleolaoluwa100@gmail.com",
  phone: "+234 070 6154 3959",
  languages: ["English"],
  interests: ["Open Source", "UI/UX Design", "Building Products"],
  social: {
    github: "https://github.com/haykaysweb",
    linkedin: "https://linkedin.com/in/akeredolu-kolawole-7a18643b7",
    whatsapp: "https://wa.me/2347061543959",
  },
  availability: "Available for work",
  resumeUrl: "/Akeredolu_Kolawole_Cv.pdf",
  resumeFileName: "Akeredolu_Kolawole_Resume.pdf",
  stats: [
    {
      id: "projects",
      label: "Projects Completed",
      value: 12,
      suffix: "+",
      icon: FolderGit2,
    },
    {
      id: "experience",
      label: "Years of Experience",
      value: 2,
      suffix: "+",
      icon: Calendar,
    },
    {
      id: "technologies",
      label: "Technologies",
      value: 10,
      suffix: "+",
      icon: Cpu,
    },
  ],
  activityData: [
    { year: "2021", projects: 1 },
    { year: "2024", projects: 1 },
    { year: "2025", projects: 1 },
    { year: "2026", projects: 3 },
  ],
  skillRadarData: [
    { category: "Frontend", proficiency: 98 },
    { category: "Backend", proficiency: 85 },
    { category: "Database", proficiency: 80 },
    { category: "Design", proficiency: 98 },
    { category: "Tools", proficiency: 90 },
  ],
};
