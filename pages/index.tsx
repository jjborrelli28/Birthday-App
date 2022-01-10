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
import { useLoginRedirect } from "../temporal/useLoginRedirect";
import { Modal } from "../components/modal";
import { useModalContext } from "../hooks/useModalContext";
import { formatName } from "../helpers/formatName";
import { useEffect } from "react";
import { HiCake } from "react-icons/hi";
import { GiExtraTime } from "react-icons/gi";

const Home = ({ data }: DataProps) => {
  const router = useRouter();

  useLoginRedirect(router);

  const modal = useModalContext();

  const { active, text, variant, payload, isRefreshing, setModal } = modal;
  if (isRefreshing) {
    router.replace(router.asPath);
  }

  const { dobs, page, pages } = data;

  useEffect(() => {
    setModal({ ...modal, isRefreshing: false });
  }, [data]);

  const { today } = getDates();

  return (
    <Layout title="Birthday App | Home" description="Homepage">
      <Container>
        <Title>Next birthdays</Title>
        <Line />
        <div className={styles.menu}>
          <Button
            variant="tertiary"
            text="List"
            onClick={() => router.push("/list?sortBy=recently-added")}
          />
          <Button
            variant="primary"
            text="Add"
            onClick={() => router.push("/add")}
          />
        </div>
        <div>
          {dobs.length > 0 ? (
            <>
              {dobs.find((dob) => dob.birthday === today) && (
                <div>
                  <Title level={6}>
                    {"Today's birthday"} <HiCake />
                  </Title>
                  {dobs
                    .filter((dob) => dob.birthday === today)
                    .map((birthday) => (
                      <Card key={birthday.id}>
                        <Card.Avatar />
                        <Card.Data>
                          <Card.Name
                            name={birthday.firstName}
                            surname={birthday.lastName}
                          />
                          <Card.Birthday>{birthday.birthday}</Card.Birthday>
                          <Card.Email>{birthday.email}</Card.Email>
                        </Card.Data>
                        <Card.Comands
                          id={birthday.id}
                          name={formatName(
                            birthday.firstName,
                            birthday.lastName
                          )}
                          router={router}
                          birthday={birthday.birthday}
                        />
                      </Card>
                    ))}
                  <Line />
                </div>
              )}

              {dobs.find((dob) => dob.birthday !== today) && (
                <div>
                  <Title level={6}>
                    {"Upcoming birthdays"} <GiExtraTime />
                  </Title>
                  {dobs
                    .filter((dob) => dob.birthday !== today)
                    .map((birthday) => (
                      <Card key={birthday.id}>
                        <Card.Avatar />
                        <Card.Data>
                          <Card.Name
                            name={birthday.firstName}
                            surname={birthday.lastName}
                          />
                          <Card.Birthday>{birthday.birthday}</Card.Birthday>
                          <Card.Email>{birthday.email}</Card.Email>
                        </Card.Data>
                        <Card.Comands
                          id={birthday.id}
                          name={formatName(
                            birthday.firstName,
                            birthday.lastName
                          )}
                          router={router}
                          birthday={birthday.birthday}
                        />
                      </Card>
                    ))}
                </div>
              )}
            </>
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

  const pages = Math.ceil(nextBirthdays.length / 20);

  const data = {
    dobs: getPage(nextBirthdays, +page, 20),
    page,
    pages,
  };

  if (+page > pages) {
    return {
      notFound: true,
    };
  }

  return {
    props: { data },
  };
};

export default Home;
