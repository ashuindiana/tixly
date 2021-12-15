import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";
import { AnimatePresence } from "framer-motion";
import Layout from "../components/Layout/Layout";

function MyApp({ Component, pageProps, router }) {
  return (
    <SessionProvider>
      <Layout>
        <AnimatePresence exitBeforeEnter>
          <Component {...pageProps} key={router.route} />
        </AnimatePresence>
      </Layout>
    </SessionProvider>
  );
}

export default MyApp;
