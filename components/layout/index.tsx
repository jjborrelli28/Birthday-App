import Head from "next/head";
import React from "react";
import Error from "../error";
import PropsLayout from "./interfaces";

const Layout = ({
  children,
  title,
  description,
  hideHeader = true,
  hideFooter = true,
  auth,
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

      <main>
        {auth ? (
          children
        ) : (
          <Error>
            <Error.Number>403</Error.Number>
            <Error.Title>Forbidden</Error.Title>
            <Error.Message>
              Unauthenticated user - You do not have permission to access this
              server
            </Error.Message>
          </Error>
        )}
      </main>

      <footer hidden={hideFooter}>
        <h2>Footer Component</h2>
      </footer>
    </div>
  );
};

export default Layout;
