// config.tsx
import {
  FaBook,
  FaInfoCircle,
  FaPhone,
  FaUser,
  FaUserPlus,
  FaTags,
  FaBlog,
  FaTachometerAlt,
  FaUsers,
  FaFileAlt,
  FaCog,
  FaClipboardList,
  FaSignOutAlt,
} from "react-icons/fa";
import { NavItem } from "@/types";

export const NAV_ITEMS: Record<string, NavItem[]> = {
  guest: [
    {
      label: "Courses",
      href: "/guest/courses",
      icon: FaBook,
    },
    {
      label: "About",
      href: "/guest/about",
      icon: FaInfoCircle,
    },
    {
      label: "Blog",
      href: "/guest/blog",
      icon: FaBlog,
    },
    {
      label: "Features",
      href: "/guest/features",
      icon: FaTags,
    },
    {
      label: "Contact",
      href: "/guest/contact",
      icon: FaPhone,
    },
    {
      label: "Login",
      href: "/auth/login",
      icon: FaUser,
      cta: true,
    },
    {
      label: "Register",
      href: "/auth/register",
      icon: FaUserPlus,
      cta: true,
    },
  ],
  superAdmin: [
    {
      label: "Dashboard",
      href: "/super-admin/dashboard",
      icon: FaTachometerAlt,
    },
    { label: "Tenants", href: "/super-admin/tenants", icon: FaUsers },
    { label: "Users", href: "/super-admin/users", icon: FaUsers },
    { label: "Courses", href: "/super-admin/courses", icon: FaBook },
    { label: "Reports", href: "/super-admin/reports", icon: FaFileAlt },
    { label: "Settings", href: "/super-admin/settings", icon: FaCog },
    { label: "Logs", href: "/super-admin/logs", icon: FaClipboardList },
    { label: "Logout", icon: FaSignOutAlt, cta: true, action: "logout" },// ✅ action instead of href
  ],
};
