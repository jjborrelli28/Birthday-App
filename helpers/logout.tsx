import Cookies from "js-cookie";
import { NextRouter } from "next/router";
import { AuthProps } from "../contexts/auth/interfaces";

export const logout = (e: Event, router: NextRouter, authState: AuthProps) => {
  e.preventDefault()
  Cookies.remove("user");
  Cookies.remove("token");
  authState.setAuth({ ...authState, auth: false, stayLoggedIn: false });
  router.push("/");
};
