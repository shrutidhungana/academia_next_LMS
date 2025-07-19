import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import Navbar from "@/components/common/Navbar";
import { NAV_ITEMS } from "@/config/navbar.config";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Academia-Next</title>
        <meta name="description" content="Learning Management System" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon-v2.ico" />
      </Head>

      <Navbar
        navItems={NAV_ITEMS}
        logoTitle="ACADEMIA NEXT"
        logo="/favicon-v2.ico"
      />
      <main className="pt-16">
        {" "}
        {/* Padding top to offset fixed navbar */}
        <Component {...pageProps} />
      </main>
    </>
  );
}
