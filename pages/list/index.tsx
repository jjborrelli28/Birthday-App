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
import { BirthdayElement } from "../../modules/home-management/interfaces";
import { formatDate } from "../../helpers/formatDate";
import { GetServerSideProps } from "next";
import { DataProps } from "../../modules/list-management/interfaces";
import { redirect } from "../../temporal/redirect";
import { Modal } from "../../components/modal";
import { useContexts } from "../../hooks/useContexts";

const List = ({ data }: DataProps) => {
  const { dobs, page, pages } = data;

  const router = useRouter();

  redirect(router);

  const { active, text, variant, payload } = useContexts("modal");

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
              <Card variant="tertiary" key={birthday.id}>
                <Card.Avatar />
                <Card.Data>
                  <Card.Name
                    name={birthday.firstName}
                    surname={birthday.lastName}
                  />
                  <Card.Birthday>{formatDate(birthday.birthday)}</Card.Birthday>
                  <Card.Email>{birthday.email}</Card.Email>
                </Card.Data>
                <Card.Comands
                  id={birthday.id}
                  name={`${birthday.firstName} ${birthday.lastName}`}
                  router={router}
                />
              </Card>
            ))
          ) : (
            <div className={styles.messageContainer}>
              <div className={styles.handContainer}>
                <h2 className={styles.hand}>☝</h2>
              </div>
              <Message variant="warning">Set your Birthday reminders!</Message>
            </div>
          )}
          {pages > 1 && (
            <Pagination variant="tertiary" pages={pages} page={+page} />
          )}
        </div>
        <Modal show={active}>
          <Modal.Header>{`Removing birthday from: ${payload.name}`}</Modal.Header>
          <Modal.Body>
            <Message variant={variant}>{text}</Message>
          </Modal.Body>
          <Modal.Footer />
        </Modal>
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

export default List;
