import { NextRouter } from "next/router";

export const redirect = (router: NextRouter) => {
  //Login simulation

  if (typeof window !== "undefined") {
    const logged = localStorage.getItem("logged") ?? false;

    if (!logged) {
      router.push("/login");
    }
  }
};
