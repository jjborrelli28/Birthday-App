import Image from "next/image";
import React from "react";
import Layout from "../../components/layout";
import styles from "./index.module.scss";
import logo from "../../assets/logo.png";
import Button from "../../components/button";

const index = () => {
  return (
    <Layout
      title="Birthday App | T&C"
      description="Terms and conditions page"
      hideHeader={true}
      hideFooter={true}
    >
      <div className={styles.container}>
        <div className={styles.box}>
          <div>
            <h2 className={styles.title}>Terms and conditions</h2>
            <picture className={styles.picture}>
              <Image src={logo} alt="Logo" width={250} height={250} />
            </picture>
            <div className={styles.textContainer}>
              <p className={styles.text}>
                <span className={styles.textBold}>Birthday App</span>
              </p>
              <p className={styles.text}>
                This application allows you to schedule the birthday dates of
                your loved ones. On your initial screen you can see all the
                birthdays that you will have within the next 7 days, you can
                also access a specific section where you can see the list of all
                scheduled birthdays (which you can edit and delete).
              </p>
              <p className={styles.text}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus
                excepturi eligendi error quisquam aperiam quod eum dolore,
                consequuntur fugit culpa? Reiciendis modi earum deleniti
                temporibus, iusto nobis numquam minus labore. Lorem ipsum dolor
                sit amet consectetur adipisicing elit. Ducimus excepturi
                eligendi error quisquam aperiam quod eum dolore, consequuntur
                fugit culpa? Reiciendis modi earum deleniti temporibus, iusto
                nobis numquam minus labore.
              </p>
              <p className={styles.text}>
                <span className={styles.textBold}>
                  Copyright © Juan Jose Borrelli
                </span>
              </p>
              <p className={styles.text}>
                <span className={styles.textBold}>All rights reserved.</span>
              </p>
            </div>
          </div>
          <div className={styles.btnsContainer}>
            <Button variant="secondary" text="Decline" />
            <Button variant="primary" text="Agree" />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default index;
