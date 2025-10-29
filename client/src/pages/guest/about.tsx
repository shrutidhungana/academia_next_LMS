// src/app/about/page.tsx
"use client";

import React from "react";
import FeatureCard from "@/components/guest/FeatureCard";
import { ABOUT_CARDS } from "@/config/about.config";

const AboutPage: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem)] w-full bg-gradient-to-tr from-[#F8FAFC] via-[#EBF2F7] to-[#E2E8F0] px-6 py-10">
      {/* Hero Section */}
      <div className="flex-shrink-0 text-center space-y-4 max-w-3xl mx-auto">
        <h1 className="text-5xl font-bold tracking-tight text-[#DA70D6]">
          About Academia Next
        </h1>
        <p className="text-lg text-[#E0B0FF]">
          Revolutionizing the way institutions, instructors, and students
          connect, collaborate, and learn — all under one intelligent platform.
        </p>
      </div>

      {/* Feature Cards Section */}
      <div className="flex-1 overflow-y-auto mt-10">
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
          {ABOUT_CARDS?.map((card, idx) => (
            <FeatureCard key={idx} {...card} />
          ))}
        </div>
      </div>

      {/* Mission / Footer Section */}
      <div className="flex-shrink-0 mt-16 max-w-3xl mx-auto text-center space-y-3">
        <h2 className="text-3xl font-semibold text-[#DA70D6]">Our Mission</h2>
        <p className="text-gray-700">
          At Academia Next, our mission is to bridge the gap between learning
          and technology. We believe education should be accessible, efficient,
          and empowering for everyone — from schools and universities to
          individual learners worldwide.
        </p>
        <p className="text-gray-700">
          With automation, AI-driven insights, and collaboration tools, we’re
          transforming traditional learning environments into smart ecosystems.
        </p>
        <p className="mt-4 text-sm text-[#E0B0FF]">
          &copy; {currentYear} Academia Next. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default AboutPage;
