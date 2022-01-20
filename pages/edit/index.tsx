import React, { useReducer } from "react";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { Form } from "../../components/form";
import Layout from "../../components/layout";
import { changeValues } from "../../modules/form-management/actions";
import reducer from "../../modules/form-management/reducer";
import { useAuthenticator } from "../../temporal/useAuthenticator";
import { formatDate } from "../../helpers/helpers";
import { BirthdayElement } from "../../modules/home-management/interfaces";
import { BirthdaySelectProps } from "../../modules/edit-management/interfaces";
import { TargetProps } from "../../modules/form-management/interfaces";
import { formatName } from "../../helpers/helpers";
import { editBirthday } from "../../helpers/editBirthday";
import { useLoadState } from "../../hooks/useLoadState";

const Edit = ({ birthdaySelect }: BirthdaySelectProps) => {
  const auth = useAuthenticator();

  const { email, firstName, lastName, birthday } = birthdaySelect;

  const initialState = {
    values: {
      email,
      firstName,
      lastName,
      birthday: formatDate(birthday),
    },
    message: {
      show: false,
      variant: "",
      text: "",
    },
  };

  const [{ values, message }, dispatch] = useReducer(reducer, initialState);

  const { loadState, setLoadState } = useLoadState();

  const router = useRouter();

  return (
    <Layout
      title="Birthday App | Edit Birthday"
      description="Page to edit birthdays"
      auth={auth}
    >
      <Form
        title={`Edit birthday of ${formatName(firstName, lastName)}`}
        values={values}
        message={message}
        onSubmit={(e: Event) =>
          editBirthday({ e, values, setLoadState, dispatch, router })
        }
        onChange={({ target }: TargetProps) => dispatch(changeValues(target))}
        router={router}
        disabled={loadState}
      />
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const res = await fetch(
    "https://birthday-app-api.vercel.app/api/v1/john/birthdays"
  );
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

export default Edit;
