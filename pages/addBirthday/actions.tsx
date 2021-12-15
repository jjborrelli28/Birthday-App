import types from "./types";
import { initialMessage } from "./messageReducer";

// formReducer
export const changeEmail = (target: HTMLInputElement) => {
  return {
    type: types.email,
    payload: target.value,
  };
};

export const changeFirstName = (target: HTMLInputElement) => {
  return {
    type: types.firstName,
    payload: target.value,
  };
};

export const changeLastName = (target: HTMLInputElement) => {
  return {
    type: types.lastName,
    payload: target.value,
  };
};

export const changeBirthday = (date: string) => {
  return {
    type: types.birthday,
    payload: date.concat("T00:00:00.000Z"),
  };
};

//msgReducer
export const showDateMessage = () => {
  return {
    type: types.message,
    show: true,
    variant: "warning",
    text: "The selected date cannot be in the future",
  };
};

export const showFieldsMessage = () => {
  return {
    type: types.message,
    show: true,
    variant: "warning",
    text: "All fields need to be completed before saving the changes",
  };
};

export const showSuccessMessage = () => {
  return {
    type: types.message,
    show: true,
    variant: "success",
    text: "The birthday was saved successfully ✔",
  };
};

export const removeMessage = () => {
  return { type: types.message, show: false, variant: "", text: "" };
};
