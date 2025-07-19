"use client"

import React, { useState } from "react";
import Link from "next/link";
import { NavItem } from "@/types";
import { HiMenu, HiX } from "react-icons/hi";
import Image from "next/image";
import { motion } from "framer-motion";

type NavbarProps = {
  navItems: NavItem[];
  logoTitle?: string;
  logo: string;
};

const navItemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.4,
    },
  }),
};

const Navbar: React.FC<NavbarProps> = ({
  navItems,
  logoTitle = "academia-next",
  logo,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-gradient-to-r from-red-950 to-rose-950 shadow-md fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo + Title with animation */}
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src={logo}
              alt="Logo"
              className="h-8 w-8 animate-flower"
              width={32}
              height={32}
            />
            <motion.span
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ type: "spring", stiffness: 100 }}
              className="font-bold text-xl text-red-50"
            >
              {logoTitle}
            </motion.span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex space-x-6 items-center">
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
                    className="flex items-center space-x-1 text-red-100 hover:text-emerald-300 transition"
                  >
                    {Icon && <Icon size={16} />}
                    <span>{label}</span>
                  </Link>
                </motion.div>
              ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex space-x-3 items-center">
            {navItems
              ?.filter((item) => item.cta)
              ?.map(({ label, href, icon: Icon }) => (
                <Link
                  key={label}
                  href={href}
                  className="flex items-center space-x-1 px-4 py-2 rounded-md text-red-950 bg-emerald-400 hover:bg-emerald-300 transition hover:animate-wheel"
                >
                  {Icon && <Icon size={16} />}
                  <span>{label}</span>
                </Link>
              ))}
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden text-red-100 hover:text-emerald-300 focus:outline-none"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <HiX size={28} /> : <HiMenu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="md:hidden bg-gradient-to-r from-red-950 to-rose-950 shadow-lg border-t border-gray-200"
        >
          <div className="flex flex-col space-y-2 px-4 py-4">
            {navItems?.map(({ label, href, cta, icon: Icon }) => (
              <Link
                key={label}
                href={href}
                className={`flex items-center justify-center space-x-1 rounded-md px-4 py-2 ${
                  cta
                    ? "bg-emerald-400 text-red-950 hover:bg-emerald-300"
                    : "text-gray-300 hover:bg-gray-100"
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {Icon && <Icon size={16} />}
                <span>{label}</span>
              </Link>
            ))}
          </div>
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;
