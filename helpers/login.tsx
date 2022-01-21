import { FormEvent } from "react";
import { setAlert } from "../modules/form-management/actions";
import { ValuesProps } from "../modules/form-management/interfaces";
import { NextRouter } from "next/router";

type LoginProps = {
  e: FormEvent;
  values: ValuesProps;
  setLoadState: any;
  dispatch: any;
  router: NextRouter;
};

export const login = ({
  e,
  values,
  dispatch,
  setLoadState,
  router,
}: LoginProps) => {
  e.preventDefault();

  const { email, password } = values;

  if (email && password) {
    setLoadState(true);

    dispatch(setAlert(false, "", ""));

    fetch(`${process.env.NEXT_PUBLIC_BDA_API_V2}/signin`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.token) {
          dispatch(setAlert(true, "success", `User logged in successfully ✔`));

          setTimeout(() => {
            dispatch(setAlert(false, "", ""));
            setLoadState(false);
            router.push("/home");
          }, 1000);
        } else {
          dispatch(
            setAlert(true, "danger", `Error creating user: ${data.message}`)
          );

          setTimeout(() => {
            dispatch(setAlert(false, "", ""));
            setLoadState(false);
          }, 2000);
        }
      })
      .catch((error) =>
        dispatch(setAlert(true, "warning", `Error creating user: ${error}`))
      );

    setTimeout(() => {
      dispatch(setAlert(false, "", ""));
      setLoadState(false);
    }, 2000);
  } else {
    dispatch(
      setAlert(true, "warning", "All fields must be completed to create a user")
    );
  }
};
