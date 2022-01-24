import Cookies from "js-cookie";
import { NextRouter } from "next/router";

export const logout = (router: NextRouter) => {
  Cookies.remove("token");
  router.push("/");
};
