import React, { useState } from "react";
import { ModalContext } from "./ModalContex";
import { ChildrenProps } from "../../components/modal/interface";

export const ModalControler = ({ children }: ChildrenProps) => {
  const [modal, setModal] = useState({ active: false });

  return (
    <ModalContext.Provider value={{ ...modal, setModal }}>
      {children}
    </ModalContext.Provider>
  );
};
