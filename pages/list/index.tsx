import { useRouter } from "next/router";
import React from "react";
import Button from "../../components/button";
import Card from "../../components/card";
import Container from "../../components/container";
import Layout from "../../components/layout";
import Line from "../../components/line";
import Message from "../../components/message";
import Title from "../../components/title";
import styles from "./index.module.scss";
import Pagination from "../../components/pagination";
import { getPage } from "../../helpers/getPage";
import { BirthdayElement } from "../interfaces";
import { formatDate } from "../../helpers/formatDate";
import { GetServerSideProps } from "next";
import { DataProps } from "./interfaces";

const index = ({ data }: DataProps) => {
  const { dobs, page, pages } = data;

  const router = useRouter();

  //Login simulation(momentary)
  if (typeof window !== "undefined") {
    const logged = localStorage.getItem("logged") ?? false;

    if (!logged) {
      router.push("/login");
    }
  }

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
            variant="secondary"
            text="« Back"
            onClick={() => router.push("/")}
          />
          <Button
            variant="primary"
            text="Add"
            onClick={() => router.push("/add")}
          />
        </div>
        <div>
          {dobs.length > 0 ? (
            dobs.map((birthday: BirthdayElement) => (
              <Card key={birthday.id} variant="tertiary">
                <Card.Name
                  name={birthday.firstName}
                  surname={birthday.lastName}
                />
                <Card.Birthday>{formatDate(birthday.birthday)}</Card.Birthday>
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
          {pages > 1 && (
            <Pagination variant="tertiary" pages={pages} page={+page} />
          )}
        </div>
      </Container>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const res = await fetch(
    "https://birthday-app-api.vercel.app/api/v1/john/birthdays"
  );
  const { birthdays } = await res.json();

  const page = query.page ?? "1";

  const data = {
    dobs: getPage([...birthdays].reverse(), +page, 20),
    page,
    pages: Math.ceil(birthdays.length / 20),
  };

  return {
    props: { data },
  };
};

export default index;
