import React, { FormEvent, useReducer } from "react";
import { useRouter } from "next/router";
import reducer from "../../modules/form-management/reducer";
import { Form } from "../../components/form";
import Layout from "../../components/layout";
import { changeValues } from "../../modules/form-management/actions";
import { TargetProps } from "../../modules/form-management/interfaces";
import { addBirthday } from "../../helpers/addBirthday";
import { useLoadState } from "../../hooks/useLoadState";
import { useAuthContext } from "../../hooks/useAuthContext";
import { GetServerSideProps } from "next";

type DataProps = {
  date: string;
  url: string;
};

const Add = ({ date, url }: DataProps) => {
  const { auth } = useAuthContext();

  const router = useRouter();

  const initialAddBirthdayState = {
    values: {
      email: "",
      firstName: "",
      lastName: "",
      birthday: date,
    },
    alert: {
      active: false,
      variant: "",
      message: "",
    },
  };

  const [{ values, alert }, dispatch] = useReducer(
    reducer,
    initialAddBirthdayState
  );

  const { loadState, setLoadState } = useLoadState();

  return (
    <Layout
      title="Birthday App | Add Birthday"
      description="Form page to add birthday"
      auth={auth}
    >
      <Form
        title="Add a new birthday"
        values={values}
        alert={alert}
        onSubmit={(e: FormEvent) =>
          addBirthday({ e, values, setLoadState, dispatch, router, url })
        }
        onChange={({ target }: TargetProps) => dispatch(changeValues(target))}
        router={router}
        disabled={loadState}
      />
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  query,
  req,
}) => {
  const date = query.date ?? "";
  const url = `https://${req.headers.host}/api/bda`;

  return {
    props: { date, url },
  };
};

export default Add;
