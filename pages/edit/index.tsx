import { useRouter } from "next/router";
import React, { useReducer } from "react";
import { Form } from "../../components/form";
import Layout from "../../components/layout";
import { patchBirthday } from "../../modules/edit-management/patchBirthday";
import reducer, { initialState } from "../../modules/form-management/reducer";

const Edit = () => {
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
      title="Birthday App | Edit Birthday"
      description="Page to edit birthdays"
    >
      <Form
        title="Edit birthday of"
        values={values}
        message={message}
        handleSubmit={patchBirthday}
        dispatch={dispatch}
        router={router}
      />
    </Layout>
  );
};

export default Edit;
