import { FormEvent } from "react";
import { setAlert } from "../modules/form-management/actions";
import { ValuesProps } from "../modules/form-management/interfaces";
import { NextRouter } from "next/router";
import Cookies from "js-cookie";
import { AuthProps } from "../contexts/auth/interfaces";

type LoginProps = {
  e: FormEvent;
  values: ValuesProps;
  setLoadState: any;
  dispatch: any;
  authState: AuthProps;
};

export const login = ({
  e,
  values,
  dispatch,
  setLoadState,
  authState,
}: LoginProps) => {
  e.preventDefault();

  const { setAuth, stayLoggedIn } = authState;

  const { email, password } = values;

  if (email && password) {
    setLoadState(true);

    dispatch(setAlert(false, "", ""));

    fetch(`api/bda/signin`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },  
      body: JSON.stringify({
        method: "POST",
        body: values,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.token) {
          if (stayLoggedIn) {
            Cookies.set("user", email, { expires: 365 });
            Cookies.set("token", data.token, { expires: 365 });
          } else {
            Cookies.set("user", email);
            Cookies.set("token", data.token);
          }

          setAuth({ ...authState, auth: true });

          setLoadState(false);
        } else {
          dispatch(
            setAlert(true, "danger", `Failed to login: ${data.message}`)
          );

          setTimeout(() => {
            dispatch(setAlert(false, "", ""));
            setLoadState(false);
          }, 2000);
        }
      })
      .catch((error) =>
        dispatch(setAlert(true, "warning", `Failed to login: ${error}`))
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
