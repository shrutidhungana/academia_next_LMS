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

const Navbar: React.FC<NavbarProps> = ({
  navItems,
  logoTitle = "academia-next",
  logo,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-gradient-to-r from-red-950 to-rose-950 shadow-md fixed w-full z-50 ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Left: Logo + Title */}
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src={logo}
              alt="Logo"
              className="h-8 w-8"
              width={32} // Added width
              height={32} // Added height
            />
            {/* Logo Title Color: text-red-50 to match the subtle red in the background, making it glow slightly */}
            <span className="font-bold text-xl text-red-50">{logoTitle}</span>
          </Link>

          {/* Middle: Desktop nav items */}
          <div className="hidden md:flex space-x-6 items-center">
            {navItems
              ?.filter((item) => !item.cta)
              ?.map(({ label, href, icon: Icon }) => (
                <Link
                  key={label}
                  href={href}
                  // Nav Link Color: text-red-100 for a soft, luminous look
                  // Hover Color: text-emerald-300 for a vibrant, fresh contrast
                  className="flex items-center space-x-1 text-red-100 hover:text-emerald-300 transition"
                >
                  {Icon && <Icon size={16} />}
                  <span>{label}</span>
                </Link>
              ))}
          </div>

          {/* Right: CTA buttons desktop */}
          <div className="hidden md:flex space-x-3 items-center">
            {navItems
              ?.filter((item) => item.cta)
              ?.map(({ label, href, icon: Icon }) => (
                <Link
                  key={label}
                  href={href}
                  // CTA Button Background: bg-emerald-400 for a strong, energetic contrast
                  // CTA Button Text: text-red-950 to make text pop on the bright button, matching deep background tone
                  // Hover CTA Button Background: hover:bg-emerald-300 for a subtle lighten effect
                  className="flex items-center space-x-1 px-4 py-2 rounded-md text-red-950 bg-emerald-400 hover:bg-emerald-300 transition"
                >
                  {Icon && <Icon size={16} />}
                  <span>{label}</span>
                </Link>
              ))}
          </div>

          {/* Mobile menu button */}
          <button
            // Mobile Icon Color: text-red-100 for consistency, hover:text-emerald-300 for vibrancy
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
        <div className="md:hidden bg-gradient-to-r from-red-950 to-rose-950 shadow-lg border-t border-gray-200">
          <div className="flex flex-col space-y-2 px-4 py-4">
            {navItems?.map(({ label, href, cta, icon: Icon }) => (
              <Link
                key={label}
                href={href}
                className={`flex items-center justify-center space-x-1 rounded-md px-4 py-2 ${
                  cta
                    ? "bg-emerald-400 text-red-950 hover:bg-emerald-300"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {Icon && <Icon size={16} />}
                <span>{label}</span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
