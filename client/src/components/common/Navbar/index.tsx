"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { HiMenu, HiX } from "react-icons/hi";
import { NavItem } from "@/types";
import { NAV_ITEMS } from "@/config/navbar.config";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store/store";
import { NAV_ROLE_MAP } from "@/config/role.config";

import useAuth from "@/hooks/authHooks/useAuth";
import { clearAuth } from "@/store/auth-slice";
import { useRouter } from "next/router";
import { WarningModal } from "../Modals";

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
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);

  const dispatch = useDispatch();
  const router = useRouter();
  const { logoutMutation } = useAuth();

  const userRole = useSelector(
    (state: RootState) => state.auth.user?.data?.roles?.[0]
  );

  const navItems: NavItem[] = useMemo(() => {
    const roleKey = userRole ? NAV_ROLE_MAP[userRole] || "guest" : "guest";
    return NAV_ITEMS[roleKey];
  }, [userRole]);

  const handleNavItemClick = (item: NavItem) => {
    if (item.action === "logout") {
      setLogoutModalOpen(true);
      return;
    }
    if (item.href) {
      router.push(item.href);
      setMobileMenuOpen(false);
    }
  };

  const handleLogoutConfirm = async () => {
    try {
      await logoutMutation.mutateAsync();
      dispatch(clearAuth());
      localStorage.removeItem("user");
      localStorage.removeItem("accessToken");
      setLogoutModalOpen(false);
      router.push("/auth/login");
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  const handleCancel = () => {
    setLogoutModalOpen(false);
  }

  return (
    <>
      <nav className="fixed w-full z-50 bg-gradient-to-r from-pink-700 via-purple-700 to-indigo-800 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
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
                ?.map((item, i) => (
                  <motion.button
                    key={item.label}
                    custom={i}
                    initial="hidden"
                    animate="visible"
                    variants={navItemVariants}
                    onClick={() => handleNavItemClick(item)}
                    className="flex items-center space-x-1 text-white hover:text-yellow-300 hover:scale-105 transition-transform duration-200 font-semibold"
                  >
                    {item.icon && <item.icon size={18} />}
                    <span>{item.label}</span>
                  </motion.button>
                ))}
            </div>

            {/* CTA buttons */}
            <div className="hidden md:flex items-center space-x-4">
              {navItems
                ?.filter((item) => item.cta)
                ?.map((item) => (
                  <button
                    key={item.label}
                    onClick={() => handleNavItemClick(item)}
                    className="flex items-center space-x-1 px-5 py-2 rounded-lg bg-gradient-to-r from-green-400 to-teal-400 text-white font-semibold shadow-md hover:scale-105 hover:from-green-300 hover:to-teal-300 transition-all duration-200"
                  >
                    {item.icon && <item.icon size={18} />}
                    <span>{item.label}</span>
                  </button>
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
                  {navItems.map((item) => (
                    <button
                      key={item.label}
                      onClick={() => handleNavItemClick(item)}
                      className={`flex items-center space-x-3 rounded-md px-4 py-3 text-base font-medium transition-all ${
                        item.cta
                          ? "bg-gradient-to-r from-green-400 to-teal-400 text-gray-900 font-semibold hover:scale-105"
                          : "hover:bg-white/10"
                      }`}
                    >
                      {item.icon && <item.icon size={20} />}
                      <span>{item.label}</span>
                    </button>
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

      {/* Logout modal */}
      <WarningModal
        open={logoutModalOpen}
        onClose={handleCancel}
        title="Logout"
        question="Are you sure you want to proceed? "
        additionalText="You can’t undo this action later."
        onConfirm={handleLogoutConfirm}
        onCancel={handleCancel}
        confirmText="Logout"
        cancelText="Cancel"
      />
    </>
  );
};

export default Navbar;
