import { NextRouter } from "next/router";
import { showMessage } from "../modules/form-management/actions";
import { ValuesProps } from "../modules/form-management/interfaces";

type EditBirthdayProps = {
  e: Event;
  values: ValuesProps;
  setLoadState: any;
  dispatch: any;
  router: NextRouter;
};

export const editBirthday = ({
  e,
  values,
  setLoadState,
  dispatch,
  router,
}: EditBirthdayProps) => {
  e.preventDefault();

  const { id } = router.query;

  const { email, firstName, lastName, birthday } = values;

  if (firstName && lastName && email && birthday) {
    setLoadState(true);

    fetch(`https://birthday-app-api.vercel.app/api/v1/john/birthdays/${id}`, {
      method: "PUT",
      headers: {
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
              `Error editing birthday: ${data.message}`
            )
          );
        }
      })
      .catch((error) =>
        dispatch(
          showMessage(true, "warning", `Error editing birthday: ${error}`)
        )
      );

    setTimeout(() => {
      dispatch(showMessage(false, "", ""));
      setLoadState(false);
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
