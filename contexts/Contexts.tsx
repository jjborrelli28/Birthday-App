import React from "react";
import { AuthControler } from "./auth/AuthControler";
import { ChildrenProps } from "./modal/interfaces";
import { ModalControler } from "./modal/ModalControler";

const Contexts = ({ children }: ChildrenProps) => {
  return (
    <AuthControler>
      <ModalControler>{children}</ModalControler>;
    </AuthControler>
  );
};

export default Contexts;
