import { CodeXml, Database, Gauge, Monitor, PenTool } from 'lucide-react';
import type { Service } from '@/types';

export const services: Service[] = [
  {
    id: 'fullstack',
    title: 'Full-Stack Web Development',
    description:
      'End-to-end web applications from database architecture to deployment, built with React, Next.js, Node.js, Express, and MongoDB or PostgreSQL.',
    icon: CodeXml,
    features: [
      'Full-stack architecture and feature implementation',
      'Secure authentication and session management',
      'RESTful API development and database connectivity',
      'Production deployment on Vercel with environment and database setup',
    ],
  },
  {
    id: 'frontend',
    title: 'Frontend & UI Development',
    description:
      'Fast, accessible, and responsive user interfaces built with React, Next.js, TypeScript, Tailwind CSS, and smooth Framer Motion animations.',
    icon: Monitor,
    features: [
      'Responsive design across all devices',
      'Dynamic component development with React, Next.js and TypeScript',
      'Fluid UI animations using Framer Motion',
      'State management with TanStack Query and Context API',
    ],
  },
  {
    id: 'api-design',
    title: 'API & Database Design',
    description:
      'Robust backend services and efficient database schemas built with Node.js, Express.js, MongoDB/Mongoose, and PostgreSQL with Prisma.',
    icon: Database,
    features: [
      'RESTful API design and route handling',
      'MongoDB schema design and relational PostgreSQL tables with Prisma',
      'Server-side validation with Zod, including Next.js Server Actions',
      'JWT authentication, CORS configuration and error handling',
    ],
  },
  {
    id: 'figma-to-code',
    title: 'Figma-to-Code Conversion',
    description:
      'Pixel-perfect, production-ready code translated directly from your Figma designs, maintaining exact styling and responsive behavior.',
    icon: PenTool,
    features: [
      'Precise translation of typography, spacing, and layouts',
      'Reusable and modular component structures',
      'Tailwind CSS styling and custom design system integration',
      'Cross-browser compatibility and responsiveness',
    ],
  },
  {
    id: 'performance',
    title: 'Performance & Optimization',
    description:
      'Auditing and refining web applications for fast load times, clean code maintainability, and a smooth user experience.',
    icon: Gauge,
    features: [
      'Codebase refactoring and clean code standards',
      'Server components and image optimization with Next.js',
      'Asynchronous data fetching and state optimization',
      'Bug fixing, cross-browser testing and Git workflows',
    ],
  },
];