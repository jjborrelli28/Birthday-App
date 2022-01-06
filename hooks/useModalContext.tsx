import { useContext } from "react";
import { ModalContext } from "../contexts/modal/ModalContext";

export const useModalContext = () => {
  const modal = useContext(ModalContext);

  return modal;
};
