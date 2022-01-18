import React, { useReducer, useState } from "react";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { Form } from "../../components/form";
import Layout from "../../components/layout";
import {
  changeValues,
  showMessage,
} from "../../modules/form-management/actions";
import reducer from "../../modules/form-management/reducer";
import { useAuthenticator } from "../../temporal/useAuthenticator";
import { formatDate } from "../../helpers/helpers";
import { BirthdayElement } from "../../modules/home-management/interfaces";
import { BirthdaySelectProps } from "../../modules/edit-management/interfaces";
import { TargetProps } from "../../modules/form-management/interfaces";
import { formatName } from "../../helpers/helpers";
import {
  initialLoadState,
  loadReducer,
} from "../../modules/load-management/loadReducer";

const Edit = ({ birthdaySelect }: BirthdaySelectProps) => {
  const auth = useAuthenticator();

  const { email, firstName, lastName, birthday, id } = birthdaySelect;

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

  const [{ isLoading }, setLoad] = useReducer(loadReducer, initialLoadState);

  const router = useRouter();

  const editBirthday = (e: Event) => {
    e.preventDefault();

    const { email, firstName, lastName, birthday } = values;

    if (firstName && lastName && email && birthday) {
      setLoad({ type: "load", payload: true });

      fetch(`https://birthday-app-api.vercel.app/api/v1/john/birthdays/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      })
        .then((res) => {
          if (res.ok) {
            return res.json();
          }
        })
        .then(() =>
          dispatch(
            showMessage(
              true,
              "success",
              "The birthday was saved successfully ✔"
            )
          )
        )
        .catch((error) =>
          dispatch(
            showMessage(
              true,
              "warning",
              `Error editing birthday. Error description: ${error}`
            )
          )
        );

      setTimeout(() => {
        router.back();
        dispatch(showMessage(false, "", ""));
      }, 1500);
    } else {
      dispatch(
        showMessage(
          true,
          "warning",
          "All fields need to be completed before saving the changes"
        )
      );
    }
  };

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
        onSubmit={editBirthday}
        onChange={({ target }: TargetProps) => dispatch(changeValues(target))}
        router={router}
        disabled={isLoading}
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
