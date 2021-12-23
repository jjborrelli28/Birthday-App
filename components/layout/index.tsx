import Head from "next/head";
import React from "react";
import PropsLayout from "./interfaces";

const Layout = ({
  children,
  title,
  description,
  hideHeader = true,
  hideFooter = true,
}: PropsLayout) => {
  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header hidden={hideHeader}>
        <nav>
          <h2>Nav Component</h2>
        </nav>
      </header>

      <main>{children}</main>

      <footer hidden={hideFooter}>
        <h2>Footer Component</h2>
      </footer>
    </div>
  );
};

export default Layout;
