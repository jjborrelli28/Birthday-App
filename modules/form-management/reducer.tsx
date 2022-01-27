import { ActionProps, StateProps } from "./interfaces";

const reducer = (state: StateProps, action: ActionProps) => {
  switch (action.type) {
    case "alert":
      return {
        ...state,
        alert: {
          active: action.payload.active,
          variant: action.payload.variant,
          message: action.payload.message,
        },
      };

    case action.type:
      return {
        ...state,
        values: { ...state.values, [action.type]: action.payload },
      };

    default:
      return state;
  }
};

export default reducer;

export const initialSignUpState = {
  values: {
    email: "",
    firstName: "",
    lastName: "",
    birthday: "",
    password: "",
    password2: "",
  },
  alert: {
    active: false,
    variant: "",
    message: "",
  },
};

export const initialSignInState = {
  values: {
    email: "",
    password: "",
  },
  alert: {
    active: false,
    variant: "",
    message: "",
  },
};
