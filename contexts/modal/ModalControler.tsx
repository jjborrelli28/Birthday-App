import React, { useState } from "react";
import { initialState, ModalContext } from "./ModalContex";
import { ChildrenProps } from "../../components/modal/interface";

export const ModalControler = ({ children }: ChildrenProps) => {
  const [modal, setModal] = useState(initialState);

  return (
    <ModalContext.Provider value={{ ...modal, setModal }}>
      {children}
    </ModalContext.Provider>
  );
};
