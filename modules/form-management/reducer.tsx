import { StateProps } from "./interfaces";

type ActionProps =
  | {
      type: "email" | "firstName" | "lastName" | "birthday";
      payload: string;
    }
  | {
      type: "message";
      payload: {
        show: boolean;
        variant: string;
        text: string;
      };
    };

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
        form: { ...state.values, [action.type]: action.payload },
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
