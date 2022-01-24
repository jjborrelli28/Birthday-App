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
import { useAuthContext } from "../../hooks/useAuthContext";
import Cookies from "js-cookie";

const TermsAndConditions = () => {
  const authState = useAuthContext();

  const { auth, setAuth } = authState;

  const router = useRouter();

  const { user } = router.query;

  const handleDecline = (e: Event) => {
    e.preventDefault();
    Cookies.remove(`t&c-${user}`);
    Cookies.remove("token");
    setAuth({ ...authState, auth: false, stayLoggedIn: false });
    router.push("/");
  };

  const handleAgree = (e: Event) => {
    e.preventDefault();
    Cookies.set(`t&c-${user}`, "accepted", { expires: 365 });
    router.push("/home");
  };

  return (
    <Layout
      title="Birthday App | T&C"
      description="Terms and conditions page"
      auth={auth && user && !Cookies.get(`t&c-${user}`) ? true : false}
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
          <div className={styles.buttons}>
            <Button
              type="button"
              variant="secondary"
              text="Decline"
              onClick={(e: Event) => handleDecline(e)}
            />
            <Button
              type="button"
              variant="primary"
              text="Agree"
              onClick={(e: Event) => handleAgree(e)}
            />
          </div>
        </div>
      </Container>
    </Layout>
  );
};

export default TermsAndConditions;
