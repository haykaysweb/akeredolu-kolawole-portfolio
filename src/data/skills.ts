import {
  FaCode,
  FaCss3Alt,
  FaDatabase,
  FaFigma,
  FaGithub,
  FaHtml5,
  FaJs,
  FaNodeJs,
  FaReact,
} from 'react-icons/fa6';
import {
  SiExpress,
  SiFramer,
  SiJsonwebtokens,
  SiMongodb,
  SiPostman,
  SiTailwindcss,
  SiTypescript,
  SiVite,
} from 'react-icons/si';
import { VscVscode } from 'react-icons/vsc';
import type { Skill, SkillCategory } from '@/types';

export const skills: Skill[] = [
  { id: 'react', name: 'React', category: 'Frontend', proficiency: 95, icon: FaReact },
  { id: 'typescript', name: 'TypeScript', category: 'Frontend', proficiency: 90, icon: SiTypescript },
  { id: 'javascript', name: 'JavaScript', category: 'Frontend', proficiency: 92, icon: FaJs },
  { id: 'html', name: 'HTML5', category: 'Frontend', proficiency: 95, icon: FaHtml5 },
  { id: 'css', name: 'CSS3', category: 'Frontend', proficiency: 93, icon: FaCss3Alt },
  { id: 'tailwind', name: 'Tailwind CSS', category: 'Frontend', proficiency: 90, icon: SiTailwindcss },
  { id: 'framer-motion', name: 'Framer Motion', category: 'Frontend', proficiency: 82, icon: SiFramer },
  { id: 'vite', name: 'Vite', category: 'Frontend', proficiency: 85, icon: SiVite },
  { id: 'nodejs', name: 'Node.js', category: 'Backend', proficiency: 88, icon: FaNodeJs },
  { id: 'express', name: 'Express.js', category: 'Backend', proficiency: 87, icon: SiExpress },
  { id: 'rest-api', name: 'REST APIs', category: 'Backend', proficiency: 90, icon: FaCode },
  { id: 'jwt', name: 'JWT Auth', category: 'Backend', proficiency: 82, icon: SiJsonwebtokens },
  { id: 'mongodb', name: 'MongoDB', category: 'Database', proficiency: 86, icon: SiMongodb },
  { id: 'mongoose', name: 'Mongoose', category: 'Database', proficiency: 84, icon: FaDatabase },
  { id: 'git', name: 'Git & GitHub', category: 'Tools & Design', proficiency: 90, icon: FaGithub },
  { id: 'figma', name: 'Figma', category: 'Tools & Design', proficiency: 82, icon: FaFigma },
  { id: 'vscode', name: 'VS Code', category: 'Tools & Design', proficiency: 95, icon: VscVscode },
  { id: 'postman', name: 'Postman', category: 'Tools & Design', proficiency: 85, icon: SiPostman },
];

export const skillCategories: SkillCategory[] = ['Frontend', 'Backend', 'Database', 'Tools & Design'];