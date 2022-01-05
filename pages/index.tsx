import Layout from "../components/layout";
import { GetServerSideProps } from "next";
import styles from "./index.module.scss";
import { getDates } from "../helpers/getDates";
import Button from "../components/button";
import { DataProps } from "../modules/home-management/interfaces";
import { sortDates } from "../helpers/sortDates";
import { useRouter } from "next/router";
import Message from "../components/message";
import Title from "../components/title";
import Container from "../components/container";
import Card from "../components/card";
import Picture from "../components/picture";
import calendar from "../assets/calendar.png";
import Line from "../components/line";
import { BirthdayElement } from "../modules/home-management/interfaces";
import { getBirthdays } from "../helpers/getBirthdays";
import { getPage } from "../helpers/getPage";
import Pagination from "../components/pagination";
import { redirect } from "../temporal/redirect";
import { Modal } from "../components/modal";
import { useContexts } from "../hooks/useContexts";

const Home = ({ data }: DataProps) => {
  const { dobs, page, pages } = data;

  const router = useRouter();

  redirect(router);

  const { active, payload } = useContexts("modal");

  return (
    <Layout title="Birthday App | Home" description="Homepage">
      <Container>
        <Title>Next birthdays</Title>
        <Line />
        <div className={styles.menu}>
          <Button
            variant="tertiary"
            text="List"
            onClick={() => router.push("/list")}
          />
          <Button
            variant="primary"
            text="Add"
            onClick={() => router.push("/add")}
          />
        </div>
        <div>
          {dobs.length > 0 ? (
            dobs.map((birthday) => (
              <Card
                key={birthday.id}
                id={birthday.id}
                name={`${birthday.firstName} ${birthday.lastName}`}
                router={router}
              >
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
              <Message variant="warning">No Birthdays coming soon</Message>
              <Picture
                src={calendar}
                alt="logo"
                width={"250px"}
                heigth={"250px"}
              />
            </div>
          )}
          {pages > 1 && <Pagination pages={pages} page={+page} />}
        </div>
        <Modal show={active}>
          <Modal.Header>{`Removing birthday from: ${payload}`}</Modal.Header>
          <Modal.Body>
            <Message variant="warning">
              {"Do you want to delete this birthday?"}
            </Message>
          </Modal.Body>
          <Modal.Footer />
        </Modal>
      </Container>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { today, nextWeek } = getDates();

  const res = await fetch(
    "https://birthday-app-api.vercel.app/api/v1/john/birthdays"
  );
  const { birthdays } = await res.json();

  const page = query.page ?? "1";

  const nextBirthdays = sortDates(getBirthdays(birthdays)).filter(
    (birthdays: BirthdayElement) =>
      birthdays.birthday >= today && birthdays.birthday <= nextWeek
  );

  const data = {
    dobs: getPage(nextBirthdays, +page, 20),
    page,
    pages: Math.ceil(nextBirthdays.length / 20),
  };

  return {
    props: { data },
  };
};

export default Home;
