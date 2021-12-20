import { BirthdayAction, MessageAction, PersonalAction } from "./interfaces";

export const changeValues = (target: HTMLInputElement) => {
  return {
    type: target.name as PersonalAction["type"],
    payload: target.value,
  };
};

export const changeBirthday = (date: null | string) => {
  return {
    type: "birthday" as BirthdayAction["type"],
    payload: date as BirthdayAction["type"],
    //"T00:00:00.000Z"
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
