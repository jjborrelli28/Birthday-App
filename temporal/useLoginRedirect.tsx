import { NextRouter } from "next/router";
import { useEffect } from "react";

export const useLoginRedirect = (router: NextRouter) => {
  //Login simulation

  useEffect(() => {
    if (typeof window !== "undefined") {
      const logged = localStorage.getItem("logged") ?? false;

      if (!logged) {
        router.push("/login");
      }
    }
  }, []);
};
