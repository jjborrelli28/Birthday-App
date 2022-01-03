import { useRouter } from "next/router";
import { showMessage } from "./actions";
import { PostProps } from "./interfaces";

export const postBirthday = ({ e, values, dispatch }: PostProps) => {
  e.preventDefault();

  const { email, firstName, lastName, birthday } = values;

  const router = useRouter();

  if (firstName && lastName && email && birthday) {
    dispatch(
      showMessage(true, "success", "The birthday was saved successfully ✔")
    );
    fetch("https://birthday-app-api.vercel.app/api/v1/john/birthdays/add", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((response) => console.log("Success:", response))
      .catch((error) => console.error("Error:", error));

    setTimeout(() => {
      router.push("/");
      dispatch(showMessage(false, "", ""));
    }, 1500);
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
