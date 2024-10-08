import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import React, { useReducer } from "react";
import { IoIosSend, IoMdArrowRoundBack } from "react-icons/io";
import Button from "../../components/button";
import Container from "../../components/container";
import Input from "../../components/input";
import Label from "../../components/label";
import Layout from "../../components/layout";
import Line from "../../components/line";
import { Textarea } from "../../components/textarea";
import Title from "../../components/title";
import { formatDate, getURL } from "../../helpers/helpers";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useLoadState } from "../../hooks/useLoadState";
import { BirthdaySelectProps } from "../../modules/edit-management/interfaces";
import { changeValues } from "../../modules/form-management/actions";
import { TargetProps } from "../../modules/form-management/interfaces";
import reducer from "../../modules/form-management/reducer";
import { BirthdayElement } from "../../modules/home-management/interfaces";
import styles from "./index.module.scss";

const ECard = ({ birthdaySelect }: BirthdaySelectProps) => {
  const { auth } = useAuthContext();

  const { email, firstName, lastName, birthday } = birthdaySelect;

  const fullName = `${firstName} ${lastName}`;

  const initialState = {
    values: {
      fullName,
      email,
      birthday: formatDate(birthday),
      greeting: `Very happy birthday ${fullName}!`,
    },
    alert: {
      active: false,
      variant: "",
      message: "",
    },
  };

  const [{ values }, dispatch] = useReducer(reducer, initialState);

  const { loadState, setLoadState } = useLoadState();

  const router = useRouter();

  const sendECard = (e: any) => {
    e.preventDefault();

    setLoadState(true);

    window.location.href = `mailto:${
      values.email
    }?subject=${"Birthday Greeting"}&body=${values.greeting}`;

    setTimeout(() => {
      setLoadState(false);
      router.back();
    }, 2000);
  };

  return (
    <Layout
      title="Birthday App | Send eCard"
      description="Form page to send eCard"
      auth={auth}
    >
      <Container>
        <Title>
          eCard for {firstName} {lastName}
        </Title>
        <Line />
        <form className={styles.form} onSubmit={sendECard}>
          <div>
            <Label bold={true} mobileHidden={false}>
              Full name:
            </Label>
            <Input
              type="text"
              id="fullName"
              name="fullName"
              value={values.fullName}
              readOnly={true}
            />
            <Label bold={true} mobileHidden={false}>
              Birthday date:
            </Label>
            <Input
              type="text"
              id="birthday"
              name="birthday"
              value={values.birthday}
              readOnly={true}
            />
            <Label required={true} bold={true} mobileHidden={false}>
              E-mail:
            </Label>
            <Input
              type="email"
              id="email"
              name="email"
              placeholder="example@email.com"
              value={values.email}
              onChange={({ target }: TargetProps) =>
                dispatch(changeValues(target))
              }
              pattern="^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$"
              required={true}
            />
            <Label required={true} bold={true} mobileHidden={false}>
              Greeting:
            </Label>
            <Textarea
              id="greeting"
              name="greeting"
              placeholder="You must enter a birthday greeting"
              minLength={14}
              maxLength={400}
              value={values.greeting}
              onChange={({ target }: TargetProps) =>
                dispatch(changeValues(target))
              }
              required={true}
            />
          </div>
          <div className={styles.buttons}>
            <Button
              type="button"
              variant="secondary"
              onClick={() => router.back()}
            >
              <IoMdArrowRoundBack />
            </Button>
            <Button variant="email" onSubmit={sendECard} disabled={loadState}>
              <IoIosSend />
            </Button>
          </div>
        </form>
      </Container>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  query,
  req,
}) => {
  const token = req.cookies.token;
  const url = getURL(req.headers.host);

  const res = await fetch(`${url}/birthdays`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      token,
    }),
  });

  const { birthdays } = await res.json();

  const id = query.id;

  if (!id) {
    return {
      notFound: true,
    };
  }

  const birthdaySelect = birthdays.filter(
    (birthday: BirthdayElement) => birthday.id === id
  )[0];

  return {
    props: { birthdaySelect },
  };
};

export default ECard;
