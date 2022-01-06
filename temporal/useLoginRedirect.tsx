import { NextRouter } from "next/router";
import { useEffect } from "react";

export const useLoginRedirect = (router: NextRouter) => {
  //Login simulation

  let logged;

  useEffect(() => {
    if (typeof window !== "undefined") {
      logged = localStorage.getItem("logged") ?? false;

      if (!logged) {
        router.push("/login");
      }
    }
  }, [logged]);
};
