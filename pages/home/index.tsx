import Layout from "../../components/layout";
import { GetServerSideProps } from "next";
import styles from "./index.module.scss";
import {
  getDates,
  formatName,
  handleSearch,
  resetSearch,
} from "../../helpers/helpers";
import Button from "../../components/button";
import { DataProps } from "../../modules/home-management/interfaces";
import { useRouter } from "next/router";
import Alert from "../../components/alert";
import Title from "../../components/title";
import Container from "../../components/container";
import Card from "../../components/card";
import Picture from "../../components/picture";
import calendar from "../../assets/calendar.png";
import Line from "../../components/line";
import Pagination from "../../components/pagination";
import { Modal } from "../../components/modal";
import { useModalContext } from "../../hooks/useModalContext";
import { useEffect, useReducer } from "react";
import { HiCake } from "react-icons/hi";
import { GiExtraTime } from "react-icons/gi";
import reducer, { initialState } from "../../modules/search-management/reducer";
import { FormSearch } from "../../components/form-search";
import { changeValues } from "../../modules/search-management/actions";
import { TargetProps } from "../../modules/form-management/interfaces";
import { useAuthenticator } from "../../hooks/useAuthenticator";

const Home = ({ data }: DataProps) => {
  const auth = useAuthenticator();

  const router = useRouter();

  const { search } = router.query;

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

  const init = () => {
    if (typeof search === "string") {
      return { value: search };
    } else {
      return initialState;
    }
  };

  const [{ value }, dispatch] = useReducer(reducer, initialState, init);

  return (
    <Layout
      title="Birthday App | Home"
      description="Upcoming birthdays"
      auth={auth}
    >
      <Container>
        <Title>Home</Title>
        <Line />
        <FormSearch
          onSubmit={(e: Event) => handleSearch(e, router, value)}
          onChange={({ target }: TargetProps) => dispatch(changeValues(target))}
          reset={(e: Event) => resetSearch(e, dispatch, router)}
          value={value}
          variant="primary"
        />
        <Line />
        <div className={styles.menu}>
          <Button
            variant="tertiary"
            shadow={true}
            text="List"
            onClick={() => router.push("/list?sortBy=recently-added")}
          />
          <Button
            variant="primary"
            shadow={true}
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
              <Alert variant="warning">
                {search
                  ? "No results found for the search"
                  : "No Birthdays coming soon"}
              </Alert>
              {!search && (
                <Picture
                  src={calendar}
                  alt="logo"
                  width={"250px"}
                  heigth={"250px"}
                />
              )}
            </div>
          )}
          {pages > 1 && (
            <Pagination
              pages={pages}
              page={+page}
              query={search ? `search=${search}&` : ``}
            />
          )}
        </div>
        <Modal show={active}>
          <Modal.Header>{`Removing birthday from: ${payload.name}`}</Modal.Header>
          <Modal.Body>
            <Alert variant={variant}>{text}</Alert>
          </Modal.Body>
          <Modal.Footer />
        </Modal>
      </Container>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  query,
  req,
}) => {
  const search = query.search ? `/${query.search}` : "";
  const page = query.page ?? 1;
  const host = req.headers.host;

  const res = await fetch(`http://${host}/api/upcoming-birthdays${search}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ page }),
  });

  const data = await res.json();

  if (data.page > data.pages) {
    return {
      notFound: true,
    };
  }

  return {
    props: { data },
  };
};

export default Home;
