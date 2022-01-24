import Head from "next/head";
import React, { PropsWithChildren } from "react";
import Error from "../error";
import PropsLayout from "./interfaces";
import styles from "./index.module.scss";
import { AiFillGithub } from "react-icons/ai";
import { BsFillPersonLinesFill } from "react-icons/bs";
import Link from "next/link";
import { cc } from "../../helpers/helpers";
import Button from "../button";
import { logout } from "../../helpers/logout";
import { useRouter } from "next/router";
import { useAuthContext } from "../../hooks/useAuthContext";

const Layout = ({
  children,
  title,
  description,
  hideHeader = false,
  hideFooter = false,
  auth,
}: PropsWithChildren<PropsLayout>) => {
  const authState = useAuthContext();

  const router = useRouter();

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.layout}>
        <div className={styles.container}>
          <header className={styles.header} hidden={hideHeader}>
            <nav className={styles.nav}>
              <Button
                type="button"
                text="Sign out"
                variant="tertiary"
                onClick={(e: Event) => logout(e, router, authState)}
                shadow={true}
              />
            </nav>
          </header>

          <main className={styles.main}>
            {auth ? (
              children
            ) : (
              <Error>
                <Error.Number>401</Error.Number>
                <Error.Title>Unauthorized</Error.Title>
                <Error.Message>
                  Sorry, your request could not be processed
                </Error.Message>
              </Error>
            )}
          </main>
        </div>

        <footer className={cc(styles.footer, hideFooter && styles.hide)}>
          <p className={styles.text}>By JJ</p>
          <p className={styles.text}>Copyright © 2022</p>
          <div className={styles.icons}>
            <Link href="https://github.com/jjborrelli28">
              <a className={styles.anchor}>
                <AiFillGithub className={styles.icon} />
              </a>
            </Link>
            <Link href="https://jjborrelli.netlify.app/">
              <a className={styles.anchor}>
                <BsFillPersonLinesFill className={styles.icon} />
              </a>
            </Link>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Layout;
