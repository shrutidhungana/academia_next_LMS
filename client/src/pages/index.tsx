"use client";

import Link from "next/link";



export default function Home() {
  



  return (
    <main className="min-h-screen flex flex-col items-center bg-gradient-to-tr from-[#F8FAFC] via-[#EBF2F7] to-[#E2E8F0] relative overflow-hidden">
      {/* Hero Banner */}
      <div className="absolute top-0 left-0 w-full h-[65vh] overflow-hidden">
       
        <div className="absolute inset-0 bg-gradient-to-b from-[#F8FAFC]/95 via-[#F8FAFC]/60 to-transparent" />
      </div>

      {/* Hero Content */}
      <section className="relative mt-[25vh] text-center px-6 z-10">
        <h1 className="text-5xl md:text-6xl font-extrabold text-[#DA70D6] tracking-tight drop-shadow-sm">
          Academia Next
        </h1>
        <p className="mt-4 text-lg md:text-xl text-[#E0B0FF] font-medium leading-relaxed max-w-2xl mx-auto">
          Empowering education through technology — streamline classes, automate
          workflows, and enable smarter learning experiences.
        </p>

        <div className="flex gap-6 justify-center mt-10">
          <Link
            href="/auth/register"
            className="px-7 py-3 rounded-full bg-[#DA70D6] text-white font-semibold shadow-md hover:scale-105 hover:shadow-lg transition-all duration-300"
          >
            Get Started
          </Link>
          <Link
            href="/auth/login"
            className="px-7 py-3 rounded-full border-2 border-[#DA70D6] text-[#DA70D6] font-semibold hover:bg-[#DA70D6] hover:text-white shadow-md hover:shadow-lg transition-all duration-300"
          >
            Login
          </Link>
        </div>
      </section>

      {/* Feature Section */}
      <section className="relative z-10 mt-32 max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-10 px-8">
        {[
          {
            title: "Seamless Management",
            desc: "Organize courses, track progress, and automate assessments with ease.",
            icon: "🎓",
          },
          {
            title: "Real-time Collaboration",
            desc: "Interactive sessions, discussions, and instant feedback for students and instructors.",
            icon: "💬",
          },
          {
            title: "Data-Driven Insights",
            desc: "AI-powered analytics that help you measure performance and engagement.",
            icon: "📊",
          },
        ].map((f, i) => (
          <div
            key={i}
            className="backdrop-blur-md bg-white/40 rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300"
          >
            <div className="text-4xl mb-3">{f.icon}</div>
            <h3 className="text-xl font-semibold text-[#DA70D6] mb-2">
              {f.title}
            </h3>
            <p className="text-[#E0B0FF] text-sm font-medium">{f.desc}</p>
          </div>
        ))}
      </section>

      {/* Footer */}
      <footer className="relative z-10 mt-24 mb-6 text-[#E0B0FF] text-sm text-center">
        © {new Date().getFullYear()} Academia Next · Redefining Learning
        Experiences
      </footer>
    </main>
  );
}
