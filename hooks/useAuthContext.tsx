import { useContext } from "react";
import { AuthContext } from "../contexts/auth/AuthContext";

export const useAuthContext = () => {
  const auth = useContext(AuthContext);

  return auth;
};
