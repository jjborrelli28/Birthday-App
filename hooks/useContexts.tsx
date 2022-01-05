import { useContext } from "react";
import { ModalContext } from "../contexts/modal/ModalContex";
import { ModalContextProps } from "../contexts/modal/interfaces";

export const useContexts = (name: "modal") => {
  switch (name) {
    case "modal":
      const modal = useContext<ModalContextProps>(ModalContext);
      return modal;
  }
};
