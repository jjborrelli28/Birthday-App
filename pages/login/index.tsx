import Image from "next/image";
import React from "react";
import Layout from "../../components/layout";
import styles from "./index.module.scss";
import logo from "../../assets/logo.png";
import Button from "../../components/button";
import { useRouter } from "next/router";
import Container from "../../components/container";

const index = () => {
  const router = useRouter();

  const handleLogin = () => {
    if (localStorage.getItem("t&cAccepted")) {
      router.push("/");
    } else {
      router.push("/t&c");
    }
  };

  return (
    <Layout title="Birthday App | Login" description="Login page">
      <Container>
        <div className={styles.container}>
          <Image src={logo} alt="Logo" width={150} height={150} />
          <Button variant="primary" text="Login" onClick={handleLogin} />
        </div>
      </Container>
    </Layout>
  );
};

export default index;
