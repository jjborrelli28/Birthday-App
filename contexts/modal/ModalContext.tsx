import { createContext } from "react";
import { ModalContextProps } from "./interfaces";

export const initialState: ModalContextProps = {
  active: false,
  text: "",
  variant: "warning",
  payload: {
    id: "",
    name: "",
  },
  isRefreshing: false,
};

export const ModalContext = createContext(initialState);
