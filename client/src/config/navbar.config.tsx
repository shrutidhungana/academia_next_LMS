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
    href: "/courses",
    icon: FaBook,
  },
  {
    label: "About",
    href: "/about",
    icon: FaInfoCircle,
  },

  {
    label: "Blog",
    href: "/blog",
    icon: FaBlog,
  },
  {
    label: "Features",
    href: "/features",
    icon: FaTags,
  },
  {
    label: "Contact",
    href: "/contact",
    icon: FaPhone,
  },
  {
    label: "Login",
    href: "/login",
    icon: FaUser,
    cta: true,
  },
  {
    label: "Register",
    href: "/register",
    icon: FaUserPlus,
    cta: true,
  },
];
