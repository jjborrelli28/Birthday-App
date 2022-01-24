import Cookies from "js-cookie";
import { NextRouter } from "next/router";

export const logout = (router: NextRouter, setAuth: any) => {
  Cookies.remove("token");
  router.push("/");
  setAuth(false);
};
