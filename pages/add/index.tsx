import React, { useReducer } from "react";
import { useRouter } from "next/router";
import { getDates } from "../../helpers/getDates";
import reducer, { initialState } from "../../modules/add-management/reducer";
import { postBirthday } from "../../modules/add-management/postBirthday";
import { Form } from "../../components/form";
import Layout from "../../components/layout";

const Add = () => {
  const [{ values, message }, dispatch] = useReducer(reducer, initialState);

  const router = useRouter();

  //Login simulation(momentary)
  if (typeof window !== "undefined") {
    const logged = localStorage.getItem("logged") ?? false;

    if (!logged) {
      router.push("/login");
    }
  }

  return (
    <Layout
      title="Birthday App | Add Birthday"
      description="Page to add birthdays"
    >
      <Form
        title="Add a new birthday"
        values={values}
        message={message}
        handleSubmit={postBirthday}
        dispatch={dispatch}
        router={router}
      />
    </Layout>
  );
};

export default Add;
