import { NextRouter } from "next/router";
import { useEffect } from "react";

export const useLoginRedirect = (router: NextRouter) => {
  //Login simulation

  if (typeof window !== "undefined") {
    const logged = localStorage.getItem("logged") ?? false;

    useEffect(() => {
      if (!logged) {
        router.push("/login");
      }
    }, [logged]);
  }
};
