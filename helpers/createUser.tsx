import { setAlert } from "../modules/form-management/actions";
import { ValuesProps } from "../modules/form-management/interfaces";
import { NextRouter } from "next/router";
import { FormEvent } from "react";

type CreateUserProps = {
  e: FormEvent;
  values: ValuesProps;
  setLoadState: any;
  dispatch: any;
  router: NextRouter;
};

export const createUser = ({
  e,
  values,
  setLoadState,
  dispatch,
  router,
}: CreateUserProps) => {
  e.preventDefault();

  const { firstName, lastName, email, birthday, password1, password2 } = values;

  if (firstName && lastName && email && birthday) {
    if (password1 === password2) {
      setLoadState(true);

      dispatch(setAlert(false, "", ""));

      fetch(`${process.env.NEXT_PUBLIC_API_V2}/signup`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          birthday,
          password: password1,
        }),
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          if (data.success) {
            dispatch(
              setAlert(
                true,
                "success",
                `The user was created successfully ✔`
              )
            );
          } else {
            dispatch(
              setAlert(
                true,
                "danger",
                `Error creating user: ${data.message}`
              )
            );
          }
        })
        .catch((error) =>
          dispatch(
            setAlert(true, "warning", `Error creating user: ${error}`)
          )
        );

      setTimeout(() => {
        dispatch(setAlert(false, "", ""));
        setLoadState(false);
        router.push("/");
      }, 2000);
    } else {
      dispatch(setAlert(true, "danger", "Passwords do not match"));
    }
  } else {
    dispatch(
      setAlert(
        true,
        "warning",
        "All fields must be completed to create a user"
      )
    );
  }
};
