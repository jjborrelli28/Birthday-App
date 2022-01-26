import Cookies from "js-cookie";
import { NextRouter } from "next/router";
import { setAlert } from "../modules/form-management/actions";
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

  const token = Cookies.get("token");

  const { id } = router.query;

  const { email, firstName, lastName, birthday } = values;

  if (firstName && lastName && email && birthday) {
    setLoadState(true);

    fetch(`${process.env.NEXT_PUBLIC_BDA_API_V2}/birthdays/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(values),
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
            setAlert(true, "danger", `Error editing birthday: ${data.message}`)
          );
        }
      })
      .catch((error) =>
        dispatch(setAlert(true, "warning", `Error editing birthday: ${error}`))
      );

    setTimeout(() => {
      dispatch(setAlert(false, "", ""));
      setLoadState(false);
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
