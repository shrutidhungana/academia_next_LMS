import Image from "next/image";
import React from "react";

type LayoutProps = {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
};

const AuthLayout: React.FC<LayoutProps> = ({
  children,
  title = "Welcome to Academia-Next",
  subtitle = "Empower Your Learning Journey",
}) => {
  return (
    <div className="flex min-h-screen w-full bg-gradient-to-tr from-blue-800 via-indigo-700 to-purple-700">
      {/* Left Side: Welcome / Branding */}
      <div className="hidden lg:flex w-1/2 flex-col justify-center px-16 text-white select-none">
        <h1 className="text-5xl font-extrabold leading-tight tracking-wide mb-4 drop-shadow-lg">
          {title}
        </h1>
        <p className="text-lg max-w-xl opacity-90 mb-8 drop-shadow-md">
          {subtitle}
        </p>

        {/* You can add a motivational quote or tagline */}
        <blockquote className="italic text-indigo-200 max-w-lg border-l-4 border-indigo-300 pl-6">
          “Education is the most powerful weapon which you can use to change the
          world.” – Nelson Mandela
        </blockquote>

        {/* Optional: Your LMS logo or graphic */}
        <div className="mt-auto opacity-80">
          {/* Placeholder for logo or illustration */}
          <Image
            src="/academia-next-logo-white.svg"
            alt="Academia-Next Logo"
            width={30}
            height={30}
            className="w-40"
          />
        </div>
      </div>

      {/* Right Side: Form Container */}
      <div className="flex flex-1 items-center justify-center bg-white rounded-l-3xl shadow-xl px-8 sm:px-12 md:px-16 lg:px-24 xl:px-32">
        <div className="w-full max-w-md space-y-8">{children}</div>
      </div>
    </div>
  );
};

export default AuthLayout;
