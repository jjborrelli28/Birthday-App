import { ActionProps, StateProps } from "./interfaces";

const reducer = (state: StateProps, action: ActionProps) => {
  switch (action.type) {
    case "message":
      return {
        ...state,
        message: {
          show: action.payload.show,
          variant: action.payload.variant,
          text: action.payload.text,
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

export const initialState = {
  values: {
    email: "",
    firstName: "",
    lastName: "",
    birthday: "",
  },
  message: {
    show: false,
    variant: "",
    text: "",
  },
};
