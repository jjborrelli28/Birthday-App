import { ReactNode } from "react";

export interface ModalContextProps {
  active: boolean;
  text: string;
  variant: "warning" | "success";
  payload: { id: string; name: string };
  setModal?: any;
  isRefreshing: boolean;
}

export interface ChildrenProps {
  children: ReactNode;
}
