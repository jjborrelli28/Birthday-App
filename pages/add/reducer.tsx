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
    case action.type:
      return {
        ...state,
        form: { ...state.form, [action.type]: action.payload },
      };

    case "message":
      return {
        ...state,
        message: {
          show: action.payload.show,
          variant: action.payload.variant,
          text: action.payload.text,
        },
      };

    default:
      return state;
  }
};

export default reducer;

export const initialState = {
  form: {
    email: "",
    firstName: "",
    lastName: "",
    birthday: null,
  },
  message: {
    show: false,
    variant: "",
    text: "",
  },
};
