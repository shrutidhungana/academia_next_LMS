// src/config/about.config.ts
import { AboutCard } from "@/types";
import {
  FaBookOpen,
  FaChalkboardTeacher,
  FaUsersCog,
  FaChartLine,
  FaLaptopCode,
  FaShieldAlt,
} from "react-icons/fa";

export const ABOUT_CARDS: AboutCard[] = [
  {
    icon: <FaBookOpen />,
    title: "Unified Learning Experience",
    description:
      "All your courses, assignments, exams, and progress are managed in one streamlined platform for seamless learning.",
  },
  {
    icon: <FaChalkboardTeacher />,
    title: "Empowering Educators",
    description:
      "Instructors can create interactive content, monitor student growth, and personalize teaching experiences effortlessly.",
  },
  {
    icon: <FaUsersCog />,
    title: "Role-Based Access",
    description:
      "With Super Admin, Admin, Instructor, Student, and Parent roles, each user gets the right tools and permissions to succeed.",
  },
  {
    icon: <FaChartLine />,
    title: "Insightful Analytics",
    description:
      "Visualize progress, engagement, and performance data with detailed dashboards powered by advanced analytics.",
  },
  {
    icon: <FaLaptopCode />,
    title: "Modern Technology Stack",
    description:
      "Built with Next.js, Node.js, and PostgreSQL—ensuring speed, scalability, and a modern learning experience.",
  },
  {
    icon: <FaShieldAlt />,
    title: "Secure & Reliable",
    description:
      "Protected with multi-factor authentication, JWT tokens, and role-based control to ensure data security and integrity.",
  },
];
