import React, { useReducer } from "react";
import { useRouter } from "next/router";
import reducer, { initialState } from "../../modules/form-management/reducer";
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

  const router = useRouter();

  const addBirthday = (e: Event) => {
    e.preventDefault();

    const { email, firstName, lastName, birthday } = values;

    if (firstName && lastName && email && birthday) {
      dispatch(
        showMessage(true, "success", "The birthday was saved successfully ✔")
      );
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
        .then((response) => console.log("Success:", response))
        .catch((error) => console.error("Error:", error));

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
      />
    </Layout>
  );
};

export default Add;
