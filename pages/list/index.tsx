import { useRouter } from "next/router";
import React, { useEffect, useReducer } from "react";
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
import { useLoginRedirect } from "../../temporal/useLoginRedirect";
import { Modal } from "../../components/modal";
import { useModalContext } from "../../hooks/useModalContext";
import { formatName } from "../../helpers/formatName";
import Label from "../../components/label";
import reducer, { initialState } from "../../modules/search-management/reducer";
import { changeValues } from "../../modules/search-management/actions";
import { FaArrowCircleUp } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { FormSearch } from "../../components/form-search";

const List = ({ data }: DataProps) => {
  const router = useRouter();

  const { sortBy, search } = router.query;

  const classification =
    typeof sortBy === "string" &&
    (sortBy.charAt(0).toUpperCase() + sortBy.slice(1)).replace("-", " ");

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

  const toggleOrder = () => {
    if (sortBy === "last-added") {
      router.push("/list?sortBy=recently-added");
    } else {
      router.push("/list?sortBy=last-added");
    }
  };

  const [{ value, message }, dispatch] = useReducer(reducer, initialState);

  const handleSearch = (e: any) => {
    e.preventDefault();
    router.push(`/list?sortBy=${sortBy}&search=${value}`);
  };

  const birthdays = dobs.filter((birthday) =>
    birthday.firstName.includes(value)
  );

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
        <FormSearch
          onSubmit={handleSearch}
          onChange={({ target }: any) => dispatch(changeValues(target))}
          value={value}
          variant="tertiary"
        />
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
        <div className={styles.sortBy}>
          <Button
            variant="tertiary"
            type="button"
            text={`Sort by: ${classification}`}
            long={true}
            onClick={toggleOrder}
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
              <Message variant="warning">
                {search
                  ? "No results found for the search"
                  : "Set your Birthday reminders!"}
              </Message>
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
  let { birthdays } = await res.json();

  const sortBy = query.sortBy;

  const search = query.search;

  if (search) {
    birthdays =
      typeof search === "string" &&
      birthdays.filter(
        (birthday: BirthdayElement) =>
          birthday.firstName.includes(search) ||
          birthday.lastName.includes(search) ||
          birthday.email.includes(search)
      );
  }

  const page = query.page ?? "1";

  const pages = Math.ceil(birthdays.length === 0 ? 1 : birthdays.length / 20);

  if (sortBy === "recently-added") {
    birthdays = [...birthdays].reverse();
  }

  const data = {
    dobs: getPage(birthdays, +page, 20),
    page,
    pages,
  };

  if (sortBy !== "recently-added" && sortBy !== "last-added") {
    return {
      notFound: true,
    };
  }

  if (+page > pages) {
    return {
      notFound: true,
    };
  }

  return {
    props: { data },
  };
};

export default List;
