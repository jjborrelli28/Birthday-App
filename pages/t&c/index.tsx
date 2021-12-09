import Image from "next/image";
import React from "react";
import Layout from "../../components/layout";
import styles from "./index.module.scss";
import logo from "../../assets/logo.png";

const index = () => {
  return (
    <Layout
      title="Birthday App | T&C"
      description="Terms and conditions screen"
      hidden={true}
    >
      <div className={styles.container}>
        <div>
          <h2 className={styles.title}>Terms and conditions</h2>
          <picture className={styles.picture}>
            <Image src={logo} alt="Logo" width={250} height={250} />
          </picture>
          <div className={styles.textContainer}>
            <p className={styles.text}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus
              excepturi eligendi error quisquam aperiam quod eum dolore,
              consequuntur fugit culpa? Reiciendis modi earum deleniti
              temporibus, iusto nobis numquam minus labore. Lorem ipsum dolor
              sit amet consectetur adipisicing elit. Ducimus excepturi eligendi
              error quisquam aperiam quod eum dolore, consequuntur fugit culpa?
              Reiciendis modi earum deleniti temporibus, iusto nobis numquam
              minus labore.
              <br />
              <br />
              <span className={styles.textBold}>
                Copyright © Juan Jose Borrelli
              </span>
              <br />
              <span className={styles.textBold}>All rights reserved.</span>
            </p>
          </div>
        </div>
        <div className={styles.btnsContainer}>
          <button className={styles.btnDecline}>Decline</button>
          <button className={styles.btnAgree}>Agree</button>
        </div>
      </div>
    </Layout>
  );
};

export default index;
