import "../styles/globals.css";
import { useEffect } from "react";
import { SessionProvider } from "next-auth/react";
import { AnimatePresence } from "framer-motion";
import Layout from "../components/Layout/Layout";
import NProgress from "nprogress";
import "../styles/nprogress.css";

// import { useRouter } from "next/router";

function MyApp({ Component, pageProps, router }) {
  // const router = useRouter();

  useEffect(() => {
    const tempFix = () => {
      const allStyleElems = document.querySelectorAll('style[media="x"]');
      allStyleElems.forEach((elem) => {
        elem.removeAttribute("media");
      });
    };
    const handleStart = (url) => {
      // console.log(`Loading: ${url}`);
      tempFix();
      NProgress.start();
    };
    const handleStop = () => {
      tempFix();
      NProgress.done();
    };

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleStop);
    router.events.on("routeChangeError", handleStop);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleStop);
      router.events.off("routeChangeError", handleStop);
    };
  }, [router]);

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
