import { useRouter } from "next/router";
import React, { useReducer } from "react";
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
import Pagination from "../../components/pagination";
import { getList } from "../../helpers/getList";
import { BirthdayElement } from "../interfaces";
import reducer from "../../modules/pagination-management/reducer";
import { formatDate } from "../../helpers/formatDate";

const index = ({ birthdays }: BirthdaysProps) => {
  const router = useRouter();

  const [page, dispatch] = useReducer(reducer, 1);

  const { dobs, pages } = getList(birthdays, page);

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
          {birthdays.length > 20 && (
            <Pagination
              variant="tertiary"
              pages={pages}
              page={page}
              dispatch={dispatch}
            />
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
