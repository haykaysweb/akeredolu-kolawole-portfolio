import type { Project } from "@/types";

export const projects: Project[] = [
  {
    id: "MilesCar-Rentals",
    title: "Miles Car Rental",
    image:
      "https://res.cloudinary.com/dw5bai7mk/image/upload/v1781555198/Screenshot_2026-06-15_092434_isayxe.png",
    description:
      "Full stack vehicle reservation and fleet management platform with user search, booking flows, and an admin dashboard.",
    longDescription:
      "A comprehensive car rental and fleet management web application built during my internship at Tech Studio Academy. Features an intuitive vehicle catalog with advanced search filters, model specifications, dynamic reservation workflows, and a dedicated admin dashboard for fleet and booking management. Built with a responsive React, TypeScript, and Tailwind CSS frontend integrated seamlessly with backend REST APIs.",
    category: "Full-Stack",
    tech: ["React", "TypeScript", "Node.js", "Express", "MongoDB", "Tailwind"],
    liveUrl: "https://milescar-rental.vercel.app/",
    githubUrl: "https://github.com/Chrischuka13/miles-car-rental-frontend",
    featured: true,
  },
  {
    id: "Laundry-Wash",
    title: "Laundry Wash Platform",
    image:
      "https://res.cloudinary.com/dw5bai7mk/image/upload/v1781528825/Screenshot_2026-06-15_020446_cbyh2r.png",
    description:
      "On demand laundry service platform with automated cleaning reservations, order tracking, and an admin management dashboard.",
    longDescription:
      "A full stack web application designed for automated cleaning reservations and logistics tracking. Features an intuitive booking system for users to schedule laundry services, secure authentication flows, and a dedicated admin dashboard to manage service requests, user bookings, and order tracking. Built from the ground up using React, Tailwind CSS, Javascript, Node.js, Express.js, and MongoDB with Mongoose.",
    category: "Full-Stack",
    tech: [
      "React",
      "Javascript",
      "MongoDb",
      "Tailwind",
      "Node.js",
      "Express.js",
    ],
    liveUrl: "https://laundry-wash-client-two.vercel.app/",
    githubUrl: "https://github.com/haykaysweb/LAUNDRY-WASH",
    featured: true,
  },
  {
    id: "Agroo-Keep",
    title: "Agro Keep",
    image:
      "https://res.cloudinary.com/dw5bai7mk/image/upload/v1786973444/Screenshot_2026-08-17_063004_ibrjqv.jpg",
    description:
      "Agricultural storage platform connecting farmers with verified storage hubs featuring location filters and interactive booking wizards.",
    longDescription:
      "An ongoing full stack agricultural storage platform designed to connect farmers with verified storage hubs in Southwest Nigeria. It features location and crop filters, interactive maps, storage hub reservation summary modals, responsive tables, multi step booking wizards, and user profile management. Built with smooth, animated web interfaces powered by Framer Motion, alongside a robust React and Node.js backend.",
    category: "Full-Stack",
    tech: [
      "React",
      "TypeScript",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Tailwind CSS",
      "Framer Motion",
    ],
    liveUrl: "#",
    githubUrl: "#",
    featured: true,
  },
  {
    id: "Task-Duty",
    title: "Task Duty",
    image:
      "https://res.cloudinary.com/dw5bai7mk/image/upload/v1781557869/Screenshot_2026-06-15_101059_dlymnj.png",
    description:
      "A feature rich task management and productivity application designed to help organize daily workflows and prioritize tasks.",
    longDescription:
      "Task Duty is a highly efficient, task management and productivity application designed to help individuals and teams organize their daily workflows. Built with a clean, intuitive user interface, it allows users to seamlessly create, track, manage, and prioritize tasks from inception to completion. Features robust task creation, tag classification, search filtering, and state synchronization using React and Tailwind CSS.",
    category: "Web App",
    tech: [
      "React",
      "Javascript",
      "MongoDb",
      "Tailwind",
      "Node.js",
      "Express.js",
    ],
    liveUrl: "https://task-duty-seven.vercel.app/",
    githubUrl: "https://github.com/haykaysweb/TASK-DUTY",
    featured: false,
  },
];
