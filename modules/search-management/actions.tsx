import { MessageAction, ValueProps } from "./interfaces";

export const changeValues = (target: HTMLInputElement) => {
  return {
    type: "value" as ValueProps["type"],
    payload: target.value,
  };
};

export const showMessage = (show: boolean, variant: string, text: string) => {
  return {
    type: "message" as MessageAction["type"],
    payload: {
      show,
      variant,
      text,
    },
  };
};
