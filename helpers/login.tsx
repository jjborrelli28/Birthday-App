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
  router: NextRouter;
  authState: AuthProps;
};

export const login = ({
  e,
  values,
  dispatch,
  setLoadState,
  router,
  authState,
}: LoginProps) => {
  e.preventDefault();

  const { setAuth, stayLoggedIn } = authState;

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

          if (stayLoggedIn) {
            Cookies.set("token", data.token, { expires: 365 });
          } else {
            Cookies.set("token", data.token);
          }

          setTimeout(() => {
            dispatch(setAlert(false, "", ""));

            if (Cookies.get(`t&c-${email}`)) {
              router.push("/home");
            } else {
              router.push(`/t&c?user=${email}`);
            }

            setLoadState(false);
            setAuth({ ...authState, auth: true });
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
