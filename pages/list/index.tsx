import { useRouter } from "next/router";
import React from "react";
import Button from "../../components/button";
import Card from "../../components/card";
import Container from "../../components/container";
import Layout from "../../components/layout";
import Line from "../../components/line";
import Message from "../../components/message";
import Title from "../../components/title";
import BirthdaysProps from "../interfaces";
import styles from "./index.module.scss";
import { GetStaticProps } from "next";

const index = ({}: BirthdaysProps) => {
  const router = useRouter();

  const birthdays: any = [];

  console.log(birthdays);

  return (
    <Layout
      title="Birthday App | Birthdays list"
      description="List birthdays list"
      hideHeader={true}
      hideFooter={true}
    >
      <Container>
        <Title>Birthdays list</Title>
        <Line />
        <div className={styles.menu}>
          <Button
            variant="tertiary"
            text="Home"
            onClick={() => router.push("/")}
          />
        </div>
        <div>
          {birthdays.length > 0 ? (
            birthdays.map((birthday) => (
              <Card key={birthday.id}>
                <Card.Name
                  name={birthday.firstName}
                  surname={birthday.lastName}
                />
                <Card.Birthday>{birthday.birthday}</Card.Birthday>
                <Card.Email>{birthday.email}</Card.Email>
              </Card>
            ))
          ) : (
            <div className={styles.messageContainer}>
              <div className={styles.handContainer}>
                <h2 className={styles.hand}>☝</h2>
              </div>
              <Message variant="warning" text="Set your Birthday reminders! " />
            </div>
          )}
        </div>
      </Container>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const res = await fetch(
    "https://birthday-app-api.vercel.app/api/v1/john/birthdays"
  );
  const data = await res.json();

  const birthdays = [...data.birthdays].reverse();

  return {
    props: { birthdays },
  };
};

export default index;
