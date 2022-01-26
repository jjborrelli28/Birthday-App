import React, { useState } from "react";
import { initialState, AuthContext } from "./AuthContext";
import { ChildrenProps } from "./interfaces";

export const AuthController = ({ children }: ChildrenProps) => {
  const [auth, setAuth] = useState(initialState);

  return (
    <AuthContext.Provider value={{ ...auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};
