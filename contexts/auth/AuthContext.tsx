import { createContext } from "react";
import Cookies from "js-cookie";
import { AuthProps } from "./interfaces";

export const initialState: AuthProps = Cookies.get("token")
  ? { auth: true, stayLoggedIn: false }
  : { auth: false, stayLoggedIn: false };

export const AuthContext = createContext(initialState);
