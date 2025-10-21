"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { HiMenu, HiX } from "react-icons/hi";
import { NavItem } from "@/types";
import { NAV_ITEMS } from "@/config/navbar.config";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { NAV_ROLE_MAP } from "@/config/role.config";

type NavbarProps = {
  logoTitle?: string;
  logo: string;
};

const navItemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.3 },
  }),
};

const Navbar: React.FC<NavbarProps> = ({
  logoTitle = "academia-next",
  logo,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Get user role from Redux
  const userRole = useSelector(
    (state: RootState) => state.auth.user?.data?.roles?.[0]
  );

  // Normalize role for NAV_ITEMS
 
  
  const navItems: NavItem[] = useMemo(() => {
    const roleKey = userRole ? NAV_ROLE_MAP[userRole] || "guest" : "guest";
    return NAV_ITEMS[roleKey];
  }, [userRole]);

  console.log({navItems, userRole})



  return (
    <nav className="fixed w-full z-50 bg-gradient-to-r from-pink-700 via-purple-700 to-indigo-800 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-3">
            <Image
              src={logo}
              alt="Logo"
              width={36}
              height={36}
              className="rounded-full border-2 border-white shadow-md"
            />
            <motion.span
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ type: "spring", stiffness: 120 }}
              className="font-extrabold text-xl md:text-2xl bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 via-red-300 to-pink-300"
            >
              {logoTitle}
            </motion.span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems
              ?.filter((item) => !item.cta)
              ?.map(({ label, href, icon: Icon }, i) => (
                <motion.div
                  key={label}
                  custom={i}
                  initial="hidden"
                  animate="visible"
                  variants={navItemVariants}
                >
                  <Link
                    href={href}
                    className="flex items-center space-x-1 text-white hover:text-yellow-300 hover:scale-105 transition-transform duration-200 font-semibold"
                  >
                    {Icon && <Icon size={18} />}
                    <span>{label}</span>
                  </Link>
                </motion.div>
              ))}
          </div>

          {/* CTA buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {navItems
              ?.filter((item) => item.cta)
              ?.map(({ label, href, icon: Icon }) => (
                <Link
                  key={label}
                  href={href}
                  className="flex items-center space-x-1 px-5 py-2 rounded-lg bg-gradient-to-r from-green-400 to-teal-400 text-white font-semibold shadow-md hover:scale-105 hover:from-green-300 hover:to-teal-300 transition-all duration-200"
                >
                  {Icon && <Icon size={18} />}
                  <span>{label}</span>
                </Link>
              ))}
          </div>

          {/* Mobile menu toggle */}
          <button
            className="md:hidden text-white hover:text-yellow-300 focus:outline-none"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open menu"
          >
            <HiMenu size={30} />
          </button>
        </div>
      </div>

      {/* Slide Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.8 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black z-40"
              onClick={() => setMobileMenuOpen(false)}
            />

            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="fixed top-0 right-0 w-3/4 sm:w-2/5 h-full bg-gradient-to-b from-purple-800 via-indigo-800 to-gray-900 text-white shadow-2xl z-50 flex flex-col"
            >
              <div className="flex justify-between items-center px-5 py-4 border-b border-white/10">
                <h2 className="text-lg font-semibold tracking-wide">Menu</h2>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  aria-label="Close menu"
                  className="text-white hover:text-yellow-300"
                >
                  <HiX size={28} />
                </button>
              </div>

              <div className="flex flex-col space-y-2 mt-4 px-5">
                {navItems.map(({ label, href, cta, icon: Icon }) => (
                  <Link
                    key={label}
                    href={href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center space-x-3 rounded-md px-4 py-3 text-base font-medium transition-all ${
                      cta
                        ? "bg-gradient-to-r from-green-400 to-teal-400 text-gray-900 font-semibold hover:scale-105"
                        : "hover:bg-white/10"
                    }`}
                  >
                    {Icon && <Icon size={20} />}
                    <span>{label}</span>
                  </Link>
                ))}
              </div>

              <div className="mt-auto px-5 py-4 text-sm text-gray-400 border-t border-white/10">
                <p>© {new Date().getFullYear()} Academia Next</p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
