import React from "react";
import { AppProps } from "next/app";
import Head from "next/head";
import "../styles/globals.css";
import { ThemeProvider } from "@staccx/bento";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <Component {...pageProps} />
      <Head>
        <link rel="shortcut icon" href="/images/favicon.ico" />
      </Head>
    </ThemeProvider>
  );
}

export default MyApp;
