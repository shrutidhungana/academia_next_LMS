// pages/_app.tsx
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import Navbar from "@/components/common/Navbar";
import { NAV_ITEMS } from "@/config/navbar.config";
import { ToastContainer } from "react-toastify";
import { Provider } from "react-redux";
import store from "@/store/store";
import CheckAuthComponent from "@/components/common/CheckAuth";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";


const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Academia-Next</title>
        <meta name="description" content="Learning Management System" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <Navbar
            navItems={NAV_ITEMS}
            logoTitle="ACADEMIA NEXT"
            logo="/favicon.ico"
          />
          <main className="pt-16">
            {/* Padding top to offset fixed navbar */}
            <CheckAuthComponent>
              <Component {...pageProps} />
            </CheckAuthComponent>
          </main>

          <ToastContainer />
        </QueryClientProvider>
      </Provider>
    </>
  );
}
