import { AlertAction, PersonalAction } from "./interfaces";

export const changeValues = (target: HTMLInputElement) => {
  return {
    type: target.name as PersonalAction["type"],
    payload: target.value,
  };
};

export const setAlert = (
  active: boolean,
  variant: string,
  message: string
) => {
  return {
    type: "alert" as AlertAction["type"],
    payload: {
      active,
      variant,
      message,
    },
  };
};
