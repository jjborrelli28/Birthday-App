import "../styles/globals.scss";
import type { AppProps } from "next/app";
import { useState } from "react";
import Contexts from "../contexts/Contexts";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Contexts>
      <Component {...pageProps} />
    </Contexts>
  );
}

export default MyApp;
