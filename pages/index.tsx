import Layout from "../components/layout";
import { GetStaticProps } from "next";
import styles from "./index.module.scss";
import { getDates } from "../helpers/getDates";
import { formatDate } from "../helpers/formatDate";
import Button from "../components/button";
import BirthdaysProps, { BirthdayElement } from "./interface";
import calendar from "../assets/calendar.png";
import Image from "next/image";
import { sortDates } from "../helpers/sortDates";
import { useMemo } from "react";

const Home = ({ birthdays }: BirthdaysProps) => {
  const { today, nextWeek } = getDates();

  const nextBirthdays = useMemo(
    () =>
      birthdays.filter(
        (birthday: BirthdayElement) =>
          formatDate(birthday.birthday) <= today &&
          formatDate(birthday.birthday) <= nextWeek
      ),
    [birthdays]
  );

  return (
    <Layout
      title="Birthday App | Home"
      description="Homepage"
      hideHeader={true}
      hideFooter={true}
    >
      <div className={styles.container}>
        <h2 className={styles.title}>Next birthdays</h2>
        <div className={styles.menu}>
          <Button variant="tertiary" text="List" />
          <Button variant="primary" text="Add" />
        </div>
        <div>
          {nextBirthdays.length > 0 ? (
            sortDates(nextBirthdays).map((birthday) => (
              <div className={styles.card} key={birthday.id}>
                <div className={styles.dataContainer}>
                  <h3>
                    {birthday.firstName} <span>{birthday.lastName}</span>
                  </h3>
                  <p>Birthday date: {formatDate(birthday.birthday)}</p>
                  <p>E-mail: {birthday.email}</p>
                </div>
              </div>
            ))
          ) : (
            <div className={styles.message}>
              <h3>No Birthdays coming soon</h3>
              <Image
                src={calendar}
                alt="Calendar"
                height="250px"
                width="250px"
              />
            </div>
          )}
        </div>
      </div>
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
