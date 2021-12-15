import { ActionMessageProps, MessageProps } from "./interfaces";
import types from "./types";

const messageReducer = (state: MessageProps, action: ActionMessageProps) => {
  switch (action.type) {
    case types.message:
      return { show: action.show, variant: action.variant, text: action.text };

    default:
      return state;
  }
};

export default messageReducer;

export const initialMessage = {
  show: false,
  variant: "",
  text: "",
};
