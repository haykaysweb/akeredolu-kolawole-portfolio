import type { Project } from "@/types";

export const projects: Project[] = [
  {
    id: "Noir-And-Co",
    title: "NOIR & CO",
    image:
      "https://res.cloudinary.com/dw5bai7mk/image/upload/v1791929667/noir_ugbng0.png",
    description:
      "Online store for clothes, bags and watches with filtering, a persistent cart, and checkout, contact and newsletter forms validated on the server and saved to PostgreSQL.",
    longDescription:
      "A full stack e-commerce store I built to learn Next.js. Visitors can browse by category, filter by price, size and color, and share filtered pages through the URL. The cart and wishlist survive a page refresh, and the cart only stores product ids and quantities, so the server looks up the real prices at checkout. Checkout, contact and newsletter forms are validated with Zod inside Next.js Server Actions and saved to PostgreSQL through Prisma. Most of the app runs as server components, with client components only where state or click handlers are needed. Payments are not connected, so the checkout is a demo.",
    category: "Full-Stack",
    tech: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "PostgreSQL",
      "Prisma",
      "Zod",
    ],
    liveUrl: "https://noir-and-co-store.vercel.app",
    githubUrl: "https://github.com/haykaysweb/noir-and-co",
    featured: true,
  },
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
      "Agricultural storage platform connecting farmers.",
    longDescription:
      "Developed a full-stack platform featuring custom search filtering, interactive map views, and booking workflows. Handled the frontend with React and Tailwind CSS while building Node.js backend endpoints for user data and state management.",
    category: "Full-Stack",
    tech: [
      "React",
      "TypeScript",
      "TanStack Query",
      "Axios",
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
      "Task Duty is a highly efficient, task management and productivity application designed to help individuals and teams organize their daily workflows. Built with a clean, intuitive user interface, it allows users to seamlessly create, track, manage, and prioritize tasks from inception to completion. Features robust task creation, tag classification, search filtering, and state synchronization using React, TanStack Query and Tailwind CSS.",
    category: "Web App",
    tech: [
      "React",
      "Javascript",
      "TanStack Query",
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