import { useRouter } from "next/router";
import React, { useEffect, useReducer, useState } from "react";
import Button from "../../components/button";
import Card from "../../components/card";
import Container from "../../components/container";
import Layout from "../../components/layout";
import Line from "../../components/line";
import Alert from "../../components/alert";
import Title from "../../components/title";
import styles from "./index.module.scss";
import Pagination from "../../components/pagination";
import { BirthdayElement } from "../../modules/home-management/interfaces";
import {
  formatDate,
  formatName,
  handleSearch,
  resetSearch,
} from "../../helpers/helpers";
import { GetServerSideProps } from "next";
import { DataProps } from "../../modules/list-management/interfaces";
import { Modal } from "../../components/modal";
import { useModalContext } from "../../hooks/useModalContext";
import reducer from "../../modules/search-management/reducer";
import { changeValues } from "../../modules/search-management/actions";
import { FaArrowCircleUp } from "react-icons/fa";
import { FormSearch } from "../../components/form-search";
import Link from "next/link";
import { Accordion } from "../../components/accordion";
import { useAuthContext } from "../../hooks/useAuthContext";
import { IoMdArrowRoundBack } from "react-icons/io";
import { IoPersonAddSharp } from "react-icons/io5";

const List = ({ data, url }: DataProps) => {
  const { auth } = useAuthContext();

  const router = useRouter();

  const { search } = router.query;

  const modal = useModalContext();

  const { active, text, variant, payload, isRefreshing, setModal } = modal;

  if (isRefreshing) {
    router.replace(router.asPath);
  }

  const { dobs, page, pages, sortBy } = data;

  const classification = (
    sortBy.charAt(0).toUpperCase() + sortBy.slice(1)
  ).replace("-", " ");

  useEffect(() => {
    setModal({ ...modal, isRefreshing: false });
  }, [data]);

  const [{ value }, dispatch] = useReducer(reducer, {
    value: typeof search === "string" ? search : "",
  });

  const [{ open }, setAccordion] = useState({ open: false });

  const toggleAccordion = () => {
    if (open) {
      setAccordion({ open: false });
    } else {
      setAccordion({ open: true });
    }
  };

  return (
    <Layout
      title="Birthday App | Birthdays list"
      description="Birthdays list page"
      auth={auth}
    >
      <Container>
        <Title>Birthdays list</Title>
        <Line />
        <FormSearch
          onSubmit={(e: Event) =>
            handleSearch(e, router, value, `sortBy=${sortBy}&`)
          }
          onChange={({ target }: any) => dispatch(changeValues(target))}
          reset={(e: Event) =>
            resetSearch(e, dispatch, router, `?sortBy=${sortBy}`)
          }
          value={value}
          variant="tertiary"
        />
        <Line />
        <div className={styles.menu}>
          <Button
            variant="secondary"
            shadow={true}
            onClick={() => router.push("/home")}
          >
            <IoMdArrowRoundBack />
          </Button>
          <Button
            variant="success"
            shadow={true}
            onClick={() => router.push("/add")}
          >
            <IoPersonAddSharp />
          </Button>
        </div>
        <Accordion
          open={open}
          classification={classification}
          onClick={toggleAccordion}
        >
          <Accordion.Item>
            <Link
              href={`/list?sortBy=recently-added${
                search ? `&search=${search}` : ""
              }`}
            >
              <a>• Recently added first</a>
            </Link>
          </Accordion.Item>
          <Accordion.Item>
            <Link
              href={`/list?sortBy=last-added${
                search ? `&search=${search}` : ""
              }`}
            >
              <a>• Last added first</a>
            </Link>
          </Accordion.Item>
        </Accordion>
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
                  <Card.DOB>{formatDate(birthday.birthday)}</Card.DOB>
                  <Card.Email>{birthday.email}</Card.Email>
                </Card.Data>
                <Card.Comands
                  id={birthday.id}
                  name={formatName(birthday.firstName, birthday.lastName)}
                  router={router}
                />
              </Card>
            ))
          ) : (
            <div className={styles.messageContainer}>
              {!search && (
                <div className={styles.arrowContainer}>
                  <FaArrowCircleUp className={styles.arrow} />
                </div>
              )}
              <Alert variant="warning">
                {search
                  ? "No results found for the search"
                  : "Set your Birthday reminders!"}
              </Alert>
            </div>
          )}
          {pages > 1 && (
            <Pagination
              variant="tertiary"
              pages={pages}
              page={+page}
              query={`sortBy=${sortBy}&${search ? `search=${search}&` : ``}`}
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
  const sortBy = query.sortBy ? query.sortBy : "recently-added";
  const search = query.search ?? "";
  const page = query.page ? query.page : 1;
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
      fullBirhdaysList: true,
      search,
      sortBy,
      page,
    }),
  });

  const data = await res.json();

  if (sortBy !== "recently-added" && sortBy !== "last-added") {
    return {
      notFound: true,
    };
  }

  if (data.page > data.pages) {
    return {
      notFound: true,
    };
  }

  return {
    props: { data, url },
  };
};

export default List;
