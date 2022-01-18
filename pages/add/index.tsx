import React, { useReducer } from "react";
import { useRouter } from "next/router";
import reducer, { initialState } from "../../modules/form-management/reducer";
import {
  initialLoadState,
  loadReducer,
} from "../../modules/load-management/loadReducer";
import { Form } from "../../components/form";
import Layout from "../../components/layout";
import {
  changeValues,
  showMessage,
} from "../../modules/form-management/actions";
import { TargetProps } from "../../modules/form-management/interfaces";
import { useAuthenticator } from "../../temporal/useAuthenticator";

const Add = () => {
  const auth = useAuthenticator();

  const [{ values, message }, dispatch] = useReducer(reducer, initialState);

  const [{ isLoading }, setLoad] = useReducer(loadReducer, initialLoadState);

  const router = useRouter();

  const addBirthday = (e: Event) => {
    e.preventDefault();

    const { email, firstName, lastName, birthday } = values;

    if (firstName && lastName && email && birthday) {
      setLoad({ type: "load", payload: true });

      fetch("https://birthday-app-api.vercel.app/api/v1/john/birthdays/add", {
        method: "POST",
        headers: {
          Accept: "application/json",
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
              `Error saving birthday. Error description: ${error}`
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
      title="Birthday App | Add Birthday"
      description="Page to add birthdays"
      auth={auth}
    >
      <Form
        title="Add a new birthday"
        values={values}
        message={message}
        onSubmit={addBirthday}
        onChange={({ target }: TargetProps) => dispatch(changeValues(target))}
        router={router}
        disabled={isLoading}
      />
    </Layout>
  );
};

export default Add;
