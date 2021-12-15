import Layout from "../components/layout";
import { GetStaticProps } from "next";
import styles from "./index.module.scss";
import { getDates } from "../helpers/getDates";
import Button from "../components/button";
import BirthdaysProps from "./interfaces";
import { sortDates } from "../helpers/sortDates";
import { useRouter } from "next/router";
import Message from "../components/message";
import Title from "../components/title";
import Container from "../components/container";
import Card from "../components/card";
import Picture from "../components/picture";
import calendar from "../assets/calendar.png";
import Line from "../components/line";
import { BirthdayElement } from "./interfaces";
import { getBirthdays } from "../helpers/getBirthdays";

const Home = ({ birthdays }: BirthdaysProps) => {
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
  const { today, nextWeek } = getDates();

  const res = await fetch(
    "https://birthday-app-api.vercel.app/api/v1/john/birthdays"
  );
  const data = await res.json();

  const birthdays = sortDates(getBirthdays(data)).filter(
    (birthdays: BirthdayElement) =>
      birthdays.birthday >= today && birthdays.birthday <= nextWeek
  );

  return {
    props: { birthdays },
  };
};

export default Home;
