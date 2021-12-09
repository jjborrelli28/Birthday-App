import Head from "next/head";
import React from "react";

const Layout = ({ children }: any) => {
  return (
    <div>
      <Head>
        <title>Birthday App</title>
        <meta name="description" content="App to remember birthday dates" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header>
        <nav>
          <h2>Nav Component</h2>
        </nav>
      </header>
      <main>{children}</main>
      <footer>
        <h2>Footer Component</h2>
      </footer>
    </div>
  );
};

export default Layout;
