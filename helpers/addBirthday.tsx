import Cookies from "js-cookie";
import { NextRouter } from "next/router";
import { FormEvent } from "react";
import { setAlert } from "../modules/form-management/actions";
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

  const token = Cookies.get("token");

  const { email, firstName, lastName, birthday } = values;

  if (firstName && lastName && email && birthday) {
    setLoadState(true);

    fetch(`api/bda/birthdays`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        method: "POST",
        token,
        body: values,
        id: "add",
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.success) {
          dispatch(
            setAlert(true, "success", "The birthday was saved successfully ✔")
          );
        } else {
          dispatch(
            setAlert(true, "danger", `Error saving birthday: ${data.message}`)
          );
        }
      })
      .catch((error) =>
        dispatch(setAlert(true, "warning", `Error saving birthday: ${error}`))
      );

    setTimeout(() => {
      dispatch(setAlert(false, "", ""));
      setLoadState(true);
      router.back();
    }, 2000);
  } else {
    dispatch(
      setAlert(
        true,
        "warning",
        "All fields need to be completed before saving the changes"
      )
    );
  }
};
