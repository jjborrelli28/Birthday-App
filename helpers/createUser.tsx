import { showMessage } from "../modules/form-management/actions";
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

      dispatch(showMessage(false, "", ""));

      fetch(`https://birthday-app-api.vercel.app/api/v2/signup`, {
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
              showMessage(
                true,
                "success",
                `The user was created successfully ✔`
              )
            );
          } else {
            dispatch(
              showMessage(
                true,
                "danger",
                `Error creating user: ${data.message}`
              )
            );
          }
        })
        .catch((error) =>
          dispatch(
            showMessage(true, "warning", `Error creating user: ${error}`)
          )
        );

      setTimeout(() => {
        dispatch(showMessage(false, "", ""));
        setLoadState(false);
        router.push("/");
      }, 2000);
    } else {
      dispatch(showMessage(true, "danger", "Passwords do not match"));
    }
  } else {
    dispatch(
      showMessage(
        true,
        "warning",
        "All fields must be completed to create a user"
      )
    );
  }
};
