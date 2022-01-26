import React, { useState } from "react";
import { ChildrenProps } from "./interfaces";
import { initialState, ModalContext } from "./ModalContext";

export const ModalController = ({ children }: ChildrenProps) => {
  const [modal, setModal] = useState(initialState);

  return (
    <ModalContext.Provider value={{ ...modal, setModal }}>
      {children}
    </ModalContext.Provider>
  );
};
