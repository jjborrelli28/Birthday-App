import React from "react";
import { ChildrenProps } from "./modal/interfaces";
import { ModalControler } from "./modal/ModalControler";

const Contexts = ({ children }: ChildrenProps) => {
  return <ModalControler>{children}</ModalControler>;
};

export default Contexts;
