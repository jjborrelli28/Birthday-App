import { useEffect, useState } from "react";
import Cookies from "js-cookie";

export const useAuthenticator = () => {
  const [auth, setAuth] = useState(!!Cookies.get("token"));

  useEffect(() => {
    if (Cookies.get("token")) {
      setAuth(true);
    } else {
      setAuth(false);
    }
  }, [Cookies.get("token")]);

  return auth;
};
