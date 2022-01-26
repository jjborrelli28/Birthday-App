import { ReactNode } from "react";

export interface AuthProps {
  auth: boolean;
  stayLoggedIn: boolean;
  setAuth?: any;
}

export interface ChildrenProps {
  children: ReactNode;
}
