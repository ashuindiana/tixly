import Head from "next/head";
import React from "react";
import Footer from "../Footer/Footer";
// import Header from "../Header/Header";

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Neuton&display=swap"
          rel="stylesheet"
        />
      </Head>
      {children}
      <Footer />
    </>
  );
}
