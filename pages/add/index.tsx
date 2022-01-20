import React, { FormEvent, useReducer } from "react";
import { useRouter } from "next/router";
import reducer, {
  initialAddBirthdayState,
} from "../../modules/form-management/reducer";
import { Form } from "../../components/form";
import Layout from "../../components/layout";
import { changeValues } from "../../modules/form-management/actions";
import { TargetProps } from "../../modules/form-management/interfaces";
import { useAuthenticator } from "../../temporal/useAuthenticator";
import { addBirthday } from "../../helpers/addBirthday";
import { useLoadState } from "../../hooks/useLoadState";

const Add = () => {
  const auth = useAuthenticator();

  const [{ values, message }, dispatch] = useReducer(
    reducer,
    initialAddBirthdayState
  );

  const { loadState, setLoadState } = useLoadState();

  const router = useRouter();

  return (
    <Layout
      title="Birthday App | Add Birthday"
      description="Form page to add birthday"
      auth={auth}
    >
      <Form
        title="Add a new birthday"
        values={values}
        message={message}
        onSubmit={(e: FormEvent) =>
          addBirthday({ e, values, setLoadState, dispatch, router })
        }
        onChange={({ target }: TargetProps) => dispatch(changeValues(target))}
        router={router}
        disabled={loadState}
      />
    </Layout>
  );
};

export default Add;
