import { ActionProps, StateProps } from "./interfaces";
import types from "./types";

const formReducer = (state: StateProps, action: ActionProps) => {
  switch (action.type) {
    case types.email:
      return {
        ...state,
        email: action.payload,
      };

    case types.firstName:
      return { ...state, firstName: action.payload };

    case types.lastName:
      return {
        ...state,
        lastName: action.payload,
      };

    case types.birthday:
      return {
        ...state,
        birthday: action.payload,
      };

    default:
      return state;
  }
};

export default formReducer;

export const initialState = {
  email: "",
  firstName: "",
  lastName: "",
  birthday: null,
};
