import "../styles/globals.css";
import { AnimatePresence } from "framer-motion";
import Layout from "../components/Layout/Layout";

function MyApp({ Component, pageProps, router }) {
  return (
    <Layout>
      <AnimatePresence exitBeforeEnter>
        <Component {...pageProps} key={router.route} />
      </AnimatePresence>
    </Layout>
  );
}

export default MyApp;
