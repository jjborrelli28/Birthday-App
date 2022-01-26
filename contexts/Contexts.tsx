import React from "react";
import { AuthController } from "./auth/AuthController";
import { ChildrenProps } from "./modal/interfaces";
import { ModalController } from "./modal/ModalController";

const Contexts = ({ children }: ChildrenProps) => {
  return (
    <AuthController>
      <ModalController>{children}</ModalController>
    </AuthController>
  );
};

export default Contexts;
