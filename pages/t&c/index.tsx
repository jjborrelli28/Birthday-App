import React from "react";
import Layout from "../../components/layout";
import styles from "./index.module.scss";
import Button from "../../components/button";
import { useRouter } from "next/router";
import Title from "../../components/title";
import Container from "../../components/container";
import Text from "../../components/text";
import Line from "../../components/line";
import Picture from "../../components/picture";
import logo from "../../assets/logo.png";
import { useAuthenticator } from "../../temporal/useAuthenticator";

const TermsAndConditions = () => {
  const auth = useAuthenticator();

  const router = useRouter();

  const handleDecline = () => {
    router.push("/");
    localStorage.removeItem("logged");
  };

  const handleAgree = () => {
    localStorage.setItem("t&cAccepted", "true");
    router.push("/home");
  };

  return (
    <Layout
      title="Birthday App | T&C"
      description="Terms and conditions page"
      auth={auth}
      hideFooter={false}
    >
      <Container>
        <div className={styles.container}>
          <div>
            <Title>Terms and conditions</Title>
            <Line />
            <Picture src={logo} alt="logo" width={"250px"} heigth={"250px"} />
            <div className={styles.textContainer}>
              <Text bold={true}>Birthday App</Text>
              <Text>
                This application allows you to schedule the birthday dates of
                your loved ones. On your initial screen you can see all the
                birthdays that you will have within the next 7 days, you can
                also access a specific section where you can see the list of all
                scheduled birthdays (which you can edit and delete).
              </Text>
              <Text>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus
                excepturi eligendi error quisquam aperiam quod eum dolore,
                consequuntur fugit culpa? Reiciendis modi earum deleniti
                temporibus, iusto nobis numquam minus labore. Lorem ipsum dolor
                sit amet consectetur adipisicing elit. Ducimus excepturi
                eligendi error quisquam aperiam quod eum dolore, consequuntur
                fugit culpa? Reiciendis modi earum deleniti temporibus, iusto
                nobis numquam minus labore.
              </Text>
              <Text bold={true}>Copyright © Juan Jose Borrelli</Text>
              <Text bold={true}>All rights reserved.</Text>
            </div>
          </div>
          <div className={styles.btnsContainer}>
            <Button
              variant="secondary"
              text="Decline"
              onClick={handleDecline}
            />
            <Button variant="primary" text="Agree" onClick={handleAgree} />
          </div>
        </div>
      </Container>
    </Layout>
  );
};

export default TermsAndConditions;
