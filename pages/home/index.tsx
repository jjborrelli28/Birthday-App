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
import { useAuthContext } from "../../hooks/useAuthContext";
import { BsCalendar3 } from "react-icons/bs";
import { IoPersonAddSharp } from "react-icons/io5";
import { FaListUl } from "react-icons/fa";

const Home = ({ data, url }: DataProps) => {
  const { auth } = useAuthContext();

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
            type="button"
            variant="calendar"
            onClick={() => router.push("/calendar-view")}
          >
            <BsCalendar3 />
          </Button>
          <Button
            variant="tertiary"
            shadow={true}
            onClick={() => router.push("/list?sortBy=recently-added")}
          >
            <FaListUl />
          </Button>
          <Button
            variant="success"
            shadow={true}
            onClick={() => router.push("/add")}
          >
            <IoPersonAddSharp />
          </Button>
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
          <Modal.Footer url={url} />
        </Modal>
      </Container>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  query,
  req,
}) => {
  const search = query.search ?? "";
  const page = query.page ?? 1;
  const token = req.cookies.token;
  const url = `http://${req.headers.host}/api/bda`;

  const res = await fetch(`${url}/birthdays`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      token,
      upcomingBirthdays: true,
      search,
      page,
    }),
  });

  const data = await res.json();

  if (data.page > data.pages) {
    return {
      notFound: true,
    };
  }

  return {
    props: { data, url },
  };
};

export default Home;
