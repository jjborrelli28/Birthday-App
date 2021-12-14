import Layout from "../components/layout";
import { GetStaticProps } from "next";
import styles from "./index.module.scss";
import { getDates } from "../helpers/getDates";
import { formatDate } from "../helpers/formatDate";
import Button from "../components/button";
import BirthdaysProps, { BirthdayElement } from "./interface";
import { sortDates } from "../helpers/sortDates";
import { useMemo } from "react";
import { useRouter } from "next/router";
import Message from "../components/message";
import Title from "../components/title";
import Container from "../components/container";
import Card from "../components/card";
import Picture from "../components/picture";
import calendar from "../assets/calendar.png";
import Line from "../components/hr";

const Home = ({ birthdays }: BirthdaysProps) => {
  const { today, nextWeek } = getDates();

  const nextBirthdays = useMemo(
    () =>
      birthdays.filter(
        (birthday: BirthdayElement) =>
          formatDate(birthday.birthday) >= today &&
          formatDate(birthday.birthday) <= nextWeek
      ),
    [birthdays]
  );

  const router = useRouter();

  return (
    <Layout
      title="Birthday App | Home"
      description="Homepage"
      hideHeader={true}
      hideFooter={true}
    >
      <Container>
        <Title>Next birthdays</Title>
        <Line />
        <div className={styles.menu}>
          <Button
            variant="tertiary"
            text="List"
            onClick={() => router.push("/")}
          />
          <Button
            variant="primary"
            text="Add"
            onClick={() => router.push("/addBirthday")}
          />
        </div>
        <div>
          {nextBirthdays.length > 0 ? (
            sortDates(nextBirthdays).map((birthday) => (
              <Card key={birthday.id}>
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
              <Message variant="warning" text="No Birthdays coming soon" />
              <Picture
                img={calendar}
                alt="logo"
                width={"250px"}
                heigth={"250px"}
              />
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
  const birthdays = await res.json();
  return {
    props: birthdays,
  };
};

export default Home;
