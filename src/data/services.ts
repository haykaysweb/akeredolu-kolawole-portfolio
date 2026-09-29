import { CodeXml, Database, Gauge, Monitor, PenTool } from 'lucide-react';
import type { Service } from '@/types';

export const services: Service[] = [
  {
    id: 'fullstack',
    title: 'Full-Stack Web Development',
    description:
      'End-to-end web applications from database architecture to deployment, built with React, Node.js, Express, and MongoDB.',
    icon: CodeXml,
    features: [
      'Full-stack architecture and feature implementation',
      'Secure authentication and session management',
      'RESTful API development and database connectivity',
      'Production deployment and integration setup',
    ],
  },
  {
    id: 'frontend',
    title: 'Frontend & UI Development',
    description:
      'Fast, accessible, and responsive user interfaces built with React, TypeScript, Tailwind CSS, and smooth Framer Motion animations.',
    icon: Monitor,
    features: [
      'Responsive design across all devices',
      'Dynamic component development with React and TypeScript',
      'Fluid UI animations using Framer Motion',
      'State management with TanStack Query and Context API',
    ],
  },
  {
    id: 'api-design',
    title: 'API & Database Design',
    description:
      'Robust, well-documented backend services and efficient database schemas built with Node.js, Express.js, and MongoDB/Mongoose.',
    icon: Database,
    features: [
      'RESTful API design and route handling',
      'Optimized MongoDB schema design and indexing',
      'JWT authentication and security middleware',
      'CORS configuration and error handling',
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
      'Auditing and refining web applications for lightning-fast load times, clean code maintainability, and optimal user experience.',
    icon: Gauge,
    features: [
      'Codebase refactoring and clean code standards',
      'Asynchronous data fetching and state optimization',
      'Bug fixing and cross-browser testing',
      'Version control management with Git workflows',
    ],
  },
];