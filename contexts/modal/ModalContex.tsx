import { createContext } from "react";
import { ModalContextProps } from "./interfaces";

export const initialState = {
  active: false,
  text: "",
  variant: "warning",
  payload: {
    id: "",
    name: "",
  },
};

export const ModalContext = createContext<ModalContextProps>(initialState);
