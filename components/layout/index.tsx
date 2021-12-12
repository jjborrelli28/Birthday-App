import Head from "next/head";
import React from "react";
import styles from "./index.module.scss";
import PropsLayout from "./interface";

const Layout = ({
  children,
  title,
  description,
  hideHeader = false,
  hideFooter = false,
}: PropsLayout) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="icon" href="/favicon.ico" />
        <style>
          @import
          url('https://fonts.googleapis.com/css2?family=Baloo+Tamma+2:wght@400;500;600;700&display=swap');
        </style>
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
