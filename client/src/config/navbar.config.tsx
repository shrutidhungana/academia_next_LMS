import { NavItem } from "@/types";
import {
 
  FaBook,
  FaInfoCircle,
  FaPhone,
  FaUser,
  FaUserPlus,
  FaTags,

  FaBlog,
} from "react-icons/fa";


export const NAV_ITEMS: NavItem[] = [
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
];
