import { ActionProps } from "./interfaces";
import types from "./types";

const formReducer = (state = initialState, action: ActionProps) => {
  switch (action.type) {
    case types.onChangeEmail:
      return {
        ...state,
        email: action.payload,
      };

    case types.onChangeFirstName:
      return { ...state, firstName: action.payload };

    case types.onChangeLastName:
      return {
        ...state,
        lastName: action.payload,
      };

    case types.onChangeBirthday:
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
