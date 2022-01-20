import { NextRouter } from "next/router";
import { FormEvent } from "react";
import { showMessage } from "../modules/form-management/actions";
import { ValuesProps } from "../modules/form-management/interfaces";

type AddBirthdayProps = {
  e: FormEvent;
  values: ValuesProps;
  setLoadState: any;
  dispatch: any;
  router: NextRouter;
};

export const addBirthday = ({
  e,
  values,
  setLoadState,
  dispatch,
  router,
}: AddBirthdayProps) => {
  e.preventDefault();

  const { email, firstName, lastName, birthday } = values;

  if (firstName && lastName && email && birthday) {
    setLoadState(true);

    fetch("https://birthday-app-api.vercel.app/api/v1/john/birthdays/add", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
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
              "The birthday was saved successfully ✔"
            )
          );
        } else {
          dispatch(
            showMessage(
              true,
              "danger",
              `Error saving birthday: ${data.message}`
            )
          );
        }
      })
      .catch((error) =>
        dispatch(
          showMessage(true, "warning", `Error saving birthday: ${error}`)
        )
      );

    setTimeout(() => {
      dispatch(showMessage(false, "", ""));
      setLoadState(true);
      router.back();
    }, 2000);
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
