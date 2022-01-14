import { useEffect, useState } from "react";

export const useAuthenticator = () => {
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const logged = localStorage.getItem("logged") ?? false;

      if (logged) {
        setAuth(true);
      }
    }
  }, []);

  return auth;
};
