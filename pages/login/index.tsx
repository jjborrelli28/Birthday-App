import Image from "next/image";
import React from "react";
import Layout from "../../components/layout";
import styles from "./index.module.scss";
import logo from "../../assets/logo.png";
import Button from "../../components/button";

const index = () => {
  return (
    <Layout
      title="Birthday App | Login"
      description="Login screen"
      hidden={true}
    >
      <div className={styles.container}>
        <Image src={logo} alt="Logo" width={150} height={150} />
        <Button variant="primary" text="Login" />
      </div>
    </Layout>
  );
};

export default index;
