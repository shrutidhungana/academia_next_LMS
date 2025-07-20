// components/auth/layout.tsx
import React from "react";

type LayoutProps = {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
};

const AuthLayout: React.FC<LayoutProps> = ({
  children,
  title = "Join Academia-Next",
  subtitle = "Create your account now",
}) => {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-tr from-indigo-800 via-purple-800 to-pink-700 px-4 py-8">
      <div className="max-w-4xl w-full bg-white rounded-xl shadow-lg p-8 space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-[#DA70D6]">{title}</h1>
          <p className="mt-2 text-[#E0B0FF]">{subtitle}</p>
        </div>
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
